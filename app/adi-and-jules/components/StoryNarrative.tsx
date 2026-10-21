"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { wedding } from "../data";
import { useInvitationMotion } from "./motion/InvitationMotion";

const paragraphInterval = 0.9;
const paragraphStates = { hidden: { opacity: 0 }, revealing: { opacity: 1 }, complete: { opacity: 1 } };

// One continuous sequence across all paragraphs; scrolling never drives its progress.
function prepareNarrative() {
  let paragraphIndex = 0;
  return wedding.story.chapters.map(chapter => ({
    title: chapter.title,
    paragraphs: chapter.paragraphs.map(text => ({
      text,
      delay: paragraphIndex++ * paragraphInterval,
    })),
  }));
}

const narrative = prepareNarrative();

export default function StoryNarrative() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, amount: "some", margin: "0px 0px -48px 0px" });
  const reducedMotion = useReducedMotion();
  const { active } = useInvitationMotion();
  const state = reducedMotion ? "complete" : active && inView ? "revealing" : "hidden";

  return (
    <ul ref={ref} data-story-animation={state} className="space-y-8 text-left lg:space-y-10">
      {narrative.map(chapter => (
        <li key={chapter.title}>
          <div className="space-y-3 text-sm leading-7 text-[rgb(var(--aj-muted))]">
            {chapter.paragraphs.map(paragraph => (
              <p key={paragraph.text}>
                <span className="sr-only">{paragraph.text}</span>
                <motion.span
                  aria-hidden="true"
                  data-story-paragraph
                  className="block"
                  initial={false}
                  variants={paragraphStates}
                  animate={state}
                  transition={{ duration: reducedMotion ? 0 : 0.65, delay: state === "revealing" ? paragraph.delay : 0, ease: "easeOut" }}
                >
                  {paragraph.text}
                </motion.span>
              </p>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
