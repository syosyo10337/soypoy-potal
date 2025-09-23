import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "History", href: "/history" },
  { name: "Social", href: "/social" },
  { name: "CONTACT", href: "/contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 px-4 py-3 border-b border-soypoy-border bg-soypoy-main">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <Link href="/" className="pl-2 flex items-center">
            <Image
              src="/images/soypoy_logo_black.png"
              alt="SOYPOY"
              width={120}
              height={40}
              priority
              className="object-contain"
            />
          </Link>
        </div>

        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-4 pr-2">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      // NOTE: NavigationMenuLinkのtext-smが優先されるので、text-lgを強制的に指定
                      className="px-2 py-3 !text-lg font-bold hover:bg-black/5 transition-colors duration-200 text-soypoy-secondary"
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="lg"
                className="p-3 hover:bg-black/5 text-soypoy-secondary"
                aria-label="メニューを開く"
              >
                <Menu className="size-8" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full h-full soypoy-main border-none p-0 [&>button]:text-soypoy-secondary [&>button]:hover:bg-black/5"
            >
              <SheetHeader className="absolute top-0 left-0 w-0 h-0 overflow-hidden">
                <SheetTitle className="sr-only">
                  ナビゲーションメニュー
                </SheetTitle>
              </SheetHeader>

              <nav className="flex-1 py-16 px-8 text-right">
                <ul className="space-y-4 text-right">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="block text-lg font-bold py-6 px-4 hover:bg-black/5 transition-colors duration-200 text-soypoy-secondary text-right"
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
      </div>
    </header>
  );
}
