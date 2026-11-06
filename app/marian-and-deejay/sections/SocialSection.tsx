import Image from "next/image";
import wedding from "../data/wedding-details.json";
import { socialPhoto } from "../data/social";

export default function SocialSection() {
  return (
    <section id="capture-the-love" aria-labelledby="mj-social-title" className="mj-social relative isolate flex min-h-[720px] items-center overflow-hidden px-4 py-16 text-center sm:min-h-[680px] sm:px-10 sm:py-20">
      <Image src={socialPhoto.src} alt="" fill quality={85} sizes="(min-width: 640px) 100vw, 520px" className="-z-20 object-cover" style={{ objectPosition: socialPhoto.position }} />
      <div aria-hidden="true" className="mj-social-wash pointer-events-none absolute inset-0 -z-10" />
      <div className="mj-social-panel mx-auto w-full max-w-3xl border px-5 py-12 sm:px-12 sm:py-16">
        <h2 id="mj-social-title" className="mj-heading">Capture the love.</h2>
        <svg aria-hidden="true" viewBox="0 0 240 20" fill="none" className="mj-social-ornament mx-auto my-7 h-5 w-52 sm:my-8 sm:w-64">
          <path d="M0 10h96m48 0h96M103 10c8-14 18 14 34 0-16-14-26 14-34 0Z" stroke="currentColor" strokeWidth=".8" />
          <path d="m120 6 4 4-4 4-4-4 4-4Z" stroke="currentColor" strokeWidth=".8" />
        </svg>
        <p className="mx-auto max-w-xl text-sm leading-7">{wedding.social.message}</p>
        <p className="mj-social-hashtag mt-8">{wedding.social.hashtag}</p>
        <p className="mj-social-note mt-7 text-xs leading-6">Please keep phones away during the ceremony.<br />We look forward to sharing memories with you afterward.</p>
      </div>
    </section>
  );
}
