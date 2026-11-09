import { Fragment, type ReactNode } from "react";
import { Ornament, SlideHeading, Stationery } from "../components/Stationery";
import styles from "../styles/invitation.module.css";

type EntourageGroup = { title: string; names: string[] };

function NameList({ names, paired = false, className = "" }: { names: string[]; paired?: boolean; className?: string }) {
  return <ul className={`${paired ? "grid grid-cols-2 gap-6" : "space-y-1.5"} ${className} text-center text-xs leading-5 sm:text-sm`}>{names.map(name => <li key={name}>{name}</li>)}</ul>;
}

export function NameGroup({ title, names, paired = false }: EntourageGroup & { paired?: boolean }) {
  return <div className="flex flex-col gap-2 text-center"><h3 className={`${styles.groupTitle} ${paired ? "w-full text-center" : ""}`}>{title}</h3><NameList names={names} paired={paired} /></div>;
}

export function NameColumns({ groups }: { groups: EntourageGroup[] }) {
  const rows = Array.from({ length: Math.ceil(groups.length / 2) }, (_, row) => groups.slice(row * 2, row * 2 + 2));
  return <div className="flex flex-col gap-7">{rows.map(row => <div key={row[0].title} className="grid grid-cols-2 gap-x-6 gap-y-2 text-center">
    {row.map((group, column) => <Fragment key={group.title}>
      <h3 className={`${styles.groupTitle} ${column === 0 ? "col-start-1" : "col-start-2"} row-start-1`}>{group.title}</h3>
      <NameList names={group.names} className={`${column === 0 ? "col-start-1" : "col-start-2"} row-start-2`} />
    </Fragment>)}
  </div>)}</div>;
}

export function EntourageSlide({ title, children }: { title: string; children: ReactNode }) {
  return <Stationery title={title}><div className="mx-auto w-full max-w-xl text-center">{children}</div></Stationery>;
}

export function SponsorSlide({ pairs }: { pairs: string[][] }) {
  return <div data-invitation-scroll tabIndex={0} role="region" aria-label="Principal sponsors" className={`${styles.sponsorScroller} ${styles.entourageScroller} absolute inset-0 overflow-y-auto overscroll-contain outline-none`}>
    <div className="relative mx-auto flex min-h-full w-full max-w-3xl flex-col items-center justify-center gap-3 px-4 py-4 text-center sm:px-12">
      <div className="flex shrink-0 flex-col items-center gap-2"><Ornament /><SlideHeading>Principal Sponsors</SlideHeading></div>
      <p className="shrink-0 text-xs italic">With gratitude to our guiding lights</p>
      <ul className="flex w-full shrink-0 flex-col gap-1.5 text-center">{pairs.map(([left, right]) => <li key={left} className="grid grid-cols-2 items-start gap-6 text-xs leading-5 sm:text-sm"><span>{left}</span><span>{right}</span></li>)}</ul>
    </div>
  </div>;
}
