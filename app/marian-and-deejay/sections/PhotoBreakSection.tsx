import Image from "next/image";
import background from "../assets/images/prenup_video_bg.png";
import rose from "../assets/designs/photo-break-rose.png";
import butterflies from "../assets/designs/photo-break-butterflies.png";
import { photoBreak } from "../data/photo-break";

export default function PhotoBreakSection() {
  return (
    <section id="photo-break" aria-label="Moments of Marian and Dee Jay" className="mj-photo-break relative isolate overflow-hidden py-8 sm:py-10">
      <Image src={background} alt="" fill sizes="(max-width: 639px) calc(168vw + 96px), 100vw" className="pointer-events-none object-cover" />
      <div className="mj-photo-collage relative mx-auto w-full max-w-6xl">
        <div data-mj-reveal className="mj-photo-main mj-photo-print absolute z-[2] overflow-hidden">
          <Image src={photoBreak.main.src} alt={photoBreak.main.alt} fill sizes="(max-width: 639px) 50vw, (max-width: 1151px) 32vw, 369px" className="object-cover" style={{ objectPosition: photoBreak.main.position }} />
        </div>
        <div data-mj-reveal className="mj-photo-left mj-photo-print absolute z-[3] overflow-hidden">
          <Image src={photoBreak.left.src} alt={photoBreak.left.alt} fill sizes="(max-width: 639px) 32vw, (max-width: 1151px) 23vw, 265px" className="object-cover" style={{ objectPosition: photoBreak.left.position }} />
        </div>
        <div data-mj-reveal className="mj-photo-right mj-photo-print absolute z-[3] overflow-hidden">
          <Image src={photoBreak.right.src} alt={photoBreak.right.alt} fill sizes="(max-width: 639px) 30vw, (max-width: 1151px) 23vw, 265px" className="object-cover" style={{ objectPosition: photoBreak.right.position }} />
        </div>
        <Image src={rose} alt="" sizes="(max-width: 639px) 18vw, (max-width: 1151px) 11vw, 127px" className="mj-photo-rose pointer-events-none absolute z-[4]" />
        <Image src={butterflies} alt="" sizes="(max-width: 639px) 24vw, (max-width: 1151px) 14vw, 162px" className="mj-photo-butterflies pointer-events-none absolute z-[4]" />
      </div>
    </section>
  );
}
