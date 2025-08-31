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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 border-b border-soypoy-border bg-soypoy-main">
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
                      className="px-2 py-3 text-18 font-bold hover:bg-black/5 transition-colors duration-200 text-soypoy-secondary"
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
                size="sm"
                className="p-3 hover:bg-black/5 text-soypoy-secondary"
                aria-label="メニューを開く"
              >
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-soypoy-main border-r border-soypoy-border"
            >
              <SheetHeader className="border-b border-soypoy-border pb-4">
                <SheetTitle>
                  <Link href="/" className="flex items-center">
                    <Image
                      src="/images/soypoy_logo_black.png"
                      alt="SOYPOY"
                      width={100}
                      height={33}
                      className="object-contain"
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <nav className="flex-1 py-6">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="block text-18 font-bold py-4 px-4 rounded-lg hover:bg-black/5 transition-colors duration-200 text-soypoy-secondary"
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
