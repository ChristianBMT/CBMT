"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import "@/app/loading.css";

export default function Loading() {
  const [shouldDisplay, setShouldDisplay] = useState<boolean>(false);

  useEffect(() => {
    const lastLoginDate = localStorage.getItem("lastLoginDate");
    const today = new Date().toDateString();

    if (!lastLoginDate || lastLoginDate !== today) {
      setShouldDisplay(true);

      // Update last login date in localStorage
      localStorage.setItem("lastLoginDate", today);
    }

    setTimeout(() => {
      setShouldDisplay(false);
    }, 500);
  }, []);

  return (
    <div
      className={cn(
        "absolute z-50 bg-white dark:bg-black h-[100dvh] w-full transition-opacity ease-in duration-500 p-5 flex flex-col justify-center items-center gap-5",
        shouldDisplay ? "" : "hiding"
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Welcome To</h1>
        <h1 className="text-3xl font-bold">Christ in BMT</h1>
      </div>
      <Image
        src="/CBMT Mascot.png"
        width={500}
        height={500}
        alt=""
        className="w-1/2 aspect-square max-w-[300px]"
      />
    </div>
  );
}
