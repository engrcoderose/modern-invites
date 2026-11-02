import { bearers, flowerGirls, godparents, honorAttendants, parents, secondarySponsors, weddingParty } from "../data/entourage";
import { Ornament, PageHeading } from "../components/Stationery";
import styles from "../styles/wedding.module.css";

function PairedNames({ pairs }: { pairs: string[][] }) {
  return <div className={`${styles.pairedNames} mx-auto grid w-full max-w-[690px] grid-cols-2 gap-x-5 gap-y-3 sm:gap-x-10 [@media(max-height:800px)]:gap-y-2`} data-reveal>{pairs.flatMap((pair, row) => pair.map((name, column) => <p key={`${row}-${column}`} className={column === 0 ? "text-right" : "text-left"}>{name}</p>))}</div>;
}

export function ParentsPage() {
  return <div className="w-full max-w-[740px] text-center"><Ornament /><div className="mt-6"><PageHeading>With Love and Gratitude</PageHeading></div><div className="space-y-10 sm:space-y-12">{parents.map((group) => <section key={group.role} data-reveal><h3 className={`${styles.label} mb-4`}>{group.role}</h3><div className={`${styles.parentNames} grid grid-cols-2 gap-x-6`}>{group.names.map((name, index) => <p key={name} className={index === 0 ? "text-right" : "text-left"}>{name}</p>)}</div></section>)}</div></div>;
}

export function GodparentsPage() {
  return <div className="w-full max-w-[800px] text-center"><Ornament /><div className="mt-6"><PageHeading>With Love and Gratitude</PageHeading></div><h3 className={`${styles.label} mb-7`}>Godparents</h3><PairedNames pairs={godparents} /></div>;
}

export function WeddingPartyPage() {
  return <div className="w-full max-w-[800px] text-center"><PageHeading>Our Wedding Party</PageHeading><div className="grid grid-cols-2 gap-5" data-reveal>{honorAttendants.map((person) => <section key={person.role}><h3 className={`${styles.label} mb-3`}>{person.role}</h3><p className={styles.pairedNames}>{person.name}</p></section>)}</div>
    <section className="mt-7 [@media(max-height:800px)]:mt-5"><h3 className={`${styles.label} mb-4 [@media(max-height:800px)]:mb-3`}>Secondary sponsors</h3><PairedNames pairs={secondarySponsors} /></section>
    <section className="mt-7 [@media(max-height:800px)]:mt-5"><div className={`${styles.label} mb-4 grid grid-cols-2 gap-5 [@media(max-height:800px)]:mb-3`}><h3>Bridesmaids</h3><h3>Groomsmen</h3></div><PairedNames pairs={weddingParty} /></section>
  </div>;
}

export function LittleOnesPage() {
  return <div className="w-full max-w-[700px] text-center"><PageHeading>Our Wedding Party</PageHeading><div className="grid gap-9 sm:grid-cols-2 sm:gap-12"><section data-reveal><h3 className={`${styles.label} mb-5`}>Flower girls</h3><div className={`${styles.parentNames} space-y-4`}>{flowerGirls.map((name) => <p key={name}>{name}</p>)}</div></section><div className="space-y-6" data-reveal>{bearers.map((person) => <section key={person.role}><h3 className={`${styles.label} mb-3`}>{person.role}</h3><p className={styles.parentNames}>{person.name}</p></section>)}</div></div><div className="mt-10"><Ornament /></div></div>;
}
