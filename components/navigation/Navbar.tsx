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
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const today = new Date();

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
              <p>Christ in BMT</p>
            </div>
          </SheetTitle>
        </SheetHeader>
        <SheetFooter className="flex flex-col w-full sm:flex-col items-end h-[calc(100%-80px)] justify-start sm:justify-start gap-2 pt-3">
          <Button
            variant={"ghost"}
            className="w-full justify-start sm:justify-center"
            onClick={() => navigateTo(`/devotions`)}
          >
            Devotions
          </Button>
          <Button
            variant={"ghost"}
            className="w-full justify-start sm:justify-center"
            onClick={() => navigateTo("/discover")}
          >
            Discover
          </Button>
          <Button
            variant={"ghost"}
            className="w-full justify-start sm:justify-center"
            onClick={() => navigateTo("/vision")}
          >
            Vision
          </Button>
          <Button
            variant={"ghost"}
            className="w-full justify-start sm:justify-center"
            onClick={() => navigateTo("/aboutus")}
          >
            About Us
          </Button>
          <Button
            variant={"ghost"}
            className="w-full justify-start sm:justify-center"
            onClick={() => navigateTo("/contact")}
          >
            Contacts Us
          </Button>
          <div className="w-full mt-auto">
            <ThemeToggle></ThemeToggle>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
