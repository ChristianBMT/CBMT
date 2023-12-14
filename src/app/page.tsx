"use client";

import Image from "next/image";
import { Button } from "../components/ui/button";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <>
      <div className="w-screen flex justify-end items-center">
        <Bars3BottomLeftIcon className="w-10 aspect-square" />
        <MagnifyingGlassIcon className="w-10 aspect-square" />
      </div>
    </>
  );
}
