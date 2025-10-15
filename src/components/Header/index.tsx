import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/shadcn/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn/sheet";
import { cn } from "@/utils/cn";
import SopyoyLogoBlackImage from "./soypoyLogoBk.png";

const navItems = [
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "What's Up", href: "/whats-up" },
];

export default function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-soypoy-main">
      <div
        className={cn(
          "max-w-8xl mx-auto flex items-center justify-between",
          "py-2 md:py-4",
          "pl-4 md:px-10",
        )}
      >
        <div>
          <Link href="/" className="flex items-center">
            <Image
              src={SopyoyLogoBlackImage}
              alt="SOYPOY"
              width={167}
              height={27}
              priority
              className={cn("object-contain", "w-24 sm:w-34 lg:w-42")}
            />
          </Link>
        </div>
        <PcMenu className="hidden md:block" />
        <MobileMenu className="md:hidden" />
      </div>
    </header>
  );
}

function MobileMenu({ className }: { className: string }) {
  return (
    <div className={cn(className)}>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="lg"
            className="p-3 hover:bg-black/5 text-soypoy-secondary  font-display"
            aria-label="メニューを開く"
          >
            <Menu className="size-8" strokeWidth={1.2} />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full h-full soypoy-main border-none p-0 [&>button]:text-soypoy-secondary [&>button]:hover:bg-black/5"
        >
          <SheetHeader className="absolute top-0 left-0 w-0 h-0 overflow-hidden">
            <SheetTitle className="sr-only">ナビゲーションメニュー</SheetTitle>
          </SheetHeader>

          <nav className="flex-1 py-16 px-8 text-right">
            <ul className="space-y-4 text-right">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block text-lg font-bold py-6 px-4 active:text-soypoy-accent transition-all duration-200 text-soypoy-secondary text-right"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function PcMenu({ className }: { className: string }) {
  return (
    <div className={cn(className)}>
      <NavigationMenu>
        <NavigationMenuList className="gap-4 pr-2">
          {navItems.map((item) => (
            <NavigationMenuItem key={item.name}>
              <NavigationMenuLink asChild>
                <Link
                  href={item.href}
                  // NOTE: NavigationMenuLinkのtext-smが優先されるので、text-lgを強制的に指定
                  className="px-2 py-3 !text-lg font-bold active:text-soypoy-accent transition-colors duration-200 text-soypoy-secondary font-display"
                >
                  {item.name}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
