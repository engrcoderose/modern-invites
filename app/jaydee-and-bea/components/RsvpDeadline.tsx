export default function RsvpDeadline({ deadline }: { deadline: string | null }) {
  if (!deadline) return null;

  return (
    <span className="mt-6 block text-base font-medium not-italic leading-7 text-[#36472e]">
      <span className="block">Please reply by</span>
      <strong className="block text-lg font-semibold sm:text-xl">{deadline}</strong>
    </span>
  );
}
