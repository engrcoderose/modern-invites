"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart } from "lucide-react";
import Image from "next/image";
import closeEnvelope from "../assets/envelope.png";
import openEnvelope from "../assets/open-envelope.png"


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
    }, 300);
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
              className="group relative h-[600px] w-full max-w-sm cursor-pointer hover:scale-105"
              aria-label={`Open ${groom} and ${bride}'s wedding invitation`}
            >

              {/* Closed Envelope */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  opacity: isOpening ? 0 : 1,
                }}
                transition={{
                  duration: 0.15,
                }}
              >
                <Image
                  src={closeEnvelope}
                  alt="Closed envelope"
                  fill
                  priority
                  className="object-contain w-[300px] h-[300px]"
                />
              </motion.div>

              {/* Open Envelope */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isOpening ? 1 : 0,
                }}
                transition={{
                  duration: 0.10,
                  delay: 0.10,
                }}
              >
                <Image
                  src={openEnvelope}
                  alt="Opened envelope"
                  fill
                  priority
                  className="object-contain"
                />
              </motion.div>
            </button>

          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
