"use client";

import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import type { InvitationActions, InvitationPage } from "./types";
import { wedding, attireDetails } from "../data";
import { Ornament } from "../components/artwork";
import { photoPages } from "./photo-pages";

export function detailPages({ copyHashtag, copied, copyError }: InvitationActions): InvitationPage[] {
  const galleryPhotos = wedding.galleryPhotos.slice(0, 30 - Math.min(30, wedding.storyPhotos.length));
  return [
    ...photoPages(galleryPhotos, "Our moments", "our-moments"),
    ...[
          {
            id: "attire",
            label: attireDetails.title,
            content: (
              <div className="op-attire-page flex flex-col items-center gap-6 [@media(max-width:700px)]:gap-4">
                <h2 className="op-heading !m-0">{attireDetails.title}</h2>
                <div className="flex flex-col gap-4 [@media(max-width:700px)]:gap-3">
                  <p className="op-body">
                    {attireDetails.introduction}
                    <br />
                    {attireDetails.formality && <>We kindly request <strong>{attireDetails.formality}.</strong></>}
                  </p>
                  <p className="op-body">
                    {attireDetails.colorFreedom}
                    <br />
                    {attireDetails.reservedShades && <><strong className="underline decoration-2 underline-offset-4">No</strong> {attireDetails.reservedShades}</>}
                  </p>
                  {attireDetails.weddingPartyColors && <p className="op-body">
                    To help our wedding party stand out, we politely ask guests to <strong className="underline decoration-2 underline-offset-4">avoid</strong> wearing {attireDetails.weddingPartyColors}
                  </p>}
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex gap-4" aria-label="Guest colors: beige and light brown">
                    <span className="flex flex-col items-center gap-2 text-xs"><span className="size-12 rounded-full bg-[#d9c7ab]" />Beige</span>
                    <span className="flex flex-col items-center gap-2 text-xs"><span className="size-12 rounded-full bg-[#b99979]" />Light brown</span>
                  </div>
                  <p className="op-body">{attireDetails.sponsors}</p>
                  <div className="flex gap-3" aria-label="Principal sponsor colors: shades of blue">
                    <span className="size-9 rounded-full bg-[#a9bfd0]" /><span className="size-9 rounded-full bg-[#6686a5]" /><span className="size-9 rounded-full bg-[#365875]" />
                  </div>
                </div>
              </div>
            ),
          },
        ],
    {
      id: "gifts",
      label: "A Note on Gifts",
      content: (
        <div className="op-gifts-page flex flex-col items-center gap-4 [@media(max-height:740px)]:gap-2">
          <Ornament className="op-ornament !m-0 [@media(max-height:740px)]:hidden" />
          <h2 className="op-heading !m-0">A Note on Gifts</h2>
          <div className="op-gift-copy space-y-2">
            <p className="op-body whitespace-pre-line">{wedding.gifts.message}</p>
            {wedding.gifts.registryMessage && <p className="op-body">{wedding.gifts.registryMessage}</p>}
          </div>
          {wedding.gifts.registryQr && <figure className="w-fit">
            <a
              href={wedding.gifts.registryQr}
              target="_blank"
              rel="noreferrer"
              aria-label="Open a larger gift registry QR code (opens in a new tab)"
              data-op-reveal
              className="op-registry-qr relative block aspect-square w-[220px] overflow-hidden mix-blend-multiply focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5a6946] [@media(max-height:740px)]:w-[200px]"
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
            <figcaption data-op-reveal className="mt-2 text-[11px] leading-relaxed text-[#646650]">
              Scan to view our gift registry.
              <br />
              Tap the code to enlarge.
            </figcaption>
          </figure>}
          {wedding.gifts.registryUrl && (
            <a
              className="op-button inline-flex items-center justify-center gap-[14px] min-h-11 py-[15px] px-6 mt-[26px] op-button-outline"
              href={wedding.gifts.registryUrl}
              target="_blank"
              rel="noreferrer"
            >
              View registry <ArrowUpRight size={15} />
            </a>
          )}
          <Ornament className="op-ornament !m-0 [@media(max-height:740px)]:hidden" />
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
                <h2 className="op-heading">Share the joy</h2>
                <p className="op-body">
                  We’d love to see the day through your eyes. When sharing your
                  photos, use our wedding hashtag.
                </p>
                <button
                  className="op-text-button inline-flex items-center justify-center gap-[14px] min-h-11 py-[10px] px-0 mt-6"
                  onClick={copyHashtag}
                >
                  {wedding.hashtag} {copied && <Check size={16} />}
                </button>
                <p role="status" className="op-body">
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
