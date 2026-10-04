"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { wedding } from "../data";
import { useInvitationMotion } from "./motion/InvitationMotion";

const wordInterval = 0.075;
const paragraphPause = 0.2;
const wordStates = { hidden: { opacity: 0 }, typing: { opacity: 1 }, complete: { opacity: 1 } };

// One continuous sequence across all paragraphs; scrolling never drives its progress.
function prepareNarrative() {
  let nextDelay = 0;
  return wedding.story.chapters.map(chapter => ({
    title: chapter.title,
    paragraphs: chapter.paragraphs.map(text => {
      const tokens = text.split(/(\s+)/u).map(word => {
        if (!word.trim()) return { text: word, delay: null };
        const delay = nextDelay;
        nextDelay += wordInterval;
        return { text: word, delay };
      });
      nextDelay += paragraphPause;
      return { text, tokens };
    }),
  }));
}

const narrative = prepareNarrative();

export default function StoryNarrative() {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, amount: "some", margin: "0px 0px -48px 0px" });
  const reducedMotion = useReducedMotion();
  const { active } = useInvitationMotion();
  const state = reducedMotion ? "complete" : active && inView ? "typing" : "hidden";

  return (
    <ul ref={ref} data-story-animation={state} className="space-y-8 text-left lg:space-y-10">
      {narrative.map(chapter => (
        <li key={chapter.title}>
          <div className="space-y-3 text-sm leading-7 text-[rgb(var(--aj-muted))]">
            {chapter.paragraphs.map(paragraph => (
              <p key={paragraph.text}>
                <span className="sr-only">{paragraph.text}</span>
                <span aria-hidden="true">
                  {paragraph.tokens.map((token, index) => token.delay === null ? token.text : (
                    <motion.span
                      key={index}
                      className="aj-story-word inline-block"
                      initial={false}
                      variants={wordStates}
                      animate={state}
                      transition={{ duration: reducedMotion ? 0 : 0.12, delay: state === "typing" ? token.delay : 0, ease: "easeOut" }}
                    >
                      {token.text}
                    </motion.span>
                  ))}
                </span>
              </p>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
