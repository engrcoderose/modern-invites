import Image from "next/image";
import bankTransferQr from "./assets/designs/bank_tranfer_qr.png";
import giftRegistryQr from "./assets/designs/Leslie and Serj - QR for Gift Registry.png";

const giftOptions = [
  {
    label: "Gift registry",
    image: giftRegistryQr,
    description: "Scan to view our gift registry.",
    imageClassName: "",
  },
  {
    label: "Bank transfer",
    image: bankTransferQr,
    description: "Scan for bank transfer.",
    // Match the visible pattern, accounting for the registry image's wider margins:
    // (321 / 379) / (496 / 508), rounded to three decimal places.
    // The vertical offset aligns the patterns despite their uneven source margins.
    imageClassName: "translate-y-[1.7%] scale-[0.868]",
  },
];

export default function GiftOptions() {
  return (
    <div className="grid w-full max-w-[456px] grid-cols-2 items-start gap-4">
      {giftOptions.map(({ label, image, description, imageClassName }) => (
        <figure key={label} className="min-w-0">
          <a
            href={image.src}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open a larger ${label.toLowerCase()} QR code (opens in a new tab)`}
            data-lj-reveal
            className="relative mx-auto block aspect-square w-full max-w-[220px] overflow-hidden bg-white mix-blend-multiply focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5a6946] [@media(max-height:740px)]:max-w-[200px]"
          >
            <Image
              src={image}
              alt={`QR code for Leslie and Serj’s ${label.toLowerCase()}`}
              fill
              sizes="(max-width: 575px) 39vw, 220px"
              unoptimized
              className={`object-contain p-3 ${imageClassName}`}
            />
          </a>
          <figcaption data-lj-reveal className="mt-2 text-[11px] leading-relaxed text-[#646650]">
            <span className="block font-semibold">{label}</span>
            {description}
            <br />
            Tap the code to enlarge.
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
