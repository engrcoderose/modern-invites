import wedding from "../data/wedding-details.json";

export default function GuestRemindersSection() {
  return (
    <section id="reminders" aria-labelledby="mj-reminders-title" className="mj-reminders flex min-h-[360px] items-center border-y px-6 py-20 sm:px-10 sm:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <h2 data-mj-reveal id="mj-reminders-title" className="mj-heading mb-10 text-center">A few gentle reminders</h2>
        <ul className="grid list-inside list-disc gap-x-12 gap-y-5 text-sm leading-7 sm:grid-cols-2">
          {wedding.guestReminders.map((reminder) => <li data-mj-reveal key={reminder}>{reminder}</li>)}
        </ul>
      </div>
    </section>
  );
}
