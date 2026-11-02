import { Plus } from "lucide-react";
import wedding from "../data/wedding-details.json";

export default function GuestDetailsSection() {
  return (
    <section id="details" className="mj-section px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <div><h2 className="mj-heading">Dressed <em>in warmth.</em></h2><p className="mt-6 max-w-sm leading-7">We would love to see you in your finest formal attire, in the soft shades of our celebration.</p></div>
          <div className="space-y-8">
            <div><h3 className="mj-display mb-4 text-2xl">For the ladies</h3><div className="flex flex-wrap gap-5">{wedding.design.palette.slice(0, 3).map((color) => <div key={color.hex} className="w-20 text-center"><span className="mj-swatch mx-auto mb-3 block h-12 w-12 rounded-full" style={{ backgroundColor: color.hex }} /><span className="text-xs leading-5">{color.name}</span></div>)}</div></div>
            <div><h3 className="mj-display mb-4 text-2xl">For the gentlemen</h3><div className="flex flex-wrap gap-5">{wedding.design.palette.slice(3).map((color) => <div key={color.hex} className="w-20 text-center"><span className="mj-swatch mx-auto mb-3 block h-12 w-12 rounded-full" style={{ backgroundColor: color.hex }} /><span className="text-xs leading-5">{color.name}</span></div>)}</div></div>
            <div className="mj-venue border-t pt-6"><h3 className="mj-display mb-3 text-2xl">Principal sponsors</h3><p className="text-sm leading-7">Ninang: {wedding.attire.principalSponsors.ninang}<br />Ninong: {wedding.attire.principalSponsors.ninong}</p></div>
          </div>
        </div>
        <p className="mj-attire-note mt-12 border-t pt-8 text-sm leading-7">{wedding.attire.notes.split("\n\n")[2]}</p>
        <div className="mj-gift my-24 px-6 py-14 text-center sm:px-16">
          <h2 className="mj-heading">Your presence <em>is our present.</em></h2>
          <p className="mx-auto mt-6 max-w-xl leading-8">{wedding.giftNote}</p>
        </div>
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-20">
          <div><h2 className="mj-heading">A few little<br /><em>details.</em></h2><p className="mt-6 text-sm leading-7">Everything you might like to know before joining us.</p></div>
          <div className="mj-faq">{wedding.faqs.map((faq) => <details key={faq.question} className="border-b py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5"><span className="mj-display text-xl">{faq.question}</span><Plus className="mj-plus shrink-0" size={16} aria-hidden="true" /></summary><p className="mt-4 pr-5 text-sm leading-7">{faq.answer}</p></details>)}</div>
        </div>
        <div className="mj-venue mt-16 border-t pt-10"><h3 className="mj-display mb-5 text-2xl italic">A few gentle reminders</h3><ul className="grid list-inside list-disc gap-3 text-sm leading-7 sm:grid-cols-2">{wedding.guestReminders.map((reminder) => <li key={reminder}>{reminder}</li>)}</ul></div>
        <div className="mt-24 text-center"><h2 className="mj-heading">Capture <em>the love.</em></h2><p className="mx-auto mt-6 max-w-xl text-sm leading-7">{wedding.social.message}</p><p className="mj-hashtag mt-6 break-words text-lg">{wedding.social.hashtag}</p><p className="mt-5 text-xs leading-6">Please keep phones away during the ceremony.<br />We look forward to sharing memories with you afterward.</p></div>
      </div>
    </section>
  );
}
