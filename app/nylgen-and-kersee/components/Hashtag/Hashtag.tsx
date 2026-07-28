"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { Camera, CheckCircle2, Hash, ImagePlus, Leaf } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import QRCode from "react-qr-code";

import type { WeddingData } from "../../data/weddingData";
import { Button, Container, Heading, Section } from "../ui";

type HashtagProps = {
  data: Pick<WeddingData, "socialSharing">;
};

type SelectedPhoto = {
  name: string;
  url: string;
};

export function Hashtag({ data }: HashtagProps) {
  const [qrValue, setQrValue] = useState(data.socialSharing.uploadPath);
  const [photos, setPhotos] = useState<SelectedPhoto[]>([]);
  const [statusMessage, setStatusMessage] = useState("");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const destination =
      data.socialSharing.albumUrl ??
      `${window.location.origin}${data.socialSharing.uploadPath}`;
    setQrValue(destination);
  }, [data.socialSharing.albumUrl, data.socialSharing.uploadPath]);

  useEffect(
    () => () => {
      photos.forEach((photo) => URL.revokeObjectURL(photo.url));
    },
    [photos],
  );

  const selectPhotos = (event: ChangeEvent<HTMLInputElement>) => {
    photos.forEach((photo) => URL.revokeObjectURL(photo.url));

    const selected = Array.from(event.target.files ?? [])
      .slice(0, 6)
      .map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));

    setPhotos(selected);
    setStatusMessage("");
  };

  const submitPhotos = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (photos.length === 0) {
      setStatusMessage("Choose at least one photo to continue.");
      return;
    }

    if (data.socialSharing.albumUrl) {
      window.open(data.socialSharing.albumUrl, "_blank", "noopener,noreferrer");
      setStatusMessage("Your shared album has opened in a new tab.");
      return;
    }

    setStatusMessage(
      "Your photos are ready. The shared album connection will be enabled here before the celebration.",
    );
  };

  return (
    <Section
      id="hashtag"
      aria-labelledby="hashtag-heading"
      tone="sage"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_12%_12%,rgb(var(--wedding-color-sage-soft)/.8),transparent_24%),radial-gradient(circle_at_88%_88%,rgb(var(--wedding-color-gold)/.35),transparent_24%)]"
      />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <motion.div
            className="mx-auto flex max-w-xl flex-col items-center text-center lg:items-start lg:text-left"
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 text-wedding-paper/70">
              <Hash className="size-4 stroke-[1.2]" aria-hidden="true" />
              <p className="font-sans text-[0.62rem] font-medium uppercase tracking-[0.3em]">
                Share the celebration
              </p>
            </div>
            <Heading
              id="hashtag-heading"
              as="h2"
              variant="script"
              align="center"
              className="mt-5 text-[clamp(4rem,9vw,7rem)] text-wedding-paper lg:text-left"
            >
              Capture the love
            </Heading>
            <p className="mt-5 font-wedding-body text-sm leading-8 tracking-[0.06em] text-wedding-paper/75 sm:text-base">
              {data.socialSharing.message}
            </p>
            <p className="mt-7 break-all font-wedding-display text-2xl tracking-[0.04em] text-wedding-paper sm:text-3xl">
              {data.socialSharing.hashtag}
            </p>

            <div className="mt-9 flex items-center gap-5 rounded-wedding border border-wedding-paper/20 bg-wedding-paper/10 p-4 backdrop-blur-sm">
              <div className="rounded-wedding-control bg-wedding-paper p-3">
                <QRCode
                  value={qrValue}
                  size={132}
                  level="M"
                  bgColor="#FFFDF8"
                  fgColor="#4C6344"
                  aria-label="QR code for the wedding photo upload area"
                />
              </div>
              <div className="max-w-[11rem] text-left">
                <Camera
                  className="mb-3 size-5 stroke-[1.2] text-wedding-paper"
                  aria-hidden="true"
                />
                <p className="font-sans text-[0.6rem] uppercase leading-5 tracking-[0.2em] text-wedding-paper/75">
                  Scan to open the photo upload area
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            id="photo-upload"
            className="rounded-wedding border border-wedding-paper/25 bg-wedding-paper p-5 text-wedding-ink shadow-wedding-soft sm:p-8"
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.85,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="text-center">
              <ImagePlus
                className="mx-auto size-7 stroke-[1.1] text-wedding-sage"
                aria-hidden="true"
              />
              <h3 className="mt-3 font-wedding-display text-3xl text-wedding-sage-deep">
                Add your moments
              </h3>
              <p className="mx-auto mt-2 max-w-md font-wedding-body text-xs leading-6 text-wedding-ink/65">
                Select up to six photos. The final shared-album destination can
                be connected without changing this section.
              </p>
            </div>

            <form onSubmit={submitPhotos} className="mt-7">
              <label
                htmlFor="wedding-photos"
                className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-wedding-control border border-dashed border-wedding-line bg-wedding-mist/55 px-5 py-7 text-center transition hover:bg-wedding-sage-soft/45"
              >
                <Camera
                  className="size-6 stroke-[1.1] text-wedding-sage"
                  aria-hidden="true"
                />
                <span className="mt-3 font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-wedding-sage-deep">
                  Choose photos
                </span>
                <span className="mt-1 font-wedding-body text-xs text-wedding-ink/55">
                  JPG, PNG, HEIC, or WEBP
                </span>
                <input
                  id="wedding-photos"
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={selectPhotos}
                />
              </label>

              {photos.length > 0 ? (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {photos.map((photo) => (
                    <div
                      key={`${photo.name}-${photo.url}`}
                      className="relative aspect-square overflow-hidden rounded-wedding-control bg-wedding-mist"
                    >
                      <Image
                        src={photo.url}
                        alt={`Selected upload: ${photo.name}`}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : null}

              <Button type="submit" className="mt-5 w-full">
                Continue to upload
              </Button>

              {statusMessage ? (
                <p
                  role="status"
                  className="mt-4 flex items-start gap-2 rounded-wedding-control bg-wedding-mist px-4 py-3 font-wedding-body text-xs leading-5 text-wedding-sage-deep"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 stroke-[1.3]" />
                  {statusMessage}
                </p>
              ) : null}
            </form>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
