import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Navbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-8 border-r-0">
        <SheetHeader>
          <SheetTitle>Welcome back</SheetTitle>
        </SheetHeader>
        <SheetFooter className="items-end pb-4 h-full justify-start sm:justify-start flex-row">
          <ThemeToggle></ThemeToggle>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
