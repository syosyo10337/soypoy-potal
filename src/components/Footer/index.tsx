import BottomContent from "./BottomContent";
import ContactArea from "./ContactArea";
import MainContent from "./MainContent";

export default function Footer() {
  return (
    <footer className="bg-soypoy-secondary text-white text-center py-8 px-20">
      <h1 className="text-3xl font-bold font-anymale mb-8">Infomation</h1>
      <MainContent />
      <ContactArea />
      <BottomContent />
    </footer>
  );
}
