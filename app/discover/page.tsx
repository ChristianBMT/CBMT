"use client";

import React from "react";
import { Input } from "@/components/ui/input";

import CategoryBtn from "@/components/CategoryBtn";
import DevotionCard from "@/components/devotion/DevotionCard";

import { FaSearch } from "react-icons/fa";

const page = () => {
  return (
    <main className="min-h-[calc(100dvh-48px)] flex flex-col mx-auto max-w-[500px] px-6">
      <div className=" font-bold text-2xl">Discover</div>
      <div className="my-5 relative w-full">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 " />
        <Input
          className="pl-12 pr-3 py-2 w-full text-base font-normal  dark:bg-[#444444] border dark:border-[#444444] rounded-full transition ease-in-out focus:outline-none"
          type="email"
          placeholder="Search"
        />
      </div>
      <div className="my-10">
        <div className=" font-semibold text-2xl mb-2">Categories</div>
        <div className="overflow-x-auto">
          <div className="flex space-x-4">
            <CategoryBtn
              className="dark:bg-blue-500 min-w-max"
              text="Category 1"
            />
            <CategoryBtn
              className="dark:bg-green-500 min-w-max"
              text="Category 2"
            />
            <CategoryBtn
              className="dark:bg-red-500 min-w-max"
              text="Category 3"
            />
            <CategoryBtn
              className="dark:bg-yellow-500 min-w-max"
              text="Category 4"
            />
          </div>
          <div className="flex mt-4 space-x-4">
            <CategoryBtn
              className="dark:bg-pink-500 min-w-max"
              text="Category 5"
            />
            <CategoryBtn
              className="dark:bg-purple-500 min-w-max"
              text="Category 6"
            />
            <CategoryBtn
              className="dark:bg-indigo-500 min-w-max"
              text="Category 7"
            />
            <CategoryBtn
              className="dark:bg-orange-500 min-w-max"
              text="Category 8"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="font-semibold text-2xl mb-5">Browse Other Plans</div>
        <div className="flex flex-row space-x-7 overflow-x-auto whitespace-nowrap">
          {/* Multiple DevotionCard components are placed here */}
          <DevotionCard
            id={"idk1"}
            imageSrc={"/DailyImage.webp"}
            weekNo={1}
            title={"Finding Strength in Trusting God"}
          />
          <DevotionCard
            id={"idk2"}
            imageSrc={"/DailyImage.webp"}
            weekNo={2}
            title={"Embracing Hope in Times of Uncertainty"}
          />
          <DevotionCard
            id={"idk3"}
            imageSrc={"/DailyImage.webp"}
            weekNo={3}
            title={"Embracing Hope in Times of Uncertainty"}
          />
          <DevotionCard
            id={"idk4"}
            imageSrc={"/DailyImage.webp"}
            weekNo={4}
            title={"Embracing Hope in Times of Uncertainty"}
          />
          <DevotionCard
            id={"idk5"}
            imageSrc={"/DailyImage.webp"}
            weekNo={5}
            title={"Embracing Hope in Times of Uncertainty"}
          />
        </div>
      </div>
    </main>
  );
};

export default page;
