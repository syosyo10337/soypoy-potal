import HistorySlider from "./_components/HistorySlider";
import MemberCarousel from "./_components/MemberCarousel";
import OurVisionDescription from "./_components/OurVisionDescription";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-soypoy-main">
      <OurVisionDescription />
      <MemberCarousel />
      <HistorySlider />
    </div>
  );
}
