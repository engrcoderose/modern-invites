import Image from "next/image";
import monogram from "../assets/design/monogram-timeline.png";

export default function ScheduleMonogram() {
  return (
    <Image src={monogram} alt="" sizes="(min-width:640px) 160px, 96px" className="h-auto w-full" />
  );
}
