import Footer from "@/components/Footer";
import Header from "@/components/Header";

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: Readonly<UserLayoutProps>) {
  return (
    <div>
      <Header />
      <main className="flex-grow relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
