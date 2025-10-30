import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/shadcn/navigation-menu";
import { cn } from "@/utils/cn";
import { NAV_ITEMS, type NavItem } from "./constant";
import Logo from "./Logo";

export default function PcHeader() {
  return (
    <header
      className={cn(
        "hidden sm:block",
        "sticky top-0 left-0 right-0 z-50 bg-soypoy-main",
      )}
    >
      <div
        className={cn(
          "max-w-8xl mx-auto flex items-center justify-between",
          "py-4 px-10",
        )}
      >
        <Logo />
        <PcMenu navItems={NAV_ITEMS} />
      </div>
    </header>
  );
}

function PcMenu({ navItems }: { navItems: NavItem[] }) {
  return (
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
  );
}
