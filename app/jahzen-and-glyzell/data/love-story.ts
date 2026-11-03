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

export type StoryMilestoneData = {
  id: string;
  label: string;
  dateTime?: string;
  title: string;
  paragraphs: string[];
};

// Group the complete questionnaire wording without inventing milestone dates.
export const storyMilestones: StoryMilestoneData[] = [
  {
    id: "beginning", label: "2025", dateTime: "2025", title: "A simple beginning",
    paragraphs: [intro, beginning.replace(intro, "").trim(), acrossTheMiles].filter(Boolean),
  },
  {
    id: "meeting", label: "Six months later", title: "Beyond the screen",
    paragraphs: [firstMeeting, sharedGoals, choosingMarriage].filter(Boolean),
  },
  {
    id: "proposal", label: "Before her departure", title: "A promise of forever",
    paragraphs: [proposal].filter(Boolean),
  },
  {
    id: "forever", label: "May 30, 2027", dateTime: "2027-05-30", title: "Our next chapter",
    paragraphs: [wedding.story[2]],
  },
];
