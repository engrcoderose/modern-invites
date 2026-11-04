import Image from "next/image";
import ScrollScene from "../components/ScrollScene";
import ScrollLayer from "../components/ScrollLayer";
import EntourageArtwork from "../components/EntourageArtwork";
import EntourageGroup from "../components/EntourageGroup";
import { wedding } from "../data/wedding-data";
import { leafyDivider } from "../data/design-media";
import fountain from "../assets/designs/entourage_fountain.png";
import styles from "../styles/entourage.module.css";

export default function EntourageSection() {
  const groups = wedding.entourage.map((group, index) => ({ group, id: `jb-entourage-group-${index}` })).filter(({ group }) => !group.pending);
  const parents = groups.find(({ group }) => group.title === "Our parents");
  const sponsors = groups.find(({ group }) => group.title === "Principal Sponsors");
  const remaining = groups.filter((entry) => entry !== parents && entry !== sponsors);

  return (
    <ScrollScene id="entourage" aria-labelledby="jb-entourage-title" className={`${styles.section} relative isolate overflow-hidden text-center`}>
      <EntourageArtwork />
      <div className="relative px-5 pb-4 pt-10 sm:px-8 sm:pb-8 sm:pt-12">
        <div className="relative mx-auto max-w-3xl">
          <ScrollLayer as="header" profile="heading" className="mb-10 sm:mb-12">
            <Image src={fountain} alt="" aria-hidden="true" sizes="(min-width: 1024px) 144px, (min-width: 640px) 128px, 96px" draggable={false} className="pointer-events-none mx-auto mb-2 h-auto w-24 select-none sm:w-32 lg:w-36" />
            <h2 id="jb-entourage-title" className={`${styles.script} ${styles.title}`}>The Entourage</h2>
            <Image src={leafyDivider} alt="" aria-hidden="true" sizes="(min-width: 640px) 160px, 128px" draggable={false} className="pointer-events-none mx-auto mt-6 h-auto w-32 select-none sm:w-40" />
          </ScrollLayer>
          {parents && <EntourageGroup {...parents} />}
          {sponsors && <div className="mt-10 sm:mt-14"><EntourageGroup {...sponsors} /></div>}
        </div>
      </div>
      <div className="relative mx-auto max-w-3xl space-y-12 px-5 pb-[clamp(11rem,36vw,19rem)] pt-8 sm:space-y-16 sm:px-8">
        {remaining.map((entry) => <EntourageGroup key={entry.id} {...entry} />)}
      </div>
    </ScrollScene>
  );
}
