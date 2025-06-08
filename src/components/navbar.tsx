"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./ui/container";

interface NavItem {
  name: string;
  href: string;
  isActive: (pathname: string) => boolean;
}

const navigationItems: NavItem[] = [
  {
    name: "Home",
    href: "/",
    isActive: (pathname) => pathname === "/",
  },
  {
    name: "Test",
    href: "/test",
    isActive: (pathname) => pathname.startsWith("/test"),
  },
  {
    name: "Journal",
    href: "/journal",
    isActive: (pathname) => pathname.startsWith("/journal"),
  },
];

const NavigationItem = ({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) => (
  <NavigationMenuItem>
    <Link
      href={item.href}
      className={item.isActive(pathname) ? "font-bold" : ""}
    >
      {item.name}
    </Link>
  </NavigationMenuItem>
);

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-primary text-white shadow-sm font-sans py-4 sticky top-0 z-50">
      <Container className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Anoto</h1>

        <NavigationMenu>
          <NavigationMenuList className="gap-6">
            {navigationItems.map((item) => (
              <NavigationItem key={item.href} item={item} pathname={pathname} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </Container>
    </nav>
  );
}
