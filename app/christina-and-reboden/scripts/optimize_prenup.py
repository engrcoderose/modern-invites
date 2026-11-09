"""Losslessly optimize supplied JPEGs using an existing TurboJPEG library.

No resizing, requantization, rotation, or metadata removal. Try optimized
sequential and progressive coding and keep the smallest valid representation.
The source folder is read-only; destination files must not already exist.
"""

import argparse
import ctypes as C
import hashlib
import json
import re
from pathlib import Path


class Region(C.Structure):
    _fields_ = [(field, C.c_int) for field in ("x", "y", "w", "h")]


class Transform(C.Structure):
    _fields_ = [("region", Region), ("operation", C.c_int),
                ("options", C.c_int), ("data", C.c_void_p),
                ("filter", C.c_void_p)]


def configure_library(path):
    library = C.CDLL(str(path))
    byte_pointer = C.POINTER(C.c_ubyte)
    library.tj3Init.argtypes = [C.c_int]
    library.tj3Init.restype = C.c_void_p
    library.tj3Transform.argtypes = [C.c_void_p, byte_pointer, C.c_size_t,
                                   C.c_int, C.POINTER(byte_pointer),
                                   C.POINTER(C.c_size_t), C.POINTER(Transform)]
    library.tj3Transform.restype = C.c_int
    library.tj3Free.argtypes = [C.c_void_p]
    library.tj3Free.restype = None
    library.tj3Destroy.argtypes = [C.c_void_p]
    library.tj3Destroy.restype = None
    library.tj3GetErrorStr.argtypes = [C.c_void_p]
    library.tj3GetErrorStr.restype = C.c_char_p
    return library, byte_pointer


def candidates(library, byte_pointer, data):
    handle = library.tj3Init(2)  # TJINIT_TRANSFORM
    if not handle:
        raise RuntimeError("Could not initialize TurboJPEG")
    source = (C.c_ubyte * len(data)).from_buffer_copy(data)
    outputs = (byte_pointer * 2)()
    sizes = (C.c_size_t * 2)()
    transforms = (Transform * 2)()
    # TJXOP_NONE = 0; no coefficient or image-geometry changes.
    transforms[0].options = 1 << 8  # TJXOPT_OPTIMIZE
    transforms[1].options = (1 << 8) | (1 << 5)  # + TJXOPT_PROGRESSIVE
    try:
        result = library.tj3Transform(handle, source, len(data), 2,
                                      outputs, sizes, transforms)
        if result != 0:
            raise RuntimeError(library.tj3GetErrorStr(handle).decode())
        return [("original", data),
                ("optimized-sequential", C.string_at(outputs[0], sizes[0])),
                ("optimized-progressive", C.string_at(outputs[1], sizes[1]))]
    finally:
        for pointer in outputs:
            if pointer:
                library.tj3Free(pointer)
        library.tj3Destroy(handle)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, required=True)
    parser.add_argument("--destination", type=Path, required=True)
    parser.add_argument("--library", type=Path, required=True)
    parser.add_argument("--report", type=Path, required=True)
    args = parser.parse_args()
    if args.source.resolve() == args.destination.resolve():
        parser.error("Source and destination must be separate")
    library, byte_pointer = configure_library(args.library)
    sources = sorted(p for p in args.source.iterdir()
                     if p.suffix.lower() in (".jpg", ".jpeg"))
    outputs = [(source, re.sub(r"[^a-z0-9]+", "-", source.stem.lower())
                .strip("-") + ".jpg") for source in sources]
    names = [name for _, name in outputs]
    if len(names) != len(set(names)):
        parser.error("Source names collide after normalization")
    for _, name in outputs:
        if (args.destination / name).exists():
            raise FileExistsError(args.destination / name)
    args.destination.mkdir(parents=True, exist_ok=True)
    report = {"method": "coefficient-preserving JPEG entropy optimization",
              "resized": False, "metadataPreserved": True, "images": []}
    for source, name in outputs:
        data = source.read_bytes()
        method, optimized = min(candidates(library, byte_pointer, data),
                                key=lambda item: len(item[1]))
        (args.destination / name).write_bytes(optimized)
        report["images"].append({
            "originalName": source.name, "file": name, "method": method,
            "originalBytes": len(data), "optimizedBytes": len(optimized),
            "originalSha256": hashlib.sha256(data).hexdigest(),
            "optimizedSha256": hashlib.sha256(optimized).hexdigest(),
        })
        print(f"{source.name}: {len(data)} -> {len(optimized)} ({method})",
              flush=True)
    args.report.parent.mkdir(parents=True, exist_ok=True)
    args.report.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
