import React from "react";
import { Input } from "@/components/ui/input";
import CategoryBtn from "@/components/CategoryBtn";
import { FaSearch } from "react-icons/fa";

const page = () => {
  return (
    <div className="m-5">
      <div className="text-white font-semibold text-4xl">Discover</div>
      <div className="my-5 relative w-full">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
        <Input
          className="pl-12 pr-3 py-2 w-full text-base font-normal text-white dark:bg-[#444444] border dark:border-[#444444] rounded-full transition ease-in-out dark:focus:text-white focus:outline-none"
          type="email"
          placeholder="Search"
        />
      </div>
      <div className="mt-10">
        <div className="text-white font-semibold text-2xl mb-2">Categories</div>
        <div className="w-full flex space-x-4">
          <CategoryBtn className="dark:bg-blue-500 flex-1" text="Category 1" color="blue" />
          <CategoryBtn className="dark:bg-blue-500 flex-1" text="Category 2" color="green" />
          <CategoryBtn className="dark:bg-blue-500 flex-1" text="Category 3" color="red" />
          <CategoryBtn className="dark:bg-blue-500 flex-1" text="Category 4" color="yellow" />
        </div>
      </div>
    </div>
  );
};

export default page;
