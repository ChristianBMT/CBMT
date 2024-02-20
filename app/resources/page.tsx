"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Foreword() {
  useEffect(() => {
    document.title = "Resources";
  }, []);

  function contactUs() {
    return (window.location.href =
      "mailto:bmtdevotions@gmail.com?subject=Christ in BMT Feedback");
  }

  return (
    <main className="min-h-[calc(100dvh-48px)] flex flex-col mx-auto max-w-[500px] py-2 gap-5">
      <div className="flex gap-2 items-center justify-center ">
        <Image
          src="/CBMT Mascot.png"
          alt=""
          width={500}
          height={500}
          className="aspect-square w-44"
          priority={true}
        />
      </div>
      <div className="p-2 pb-[1rem]">
        <section className="p-2 flex flex-col gap-4">
          <h1 className="font-semibold text-xl text-center underline underline-offset-2">
            Resources
          </h1>
          <div className="flex flex-col items-start">
            <span className="mr-auto">For feedback email:</span>
            <Button
              variant={"ghost"}
              className="underline underline-offset-2 px-1.5"
              onClick={() => contactUs()}
            >
              bmtdevotions@gmail.com
            </Button>
          </div>
          <div>
            <span>
              Should you wish to speak to someone please contact SAF 24-hour
              counselling hotline:
            </span>
            &nbsp;
            <a
              href="tel:1800-278-0022"
              className="underline underline-offset-2"
            >
              1800-278-0022
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
