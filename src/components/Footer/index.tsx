import BottomContent from "./BottomContent";
import ContactArea from "./ContactArea";
import MainContent from "./MainContent";

export default function Footer() {
  return (
    // NOTE: z-10を追加して、流れるFudaFilmRollBgよりも上に配置する。
    <footer className="bg-soypoy-secondary text-white text-center py-8 px-10 md:px-38 z-10">
      <h1 className="text-3xl font-bold font-anymale mb-8">Infomation</h1>
      <MainContent />
      <ContactArea />
      <BottomContent />
    </footer>
  );
}
