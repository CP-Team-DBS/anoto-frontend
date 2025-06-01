import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Container from "./ui/container";

export default function Navbar() {
  return (
    <nav className="bg-primary text-white shadow-sm font-sans py-4 sticky top-0 z-50">
      <Container className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Anoto</h1>

        <NavigationMenu>
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem>
              <Link href="/" className="font-bold">
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/test">Test</Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/journal" className="font-bold">Journal</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </Container>
    </nav>
  );
}
