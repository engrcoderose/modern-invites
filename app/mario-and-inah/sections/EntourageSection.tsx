import Image from "next/image";
import FloralArtwork from "../components/FloralArtwork";
import ParallaxLayer from "../components/ParallaxLayer";
import EntourageDivider from "../components/EntourageDivider";
import { artwork } from "../data/artwork";
import { entourage, parents } from "../data/entourage";
import styles from "../styles/invitation.module.css";

function MemberList({ members, paired = false }: { members: readonly string[]; paired?: boolean }) {
  return <ul className={`${styles.entourageNames} mt-4 grid gap-y-2 ${paired ? "grid-cols-2 gap-x-6 [@media(max-width:359px)]:grid-cols-1 sm:gap-x-14" : ""}`}>
    {members.map((name, index) => <li data-reveal="text" data-reveal-delay={0.06 + Math.floor(index / (paired ? 2 : 1)) * 0.045} key={name} className="min-w-0">{name}</li>)}
  </ul>;
}

export default function EntourageSection() {
  return (
    <section id="entourage" aria-labelledby="mi-entourage-title" className={`${styles.sage} relative isolate overflow-hidden px-6 pb-44 pt-16 text-center sm:px-10 sm:pb-52 sm:pt-20 lg:px-16`}>
      <ParallaxLayer reverse overscan className="-z-10">
        <Image data-reveal="photo" src={artwork.entouragePattern} alt="" aria-hidden="true" fill sizes="100vw" className="pointer-events-none object-cover opacity-45" />
      </ParallaxLayer>
      <ParallaxLayer className="-z-10">
        <FloralArtwork reveal name="entourageLeft" className="absolute bottom-3 left-0 h-auto w-[28%] max-w-[280px] -translate-x-1/4" sizes="(min-width: 1000px) 280px, 28vw" />
        <FloralArtwork reveal name="entourageRight" className="absolute bottom-3 right-0 h-auto w-[28%] max-w-[280px] translate-x-1/4" sizes="(min-width: 1000px) 280px, 28vw" />
      </ParallaxLayer>
      <div className="mx-auto max-w-3xl">
        <h2 data-reveal="heading" id="mi-entourage-title" className={styles.heading}>Our Wedding Entourage</h2>
        <ParallaxLayer inline className="mx-auto mt-6 w-32 sm:w-44">
          <FloralArtwork reveal name="entourageBouquet" className="h-auto w-full" sizes="(min-width: 640px) 176px, 128px" />
        </ParallaxLayer>
        <h3 data-reveal="text" className={`${styles.groupTitle} mx-auto mt-10 max-w-sm`}>With the blessings of our parents</h3>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 [@media(max-width:359px)]:grid-cols-1 sm:gap-x-14">
          {parents.map(group => <div key={group.title} className="min-w-0"><h4 data-reveal="text" className={styles.roleTitle}>{group.title}</h4><MemberList members={group.members} /></div>)}
        </div>
        <EntourageDivider />
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 [@media(max-width:359px)]:grid-cols-1 sm:gap-x-14 sm:gap-y-12">
          {entourage.map(group => {
            const principal = group.title === "Principal sponsors";
            return <div key={group.title} className={`min-w-0 ${principal ? `${styles.entourageSponsors} col-span-full py-8 sm:py-10` : ""}`}>
              <h3 data-reveal="text" className={styles.roleTitle}>{group.title}</h3>
              <MemberList members={group.members} paired={principal} />
            </div>;
          })}
        </div>
      </div>
    </section>
  );
}
