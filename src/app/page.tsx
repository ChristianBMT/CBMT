"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <div className="mt-20 px-4">
        <div className="text-black font-bold text-4xl">
          Transforming your walk with Christ
        </div>
        <div className="text-black font-semibold text-xl mt-0.5">
          Start Your Journey Today
        </div>
        <div className="relative my-10">
          <Image
            className="rounded-xl w-full"
            src="/scenery.jpeg"
            alt="Scenery"
            width={100}
            height={100}
          ></Image>
          <div className="absolute top-0 left-0 p-4 text-white text-left">
            <div className="text-2xl font-bold">Today's Devotion</div>
            <div className="text-xl">Read and be encouraged</div>
          </div>
          <button className="absolute bottom-0 right-0 m-4 bg-black text-white rounded px-4 py-2 hover:bg-opacity-90 focus:outline-none focus:ring">
            Read
          </button>
        </div>

        <Button
          onClick={() => {
            router.push("posts/2023/12/15");
          }}
        >
          DEMO
        </Button>
      </div>
    </>
  );
}
