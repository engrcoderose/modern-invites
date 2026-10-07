import Image from "next/image";
import ScrollScene from "../components/ScrollScene";
import ScrollLayer from "../components/ScrollLayer";
import TextReveal from "../components/TextReveal";
import { wedding } from "../data/wedding-data";
import pavilion from "../assets/designs/gardern-arch.png";
import divider from "../assets/designs/vines-1.png";
import rightVine from "../assets/designs/flower-vines.png";
import leftVine from "../assets/designs/flower-vines-2.png";

function MemberList({ members }: { members: readonly string[] }) {
  return (
    <ScrollScene as="ul" reveal className="jb-serif space-y-0.5 text-sm leading-snug text-[#293327] sm:text-base">
      {members.map((member, index) => (
        <ScrollLayer as="li" profile="text" phase={Math.min(index * 0.018, 0.18)} key={member}>{member}</ScrollLayer>
      ))}
    </ScrollScene>
  );
}

function EntourageDivider() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-8 flex h-6 items-center justify-center gap-3 sm:-top-10">
      <span className="jb-entourage-rule h-px w-12 sm:w-20" />
      <Image src={divider} alt="" sizes="80px" draggable={false} className="h-auto w-20 select-none opacity-80" />
      <span className="jb-entourage-rule h-px w-12 -scale-x-100 sm:w-20" />
    </div>
  );
}

export default function EntourageSection() {
  return (
    <ScrollScene id="entourage" aria-labelledby="jb-entourage-title" className="jb-entourage relative isolate overflow-hidden px-8 pb-20 pt-10 text-center sm:px-16 sm:pb-28 sm:pt-14">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <ScrollLayer profile="floral-right" className="absolute -right-10 top-40 w-24 sm:-right-12 sm:w-32"><Image src={rightVine} alt="" sizes="(min-width: 640px) 128px, 96px" draggable={false} className="h-auto w-full select-none" /></ScrollLayer>
        <ScrollLayer profile="floral-left" className="absolute -left-12 top-[34%] w-28 sm:-left-14 sm:w-36"><Image src={leftVine} alt="" sizes="(min-width: 640px) 144px, 112px" draggable={false} className="h-auto w-full select-none" /></ScrollLayer>
      </div>
      <div className="relative z-10 mx-auto max-w-3xl">
        <ScrollLayer as="header" profile="heading" className="mb-12 sm:mb-16">
          <Image src={pavilion} alt="" aria-hidden="true" sizes="(min-width: 640px) 160px, 128px" draggable={false} className="pointer-events-none mx-auto mb-3 h-auto w-32 select-none sm:w-40" />
          <h2 id="jb-entourage-title" className="jb-entourage-script text-4xl sm:text-5xl">The Entourage</h2>
          <Image src={divider} alt="" aria-hidden="true" sizes="(min-width: 640px) 160px, 128px" draggable={false} className="pointer-events-none mx-auto mt-3 h-auto w-32 select-none sm:w-40" />
        </ScrollLayer>
        <div className="space-y-10 sm:space-y-14">
          {wedding.entourage.filter((group) => !group.pending).map((group, index) => (
            <section
              key={group.title}
              aria-labelledby={`jb-entourage-group-${index}`}
              className="relative"
            >
              {group.title === "Secondary Sponsors" && (
                <Image
                  src={rightVine}
                  alt=""
                  aria-hidden="true"
                  sizes="(min-width: 640px) 160px, 128px"
                  draggable={false}
                  className="pointer-events-none absolute right-[calc(50%-50vw-3.5rem)] top-12 -z-10 h-auto w-32 select-none sm:right-[calc(50%-50vw-4rem)] sm:w-40"
                />
              )}
              {index > 0 && <EntourageDivider />}
              {group.title === "Our parents" ? <h3 id={`jb-entourage-group-${index}`} className="sr-only">{group.title}</h3> : <TextReveal as="h3" id={`jb-entourage-group-${index}`} className="jb-entourage-script mb-5 text-3xl sm:mb-7 sm:text-4xl">
                {group.title}
              </TextReveal>}
              {group.members && <MemberList members={group.members} />}
              {group.memberColumns && (
                <div className="grid grid-cols-2 gap-x-4 sm:gap-x-10">
                  {group.memberColumns.map((members, columnIndex) => <MemberList key={columnIndex} members={members} />)}
                </div>
              )}
              {group.roles && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-10 sm:gap-y-10">
                  {group.roles.map((role, roleIndex) => (
                    <div key={role.title} className={group.roles && group.roles.length % 2 === 1 && roleIndex === group.roles.length - 1 ? "col-span-2" : undefined}>
                      <TextReveal as="h4" className="jb-entourage-script mb-2 text-[1.4rem] leading-tight sm:text-[1.75rem]">
                        {role.title}
                      </TextReveal>
                      <MemberList members={role.members} />
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </ScrollScene>
  );
}
