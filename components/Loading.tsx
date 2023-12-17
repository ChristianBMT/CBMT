"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import "@/app/loading.css";

export function Loading() {
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
  });

  return (
    <div
      className={cn(
        "absolute z-90 bg-black h-[100dvh] w-[100vw] transition-opacity ease-in duration-500 p-5 flex flex-col justify-center items-center",
        shouldDisplay ? "" : "hiding"
      )}
    >
      <h1>Welcome To CBMT</h1>
      <p>Pokemon</p>
    </div>
  );
}
