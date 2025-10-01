import Acsess from "./Acsess";
import OpeningHours from "./OpeningHours";

export default function MainContent() {
  return (
    <section className="font-display flex w-full flex-col md:flex-row">
      <OpeningHours className="basis-2/5 md:mr-14" />
      <Acsess className="basis-3/5 mt-2 md:mt-0" />
    </section>
  );
}
