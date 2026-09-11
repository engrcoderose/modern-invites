import GiftSection from "./GiftSection";
import HashtagSection from "./HashtagSection";
import { wedding } from "../data";

export default function GiftAndHashtagSections() {
  return (
    <>
      <GiftSection />
      <HashtagSection hashtag={wedding.hashtag} />
    </>
  );
}
