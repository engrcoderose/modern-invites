"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import closeEnvelope from "../assets/envelope.png";
import openEnvelope from "../assets/open-envelope.png";
import initials from "../assets/deco/eric-and-li-initials.png";
import weddingFlower from "../assets/deco/wedding-flower.png";
import rings from "../assets/deco/rings.png";
import lineBrown from "../assets/lines/line-brown.png";


interface EnvelopeIntroProps {
  bride: string;
  groom: string;
  onOpened?: () => void;
}

export default function EnvelopeIntro({
  bride,
  groom,
  onOpened,
}: EnvelopeIntroProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isVisible]);

  const openInvitation = () => {
    if (isOpening) {
      return;
    }

    setIsOpening(true);
    window.setTimeout(() => {
      setIsVisible(false);
      window.setTimeout(() => {
        onOpened?.();
      }, 750);
    }, 1850);
  };

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-hidden bg-[#f7efe4] px-5 py-8"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.025 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          aria-label="Open wedding invitation"
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(235,204,144,0.32),transparent_34%),linear-gradient(180deg,#fffaf2_0%,#efe0cb_100%)]"
            animate={{ scale: isOpening ? 1.08 : 1 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />

          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[min(86vw,640px)] w-[min(86vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9a66b]/45"
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: isOpening ? 0.2 : 1, scale: isOpening ? 1.18 : 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />

          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[min(72vw,520px)] w-[min(72vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#5b351e]/15"
            initial={{ opacity: 0, scale: 0.78 }}
            animate={{ opacity: isOpening ? 0 : 1, scale: isOpening ? 1.28 : 1 }}
            transition={{ duration: 1.5, delay: 0.15, ease: "easeOut" }}
          />

          <motion.div
            aria-hidden="true"
            className="absolute -left-10 top-12 h-44 w-44 opacity-50 md:left-12 md:top-16 md:h-64 md:w-64"
            initial={{ opacity: 0, rotate: -18, x: -20 }}
            animate={{
              opacity: isOpening ? 0 : 0.5,
              rotate: isOpening ? -26 : -10,
              x: isOpening ? -46 : 0,
              y: isOpening ? -18 : 0,
            }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            <Image src={weddingFlower} alt="" fill className="object-contain" />
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="absolute -right-6 bottom-20 h-28 w-28 opacity-45 md:right-20 md:h-40 md:w-40"
            initial={{ opacity: 0, rotate: 15, x: 20 }}
            animate={{
              opacity: isOpening ? 0 : 0.45,
              rotate: isOpening ? 28 : 8,
              x: isOpening ? 48 : 0,
              y: isOpening ? 30 : 0,
            }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            <Image src={rings} alt="" fill className="object-contain" />
          </motion.div>

          <motion.div
            className="relative z-10 flex w-full max-w-[28rem] flex-col items-center text-center"
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              className="relative mb-4 h-24 w-32 md:h-28 md:w-40"
              animate={{
                opacity: isOpening ? 0 : 1,
                y: isOpening ? -16 : 0,
                scale: isOpening ? 0.92 : 1,
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <Image
                src={initials}
                alt={`${groom} and ${bride} initials`}
                fill
                priority
                className="object-contain opacity-75 [filter:brightness(0)_saturate(100%)_invert(28%)_sepia(32%)_saturate(748%)_hue-rotate(346deg)_brightness(92%)_contrast(86%)]"
              />
            </motion.div>

            <motion.p
              className="mb-2 text-[0.68rem] uppercase tracking-[0.42em] text-[#6b472f]"
              animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? -12 : 0 }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
            >
              Wedding Invitation
            </motion.p>

            <motion.div
              aria-hidden="true"
              className="relative mb-2 h-5 w-44 opacity-70"
              animate={{ opacity: isOpening ? 0 : 0.7, scaleX: isOpening ? 0.5 : 1 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <Image src={lineBrown} alt="" fill className="object-contain" />
            </motion.div>

            <button
              type="button"
              onClick={openInvitation}
              disabled={isOpening}
              className="group relative h-[min(75vw,24rem)] w-full max-w-[24rem] cursor-pointer outline-none transition disabled:cursor-default"
              aria-label={`Open ${groom} and ${bride}'s wedding invitation`}
            >
              <motion.div
                aria-hidden="true"
                className="absolute inset-x-12 bottom-4 h-10 rounded-full bg-[#5b351e]/20 blur-2xl"
                animate={{
                  opacity: isOpening ? 0 : 1,
                  scale: isOpening ? 0.62 : 1,
                }}
                transition={{ duration: 0.8 }}
              />

              <motion.div
                className="absolute inset-0"
                animate={{
                  opacity: isOpening ? 0 : 1,
                  y: isOpening ? 18 : [0, -8, 0],
                  scale: isOpening ? 0.96 : 1,
                  rotate: isOpening ? -2 : 0,
                }}
                transition={
                  isOpening
                    ? { duration: 0.45, ease: "easeInOut" }
                    : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <Image
                  src={closeEnvelope}
                  alt="Closed envelope"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 384px"
                  className="object-contain drop-shadow-[0_28px_45px_rgba(91,53,30,0.22)] transition duration-500 group-hover:scale-[1.03]"
                />
              </motion.div>

              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isOpening ? 1 : 0,
                  y: isOpening ? [-8, -28, -42] : -8,
                  scale: isOpening ? [0.98, 1.05, 1.12] : 0.98,
                  rotate: isOpening ? [0, 1.5, 0] : 0,
                }}
                transition={{
                  duration: 1.35,
                  delay: 0.12,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={openEnvelope}
                  alt="Opened envelope"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 384px"
                  className="object-contain drop-shadow-[0_32px_55px_rgba(91,53,30,0.25)]"
                />
              </motion.div>

              <motion.span
                className="absolute left-1/2 top-[47%] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7f1714]/70 blur-xl"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{
                  opacity: isOpening ? [0, 0.65, 0] : 0,
                  scale: isOpening ? [0.5, 1.2, 2.8] : 0.4,
                }}
                transition={{ duration: 1.25, ease: "easeOut" }}
                aria-hidden="true"
              />
            </button>

            <motion.div
              className="mt-2 flex flex-col items-center"
              animate={{
                opacity: isOpening ? 0 : 1,
                y: isOpening ? 18 : 0,
              }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
            >
              <p className="font-imperial text-4xl leading-none text-[#5b351e] md:text-5xl">
                {groom.split(" ")[0]} & {bride.split(" ")[0]}
              </p>
              <span className="mt-4 rounded-full border border-[#a67c52]/40 bg-white/45 px-6 py-2 text-xs uppercase tracking-[0.28em] text-[#5b351e] shadow-sm backdrop-blur">
                Open Invitation
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
