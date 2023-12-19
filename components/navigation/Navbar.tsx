"use client";

import Image from "next/image";
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
          <SheetTitle onClick={() => navigateTo("/")} className="text-xl">
            <div className="flex gap-5 items-center">
              <Image
                src="/DailyImage.webp"
                alt=""
                width={500}
                height={500}
                className="aspect-square w-20"
              />
              <p>ChristBMT</p>
            </div>
          </SheetTitle>
        </SheetHeader>
        <SheetFooter className="items-end h-[calc(100%-80px)] justify-start sm:justify-start flex-row">
          <ThemeToggle></ThemeToggle>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
