"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart } from "lucide-react";

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
      onOpened?.();
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-hidden bg-[#f7efe4] px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          aria-label="Open wedding invitation"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_transparent_36%),linear-gradient(135deg,_rgba(235,204,144,0.24),_rgba(126,76,52,0.2))]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#dac3a3] to-transparent" />

          <motion.div
            className="relative z-10 flex w-full max-w-md flex-col items-center text-center"
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-[#6b472f]">
              Wedding Invitation
            </p>

            <button
              type="button"
              onClick={openInvitation}
              disabled={isOpening}
              className="group relative h-64 w-full max-w-sm cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-[#8b5a36] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f7efe4] disabled:cursor-default"
              aria-label={`Open ${groom} and ${bride}'s wedding invitation`}
            >
              <motion.div
                className="absolute left-1/2 top-0 h-24 w-44 -translate-x-1/2 rounded-t-full bg-[#8b5a36] shadow-xl"
                animate={isOpening ? { y: -36, opacity: 0 } : { y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />

              <motion.div
                className="absolute inset-x-0 bottom-0 mx-auto h-44 overflow-hidden rounded-b-md bg-[#c99456] shadow-2xl"
                animate={isOpening ? { y: 110, scale: 0.92, opacity: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#f4d197] via-[#d4a368] to-[#8b5a36]" />
                <div className="absolute left-0 top-0 h-0 w-0 border-b-[176px] border-l-[176px] border-b-[#b77a43] border-l-transparent" />
                <div className="absolute right-0 top-0 h-0 w-0 border-b-[176px] border-r-[176px] border-b-[#a96e3d] border-r-transparent" />
                <div className="absolute bottom-0 left-1/2 h-0 w-0 -translate-x-1/2 border-b-[112px] border-l-[176px] border-r-[176px] border-b-[#d2a060] border-l-transparent border-r-transparent" />
              </motion.div>

              <motion.div
                className="absolute inset-x-8 bottom-10 h-52 rounded-sm bg-white px-6 py-8 shadow-xl z-99"
                initial={{ y: 72 }}
                animate={
                  isOpening
                    ? { y: -78, scale: 1.04, opacity: 1 }
                    : { y: 72, scale: 1, opacity: 0.96 }
                }
                transition={{ duration: 0.9, delay: isOpening ? 0.25 : 0, ease: "easeInOut" }}
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#ebcc90] text-rose-500">
                  <Heart className="h-5 w-5 fill-rose-500" />
                </div>
                <p className="font-imperial text-4xl leading-none text-[#5b351e]">
                  {groom}
                </p>
                <p className="my-1 text-sm uppercase tracking-[0.4em] text-[#9b7352]">
                  and
                </p>
                <p className="font-imperial text-4xl leading-none text-[#5b351e]">
                  {bride}
                </p>
              </motion.div>

              <motion.div
                className="absolute inset-x-0 bottom-0 mx-auto h-44 rounded-b-md"
                style={{ transformStyle: "preserve-3d", transformOrigin: "top" }}
                animate={isOpening ? { rotateX: 180, y: -18 } : { rotateX: 0, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <div className="absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2 border-l-[176px] border-r-[176px] border-t-[112px] border-l-transparent border-r-transparent border-t-[#e5b875]" />
              </motion.div>
            </button>

            <motion.button
              type="button"
              onClick={openInvitation}
              disabled={isOpening}
              className="mt-8 rounded-md bg-[#5b351e] px-8 py-3 text-sm uppercase tracking-[0.26em] text-white shadow-lg transition hover:bg-[#6f4328] disabled:opacity-70"
              animate={isOpening ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }}
            >
              {isOpening ? "Opening..." : "Open Invitation"}
            </motion.button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
