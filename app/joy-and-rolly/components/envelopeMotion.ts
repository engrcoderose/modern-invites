import type { Variants } from "framer-motion";

const paperEase = [0.45, 0.05, 0.2, 1] as const;
const cardEase = [0.42, 0, 0.24, 1] as const;

export const envelopeMotion = {
  anchor: { closed: { y: "-72%" }, opened: { y: "0%", transition: { delay: 0.15, duration: 1.9, ease: paperEase } } },
  caption: { closed: { opacity: 1 }, opened: { opacity: 0, transition: { duration: 0.3 } } },
  closedBody: { closed: { opacity: 1 }, opened: { opacity: 0, transition: { delay: 0.25, duration: 0.24 } } },
  closedFlap: {
    closed: { rotateX: 0, opacity: 1 },
    opened: { rotateX: 90, opacity: 0, transition: { delay: 0.25, duration: 1, ease: paperEase, opacity: { delay: 1.15, duration: 0.1 } } },
  },
  openFlap: {
    closed: { rotateX: -90, opacity: 0 },
    opened: { rotateX: 0, opacity: 1, transition: { delay: 1.2, duration: 1.05, ease: paperEase, opacity: { delay: 1.15, duration: 0.12 } } },
  },
  pocket: { closed: { opacity: 0 }, opened: { opacity: 1, transition: { delay: 0.25, duration: 0.24 } } },
  card: { closed: { y: "72%" }, opened: { y: "-35%", transition: { delay: 2.25, duration: 2.8, ease: cardEase } } },
} satisfies Record<string, Variants>;

export const envelopeHoldMs = 3000;
