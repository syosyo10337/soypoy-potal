import { cn } from "@/utils/cn";
import BottomContent from "./BottomContent";
import ContactArea from "./ContactArea";
import MainContent from "./MainContent";

export default function Footer() {
  return (
    // NOTE: z-10を追加して、流れるFudaFilmRollBgよりも上に配置する。
    <footer
      className={cn(
        "bg-soypoy-secondary text-white text-center z-10",
        "p-8 sm:p-12 xl:px-10 2xl:px-38",
      )}
    >
      <h1 className="text-2xl xl:text-3xl font-bold font-anymale mb-8">Infomation</h1>
      <MainContent />
      <ContactArea />
      <BottomContent />
    </footer>
  );
}
