"use client";

import Image from "next/image";
import type { InvitationPage } from "./types";
import { wedding } from "../data";
import { media } from "../data/media";
import { Venue } from "../components/venue";
import PhotoBreak from "../components/photo-break";
import { photoPages } from "./photo-pages";

export function introductionPages(): InvitationPage[] {
  const storyPhotos = wedding.storyPhotos.slice(0, 30);
  return [
    {
      id: "home",
      label: "Invitation",
      content: (
        <div className="vg-opening-layout h-full">
          <div className="vg-opening-panel relative flex h-full min-h-[420px] flex-col items-center justify-center gap-6 px-10 py-6 text-center [@media(max-width:700px)]:gap-5 [@media(max-width:700px)]:px-7">
            <div data-vg-reveal className="vg-opening-logo relative aspect-[1054/1364] h-[clamp(140px,28svh,240px)] shrink-0 overflow-hidden">
              <Image
                src={media.illustration}
                alt={media.illustrationAlt}
                priority
                sizes="800px"
                className="vg-opening-illustration absolute"
                draggable={false}
              />
            </div>
            <h1 className="vg-opening-names flex w-full flex-col items-center text-[#5a6946]">
              <span>{wedding.bride}</span>
              <span className="text-[0.65em]">and</span>
              <span>{wedding.groom}</span>
            </h1>
            <p className="text-[12px] leading-relaxed [@media(max-width:700px)]:text-[11px]">
              invite you to celebrate our love
            </p>
            <p className="vg-script-heading !text-[34px] text-[#5a6946] [@media(max-width:700px)]:!text-[28px]">
              {wedding.date}
            </p>
          </div>
        </div>
      ),
    },
    ...(wedding.story
      ? [
          {
            id: "our-story",
            label: "Our story",
            content: (
              <div className="vg-story">
                <p className="vg-label">The moments that led us here</p>
                <h2 className="vg-heading">Our story</h2>
                <p className="vg-body">{wedding.story}</p>
              </div>
            ),
          },
        ]
      : []),
    ...photoPages(storyPhotos, "A little of us", "our-photos"),
    {
      id: "the-day",
      label: "The Wedding Venue",
      tone: "woodland",
      content: (
        <div className="vg-venues px-8 py-9 [@media(max-width:700px)]:flex [@media(max-width:700px)]:min-h-full [@media(max-width:700px)]:flex-col [@media(max-width:700px)]:px-3 [@media(max-width:700px)]:py-3">
          <h2 className="sr-only">The Wedding Venue</h2>
          <div className="grid grid-cols-2 gap-12 [@media(max-width:700px)]:flex-1 [@media(max-width:700px)]:grid-cols-1 [@media(max-width:700px)]:grid-rows-2 [@media(max-width:700px)]:gap-6">
            <Venue />
            <Venue reception />
          </div>
        </div>
      ),
    },
    {
      id: "photo-break",
      label: "Us",
      tone: "woodland",
      fullBleed: true,
      content: <PhotoBreak />,
    },
  ];
}
