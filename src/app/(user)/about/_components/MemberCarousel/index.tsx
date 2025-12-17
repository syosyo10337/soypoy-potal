import { cn } from "@/utils/cn";
import SectionTitle from "../SectionTitle";
import MemberPill from "./MemberPill";

const MEMBERS = [
  {
    id: "1",
    name: "Name\nName",
    role: "Job\n title",
    color: "#76794a",
  },
  {
    id: "2",
    name: "Name\nName",
    role: "Job\n title",
    color: "#fab600",
  },
  {
    id: "3",
    name: "Name\nName",
    role: "Job\n title",
    color: "#ef3530",
  },
  {
    id: "4",
    name: "Genki\nMiyachi",
    role: "Engineer\n ",
    color: "#0080ea",
  },
  {
    id: "5",
    name: "Hibiki\nUeda",
    role: "Jazz\nMusician",
    color: "#a8001c",
  },
  {
    id: "6",
    name: "Mizuki\nAraki",
    role: "Jazz\nMusician",
    color: "#ffb6c1",
  },
  {
    id: "7",
    name: "Masanao\nTakahashi",
    role: "Drummer/\nEngineer",
    color: "#76794a",
  },
  {
    id: "8",
    name: "Mizuki\nNiino",
    role: "Communication\n Designer",
    color: "#fab600",
  },
  {
    id: "9",
    name: "Hina\nOkutani",
    role: " Art Director\n ",
    color: "#ef3530",
  },
];

export default function MemberCarousel() {
  return (
    <section className="py-12 md:py-20">
      <SectionTitle className="mb-8 md:mb-16">Member</SectionTitle>

      {/* Carousel Container */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-11 md:w-[358px] bg-gradient-to-r from-soypoy-main to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-11 md:w-[358px] bg-gradient-to-l from-soypoy-main to-transparent z-10 pointer-events-none" />

        {/* Scrollable Area */}
        <div
          className={cn(
            "flex gap-3 md:gap-4",
            "overflow-x-auto",
            "px-11 md:px-[168px]",
            "pb-4",
            "snap-x snap-mandatory",
            "scrollbar-hide",
            "[&::-webkit-scrollbar]:hidden",
            "[-ms-overflow-style:none]",
            "[scrollbar-width:none]",
          )}
        >
          {MEMBERS.map((member) => (
            <div key={member.id} className="snap-start">
              <MemberPill
                name={member.name}
                role={member.role}
                color={member.color}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
