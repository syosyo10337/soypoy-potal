import { Menu } from "lucide-react";
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
    <header
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 border-b bg-soypoy-main"
      style={{
        borderBottomColor: "#E5E0D8",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div>
          <Link href="/" className="text-2xl font-bold text-soypoy-secondary">
            SOYPOY
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList className="gap-8">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="px-6 py-3 transition-colors duration-200 hover:bg-black/5 rounded-md font-medium text-soypoy-secondary tracking-wide"
                      style={{ fontFamily: "var(--font-inter)" }}
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
              className="bg-soypoy-main border-r"
              style={{ borderRightColor: "#E5E0D8" }}
            >
              <SheetHeader
                className="border-b pb-4"
                style={{ borderBottomColor: "#E5E0D8" }}
              >
                <SheetTitle>
                  <Link
                    href="/"
                    className="text-2xl font-bold text-soypoy-secondary"
                  >
                    SOYPOY
                  </Link>
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Navigation */}
              <nav className="flex-1 py-6">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="block text-lg font-medium py-4 px-4 rounded-lg transition-colors duration-200 hover:bg-black/5 text-soypoy-secondary"
                        style={{ fontFamily: "var(--font-inter)" }}
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
