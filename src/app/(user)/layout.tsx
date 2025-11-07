import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FudaFilmRollBg from "./(home)/_components/FudaFilmRollBg";

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: Readonly<UserLayoutProps>) {
  return (
    <div>
      <FudaFilmRollBg />
      <Header />
      <main className="flex-grow relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
