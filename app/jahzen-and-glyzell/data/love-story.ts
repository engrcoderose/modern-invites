import { wedding } from "./wedding";

function divideAt(text: string, marker: string): [string, string] {
  const boundary = text.indexOf(marker);
  return boundary < 0 ? [text, ""] : [text.slice(0, boundary).trim(), text.slice(boundary).trim()];
}

const intro = "Some stories begin with a meeting, while ours began with a message.";
const [beginning, acrossTheMiles] = divideAt(wedding.story[0], "Across 6,600 miles");
const [meeting, proposal] = divideAt(wedding.story[1], "Two days before Glyzell");
const [firstMeeting, learningEachOther] = divideAt(meeting, "It was our chance");
const [sharedGoals, choosingMarriage] = divideAt(learningEachOther, "We both understood");

// Keep the complete questionnaire narrative, arranging it into the four
// reference chapters rather than shortening or rewriting the couple's words.
export const loveStory = {
  title: ["A Love That", "Found Its Way."],
  intro,
  chapters: [
    { number: "01", title: "A Simple Beginning", paragraphs: [beginning.replace(intro, "").trim(), acrossTheMiles].filter(Boolean), photo: "hands" },
    { number: "02", title: "Meeting in Person", paragraphs: [firstMeeting, sharedGoals, choosingMarriage].filter(Boolean), photo: "together" },
    { number: "03", title: "The Proposal", paragraphs: [proposal].filter(Boolean), photo: "proposal" },
    { number: "04", title: "A Forever to Look Forward To", paragraphs: [wedding.story[2]], photo: null },
  ],
} as const;

export type LoveStoryChapter = (typeof loveStory.chapters)[number];
