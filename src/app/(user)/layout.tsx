import Footer from "@/components/Footer";
import Header from "@/components/Header";

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: Readonly<UserLayoutProps>) {
  return (
    <div>
      <Header />
      <main className="flex-grow z-10 relative">{children}</main>
      <Footer />
    </div>
  );
}
