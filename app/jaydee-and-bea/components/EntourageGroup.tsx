import ScrollLayer from "./ScrollLayer";
import TextReveal from "./TextReveal";
import type { EntourageGroup as EntourageGroupData } from "../types/wedding";
import styles from "../styles/entourage.module.css";

function MemberList({ members, alignFirstRow = false }: { members: readonly string[]; alignFirstRow?: boolean }) {
  return (
    <ul className="jb-serif space-y-0.5 text-center text-sm leading-[1.4] sm:text-base">
      {members.map((member, index) => <ScrollLayer as="li" profile="text" staggerIndex={index + 1} key={member}
        className={alignFirstRow && index === 0 ? "min-h-[2lh] sm:min-h-0" : undefined}>{member}</ScrollLayer>)}
    </ul>
  );
}

function MemberRows({ rows }: { rows: readonly (readonly string[])[] }) {
  return (
    <ul className="jb-serif space-y-2 text-sm leading-[1.4] sm:space-y-0.5 sm:text-base">
      {rows.map((members, index) => (
        <ScrollLayer as="li" profile="text" staggerIndex={index + 1} key={members.join("|")}
          className={`grid items-start gap-x-5 sm:gap-x-6 ${members.length === 2 ? "grid-cols-2" : members.length === 3 ? "grid-cols-1 gap-y-0.5 sm:flex sm:justify-center" : "grid-cols-1"}`}>
          {members.map((member, memberIndex) => (
            <span key={member} className={`min-w-0 ${members.length === 2 ? memberIndex === 0 ? "text-right" : "text-left" : "text-center"}`}>{member}</span>
          ))}
        </ScrollLayer>
      ))}
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
      {group.memberRows && <MemberRows rows={group.memberRows} />}
      {roles && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-10 sm:gap-y-10">
          {roles.map((role, index) => {
            const fullWidth = roles.length % 2 === 1 && index === roles.length - 1;
            return (
              <div key={role.title} className={fullWidth ? "col-span-2" : undefined}>
                <TextReveal as="h4" className={`${styles.script} mb-2 text-[1.4rem] sm:text-[1.9rem]`}>{role.title}</TextReveal>
                <MemberList members={role.members} alignFirstRow={group.title === "Secondary Sponsors" && !fullWidth} />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
