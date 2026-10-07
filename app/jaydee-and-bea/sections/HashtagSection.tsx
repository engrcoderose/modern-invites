import Image from "next/image";
import leafyDivider from "../assets/designs/vines-1.png";
import { wedding } from "../data/wedding-data";
import ScrollScene from "../components/ScrollScene";
import ScrollLayer from "../components/ScrollLayer";

export default function HashtagSection() {
  if (!wedding.hashtag.value) return null;

  return (
    <ScrollScene id="hashtag" aria-labelledby="jb-hashtag-title" className="jb-details px-5 py-16 text-center sm:px-8 sm:py-24">
      <ScrollLayer as="h2" profile="heading" id="jb-hashtag-title" className="jb-details-title">The wedding hashtag</ScrollLayer>
      <Image src={leafyDivider} alt="" aria-hidden="true" className="mx-auto mt-6 h-auto w-40" />
      <p className="mx-auto mt-8 max-w-xl break-words text-base leading-8 sm:text-xl">{wedding.hashtag.value}</p>
    </ScrollScene>
  );
}
