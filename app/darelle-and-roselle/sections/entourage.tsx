import Section from "../components/section";
import PartyGroup from "../components/party-group";
import { Ornament } from "../components/artwork";
import { entourage } from "../data/entourage";
import styles from "../styles/invitation.module.css";

export default function Entourage() {
  return (
    <Section id="entourage" tone="olive">
      <div className="mx-auto flex max-w-[660px] flex-col items-center gap-12 sm:gap-16">
        <div className="flex flex-col items-center gap-5">
          <Ornament className="h-7 w-[130px]" />
          <h2 className={`${styles.script} text-[30px] sm:text-[36px]`}>With Love and Gratitude</h2>
        </div>
        <div className="grid w-full gap-10 sm:grid-cols-2 sm:gap-8">
          <PartyGroup title="Parents of the Bride" names={entourage.brideParents} />
          <PartyGroup title="Parents of the Groom" names={entourage.groomParents} />
        </div>
        <div className="grid w-full gap-6">
          <h3 className={styles.role}>Principal Sponsors</h3>
          <ul className={`${styles.names} grid gap-4`}>
            {entourage.principal.map((pair) => <li key={pair[0]} className="grid grid-cols-2 gap-6"><span className="text-right">{pair[0]}</span><span className="text-left">{pair[1]}</span></li>)}
          </ul>
        </div>
        <div className="flex flex-col items-center gap-5">
          <h3 className={`${styles.script} text-[30px] sm:text-[36px]`}>Our Wedding Party</h3>
          <Ornament className="h-7 w-[130px]" />
        </div>
        <div className="grid w-full grid-cols-2 gap-6">
          <PartyGroup title="Maid of Honor" names={entourage.maidOfHonor} />
          <PartyGroup title="Best Man" names={entourage.bestMan} />
        </div>
        <div className="grid w-full gap-8">
          <h3 className={styles.role}>Secondary Sponsors</h3>
          {entourage.secondary.map((group) => (
            <div key={group.role} className="grid gap-3">
              <h4 className={styles.role}>{group.role}</h4>
              <ul className={`${styles.names} grid grid-cols-2 gap-6`}><li className="text-right">{group.names[0]}</li><li className="text-left">{group.names[1]}</li></ul>
            </div>
          ))}
        </div>
        <div className="grid w-full grid-cols-2 gap-6 sm:gap-10">
          <PartyGroup title="Bridesmaids" names={entourage.bridesmaids} />
          <PartyGroup title="Groomsmen" names={entourage.groomsmen} />
        </div>
        <div className="grid w-full gap-8 sm:grid-cols-3 sm:gap-6">
          {entourage.bearers.map((group) => <PartyGroup key={group.role} title={group.role} names={group.names} />)}
        </div>
        <PartyGroup title="Flowers" names={entourage.flowers} />
        <Ornament className="h-7 w-[130px]" />
      </div>
    </Section>
  );
}
