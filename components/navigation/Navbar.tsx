"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  function navigateTo(link: string) {
    router.push(link);
    closeNav();
  }

  function openNav() {
    setOpen(true);
  }

  function closeNav() {
    setOpen(false);
  }

  return (
    <Sheet open={open}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="mt-2 ml-2"
          onClick={() => openNav()}
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-4 border-r-0"
        onEscapeKeyDown={() => closeNav()}
        onPointerDownOutside={() => closeNav()}
        onInteractOutside={() => closeNav()}
      >
        <SheetHeader>
          <SheetTitle onClick={() => navigateTo("/")}>Welcome back</SheetTitle>
        </SheetHeader>
        <SheetFooter className="items-end pb-6 h-full justify-start sm:justify-start flex-row">
          <ThemeToggle></ThemeToggle>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
