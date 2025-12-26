import HistorySlider from "./_components/HistorySlider";
import MemberCarousel from "./_components/MemberCarousel";
import OurVisionDescription from "./_components/OurVisionDescription";

export default function AboutPage() {
  return (
    <div>
      <OurVisionDescription />
      <MemberCarousel />
      <HistorySlider />
    </div>
  );
}
