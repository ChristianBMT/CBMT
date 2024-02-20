"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Acknowledgements() {
  useEffect(() => {
    document.title = "Acknowledgements";
  }, []);

  return (
    <main className="min-h-[calc(100dvh-48px)] flex flex-col mx-auto max-w-[500px] py-2 gap-2">
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
        <section className="p-2 flex flex-col gap-2">
          <h1 className="font-semibold text-xl text-center underline underline-offset-2">
            Acknowledgements
          </h1>

          <div className="flex flex-col gap-2 mt-1">
            <span>
              We thank God for His provision and His lordship in our life
              journeys, and for provide us the experience, contacts and
              resources to bring this project to fruition.
            </span>
            <span>
              We are indebted to the following for their contributions.
            </span>
            <span>
              Our authors for seeking the Lord and penning the articles as they
              were led to by the Lord. We pray that the Lord will use them as
              vessels of honour to touch many lives.
            </span>
            <span>
              Soh Hong Yu and Thaddeus Lee for building this website and
              providing technical support.
            </span>
            <span>
              Min Lu, our volunteer editor, for making the inspired word more
              perfect.
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
