"use client";

import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import type { InvitationActions, InvitationPage } from "./types";
import { wedding, attireDetails } from "../data";
import { media } from "../data/media";
import { Ornament } from "../components/artwork";
import PhotoBreak from "../components/photo-break";
import { photoPages } from "./photo-pages";

export function detailPages({ copyHashtag, copied, copyError }: InvitationActions): InvitationPage[] {
  const galleryPhotos = wedding.galleryPhotos.slice(0, 30 - Math.min(30, wedding.storyPhotos.length));
  return [
    {
      id: "together",
      label: "Together",
      fullBleed: true,
      content: <PhotoBreak fullPage />,
    },
    ...photoPages(galleryPhotos, "Our moments", "our-moments"),
    ...[
          {
            id: "attire",
            label: attireDetails.title,
            content: (
              <div className="vg-attire-page flex flex-col items-center gap-6 [@media(max-width:700px)]:gap-4">
                <h2 className="vg-heading !m-0">{attireDetails.title}</h2>
                <div className="flex flex-col gap-4 [@media(max-width:700px)]:gap-3">
                  <p className="vg-body">
                    {attireDetails.introduction}
                    <br />
                    {attireDetails.formality && <>We kindly request <strong>{attireDetails.formality}.</strong></>}
                  </p>
                  <p className="vg-body">
                    {attireDetails.colorFreedom}
                    <br />
                    {attireDetails.reservedShades && <><strong className="underline decoration-2 underline-offset-4">No</strong> {attireDetails.reservedShades}</>}
                  </p>
                  {attireDetails.weddingPartyColors && <p className="vg-body">
                    To help our wedding party stand out, we politely ask guests to <strong className="underline decoration-2 underline-offset-4">avoid</strong> wearing {attireDetails.weddingPartyColors}
                  </p>}
                </div>
                <figure className="vg-attire-reference relative shrink-0 p-2 [@media(max-width:700px)]:p-1.5">
                  <div className="relative aspect-[3/2] w-full">
                    <Image
                      src={media.attire}
                      alt={media.attireAlt}
                      fill
                      sizes="(max-width: 700px) 85vw, 520px"
                      quality={95}
                      className="object-contain"
                    />
                  </div>
                </figure>
              </div>
            ),
          },
        ],
    {
      id: "gifts",
      label: "A Note on Gifts",
      content: (
        <div className="vg-gifts-page flex flex-col items-center gap-4 [@media(max-height:740px)]:gap-2">
          <Ornament className="vg-ornament !m-0 [@media(max-height:740px)]:hidden" />
          <h2 className="vg-heading !m-0">A Note on Gifts</h2>
          <div className="vg-gift-copy space-y-2">
            <p className="vg-body whitespace-pre-line">{wedding.gifts.message}</p>
            {wedding.gifts.registryMessage && <p className="vg-body">{wedding.gifts.registryMessage}</p>}
          </div>
          {wedding.gifts.registryQr && <figure className="w-fit">
            <a
              href={wedding.gifts.registryQr}
              target="_blank"
              rel="noreferrer"
              aria-label="Open a larger gift registry QR code (opens in a new tab)"
              data-vg-reveal
              className="vg-registry-qr relative block aspect-square w-[220px] overflow-hidden mix-blend-multiply focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5a6946] [@media(max-height:740px)]:w-[200px]"
            >
              <Image
                src={wedding.gifts.registryQr}
                alt={`QR code for ${wedding.title}’s gift registry`}
                fill
                sizes="220px"
                unoptimized
                className="object-contain p-1"
              />
            </a>
            <figcaption data-vg-reveal className="mt-2 text-[11px] leading-relaxed text-[#646650]">
              Scan to view our gift registry.
              <br />
              Tap the code to enlarge.
            </figcaption>
          </figure>}
          {wedding.gifts.registryUrl && (
            <a
              className="vg-button inline-flex items-center justify-center gap-[14px] min-h-11 py-[15px] px-6 mt-[26px] vg-button-outline"
              href={wedding.gifts.registryUrl}
              target="_blank"
              rel="noreferrer"
            >
              View registry <ArrowUpRight size={15} />
            </a>
          )}
          <Ornament className="vg-ornament !m-0 [@media(max-height:740px)]:hidden" />
        </div>
      ),
    },
    ...(wedding.hashtag
      ? [
          {
            id: "share-the-joy",
            label: "Share the joy",
            content: (
              <div>
                <h2 className="vg-heading">Share the joy</h2>
                <p className="vg-body">
                  We’d love to see the day through your eyes. When sharing your
                  photos, use our wedding hashtag.
                </p>
                <button
                  className="vg-text-button inline-flex items-center justify-center gap-[14px] min-h-11 py-[10px] px-0 mt-6"
                  onClick={copyHashtag}
                >
                  {wedding.hashtag} {copied && <Check size={16} />}
                </button>
                <p role="status" className="vg-body">
                  {copied
                    ? "Hashtag copied."
                    : copyError
                      ? "Please select and copy the hashtag above."
                      : ""}
                </p>
              </div>
            ),
          },
        ]
      : []),
  ];
}
