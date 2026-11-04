import ScrollLayer from "./ScrollLayer";
import TextReveal from "./TextReveal";
import type { EntourageGroup as EntourageGroupData } from "../types/wedding";
import styles from "../styles/entourage.module.css";

function MemberList({ members, align = "center" }: { members: readonly string[]; align?: "left" | "right" | "center" }) {
  const alignment = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";
  return (
    <ul className={`jb-serif ${alignment} space-y-0.5 text-sm leading-[1.4] sm:text-base`}>
      {members.map((member, index) => <ScrollLayer as="li" profile="text" staggerIndex={index + 1} key={member}>{member}</ScrollLayer>)}
    </ul>
  );
}

export default function EntourageGroup({ group, id }: { group: EntourageGroupData; id: string }) {
  const parents = group.title === "Our parents";
  const roles = group.roles;
  return (
    <section aria-labelledby={id}>
      {parents ? <h3 id={id} className="sr-only">{group.title}</h3> : (
        <TextReveal as="h3" id={id} className={`${styles.script} mb-5 text-[2rem] sm:mb-7 sm:text-[2.5rem]`}>{group.title}</TextReveal>
      )}
      {group.members && <MemberList members={group.members} />}
      {group.memberColumns && (
        <div className="grid grid-cols-2 gap-x-5 sm:gap-x-12">
          {group.memberColumns.map((members, index) => <MemberList key={index} members={members} align={index === 0 ? "right" : "left"} />)}
        </div>
      )}
      {roles && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-10 sm:gap-y-10">
          {roles.map((role, index) => (
            <div key={role.title} className={roles.length % 2 === 1 && index === roles.length - 1 ? "col-span-2" : undefined}>
              <TextReveal as="h4" className={`${styles.script} mb-2 text-[1.4rem] sm:text-[1.9rem]`}>{role.title}</TextReveal>
              <MemberList members={role.members} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
