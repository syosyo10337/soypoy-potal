import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { TRPCProvider } from "@/infrastructure/trpc/provider";

interface UserLayoutProps {
  children: React.ReactNode;
}

//TODO: check TRPCProvider is needed here or not.
export default function UserLayout({ children }: Readonly<UserLayoutProps>) {
  return (
    <TRPCProvider>
      <div>
        <Header />
        <main className="flex-grow relative z-10">{children}</main>
        <Footer />
      </div>
    </TRPCProvider>
  );
}
