"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { CalendarIcon, PlayIcon } from "lucide-react";
import { ShareIcon } from "@heroicons/react/24/solid";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { da } from "date-fns/locale";

type DevotionPageParams = {
  params: {
    year: number;
    month: number;
    day: number;
  };
};

type DevotionObject = {
  title: string;
  author: string;
  content: string;
};

export default function DevotionPage({ params }: DevotionPageParams) {
  const { toast } = useToast();
  const router = useRouter();

  const [devotionObj, setDevotionObj] = useState<DevotionObject | Object>({});

  const [date, setDate] = useState<Date | undefined>(
    new Date(`${params.year}/${params.month}/${params.day}`)
  );
  if (!date || date.toString() === "Invalid Date") {
    router.back();
  }
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

  async function getData() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/devotions/${params.year}/${params.month}/${params.day}`
    );
    const data = await response.json();
    console.log(data[0]);
  }

  useEffect(() => {
    // Check if bypass endpoint
    // Ensure date dont go pass current date
    if (new Date() < new Date(`${params.year}/${params.month}/${params.day}`)) {
      router.back();
    }

    // get Data
    getData();
  }, []);

  useEffect(() => {
    if (date == undefined) {
      toast({
        title: "No date selected!",
        variant: "destructive",
        duration: 500,
      });
      setCalendarOpen(true);
    } else if (
      date != new Date(`${params.year}/${params.month}/${params.day}`)
    ) {
      router.push(
        `/devotions/${date.getFullYear()}/${
          date.getMonth() + 1
        }/${date.getDate()}`
      );
    }
  }, [calendarOpen]);

  return (
    <main className="min-h-100dvh flex flex-col mx-auto max-w-[500px]  py-2">
      <Image
        src="/Devotion1.jpeg"
        alt=""
        width={500}
        height={500}
        className="w-full aspect-[3/2]"
      />
      <div className="p-2">
        <div className="flex w-full justify-between">
          <Button variant={"ghost"}>
            <PlayIcon className="w-4 h-4" />
          </Button>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"ghost"}
                className={cn(
                  "w-[220px] text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button variant={"ghost"}>
            <ShareIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      {params.year}/{params.month}/{params.day}
    </main>
  );
}
