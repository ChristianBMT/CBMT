"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-4 border-r-0">
        <SheetHeader>
          <SheetTitle onClick={() => router.push("/")}>Welcome back</SheetTitle>
        </SheetHeader>
        <SheetFooter className="items-end pb-6 h-full justify-start sm:justify-start flex-row">
          <ThemeToggle></ThemeToggle>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
