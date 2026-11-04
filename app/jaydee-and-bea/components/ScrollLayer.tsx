"use client";

import { motion, useTransform } from "motion/react";
import type { ReactNode, MouseEventHandler } from "react";
import { useScrollScene } from "./ScrollScene";
import { scrollProfiles, type ScrollProfileName } from "../utils/scroll-profiles";
import { isEntranceProfile, type EntranceProfile } from "../utils/scroll-entrance";
import ScrollEntrance from "./ScrollEntrance";

export interface ScrollLayerProps {
  children?: ReactNode;
  className?: string;
  id?: string;
  as?: "div" | "figure" | "header" | "h2" | "h3" | "h4" | "p" | "li" | "time" | "article" | "button" | "details";
  dateTime?: string;
  profile: ScrollProfileName | EntranceProfile;
  staggerIndex?: number;
  type?: "button";
  onClick?: MouseEventHandler<HTMLElement>;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-live"?: "off" | "polite" | "assertive";
}

export default function ScrollLayer({ profile, ...props }: ScrollLayerProps) {
  return isEntranceProfile(profile)
    ? <ScrollEntrance profile={profile} {...props} />
    : <ScrollParallaxLayer profile={profile} {...props} />;
}

function ScrollParallaxLayer({ as = "div", profile, staggerIndex: _staggerIndex, ...props }: Omit<ScrollLayerProps, "profile"> & { profile: ScrollProfileName }) {
  const { progress, enabled } = useScrollScene();
  const config = scrollProfiles[profile];
  const input = config.input;
  const zeros = input.map(() => 0);
  const ones = input.map(() => 1);
  const x = useTransform(progress, input, config.x ?? zeros);
  const y = useTransform(progress, input, config.y);
  const scale = useTransform(progress, input, config.scale ?? ones);
  const opacity = useTransform(progress, input, config.opacity ?? ones);
  const rotate = useTransform(progress, input, config.rotate ?? zeros);
  const filter = useTransform(progress, input, config.blur ?? input.map(() => "none"));
  const clipPath = useTransform(progress, input, config.clip ?? input.map(() => "none"));
  const Tag = motion[as];

  return <Tag {...props} data-scroll-layer={profile} style={{
    x: enabled ? x : 0,
    y: enabled ? y : 0,
    scale: enabled ? scale : 1,
    opacity: enabled ? opacity : 1,
    rotate: enabled ? rotate : 0,
    ...(config.blur ? { filter: enabled ? filter : "none" } : {}),
    ...(config.clip ? { clipPath: enabled ? clipPath : "none" } : {}),
  }} />;
}
