"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ShareButton from "@/components/ShareButton";
import AudioPlayer from "@/components/audio/AudioPlayer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ImageCred from "@/components/image/ImageCred";

type DevotionPageParams = {
  params: {
    year: number;
    month: number;
    day: number;
  };
};

type DevotionObject = {
  id: string;
  title: string;
  author: string;
  authorAbout: string;
  audio_file: string;
  content: string | string[];
  prayer: string;
};

type DevotionAudioBody = {
  id: string;
  content: string;
  author: string;
  prayer: string;
  title: string;
  devotion_date: string;
  verse_id: string;
  bible_verse: string;
};

export default function DevotionPage({ params }: DevotionPageParams) {
  const [currentLink, setCurrentLink] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setCurrentLink(window.location.href);
  }, []);

  const [devotionObj, setDevotionObj] = useState<DevotionObject>({
    id: "",
    title: "",
    author: "",
    authorAbout: "",
    audio_file: "",
    content: "",
    prayer: "",
  });

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
    console.log(data);

    if (data.content && data.audio_file == null) {
      const body: DevotionAudioBody = {
        id: data.id,
        title: data.title,
        content: data.content,
        author: data.author,
        prayer: data.prayer,
        verse_id: data.verse_id,
        bible_verse: data.bible_verse,
        devotion_date: `${params.year}-${params.month}-${params.day}`,
      };
      console.log("PROCESSING AUDIO");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/devotions/audio`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      let audioData = await response.json();
      data.audio_file = await audioData.audio_file;
    }

    setDevotionObj({
      id: data.id,
      title: data.title,
      author: data.author,
      authorAbout: data.author_about,
      audio_file: data.audio_file,
      content: data.content.split("  "),
      prayer: data.prayer,
    });
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
      <ImageCred src="/Devotion1.jpeg" className="w-full aspect-[3/2]" />
      <div className="p-2 pb-[3.5rem]">
        <div className="flex w-full justify-between pb-0.5">
          <AudioPlayer audio_file={devotionObj.audio_file} />
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"ghost"}
                className={cn(
                  "w-[200px] text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                required
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
          <ShareButton content={currentLink} />
        </div>
        {devotionObj.content ? (
          <>
            <section className="p-2">
              <h2 className="font-bold text-xl">{devotionObj.title}</h2>
              <p className="text-sm">
                <span>By</span>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant={"ghost"}
                      className="h-fit px-1.5 underline underline-offset-2"
                    >
                      {devotionObj.author}
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        {/* <AvatarImage src="https://github.com/vercel.png" /> */}
                        <AvatarFallback></AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                          {devotionObj.author}
                        </h4>
                        <p className="text-sm">{devotionObj.authorAbout}</p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </p>
              <div className="flex flex-col gap-2 mt-1">
                {typeof devotionObj.content == "string" ? (
                  <p>{devotionObj.content}</p>
                ) : (
                  devotionObj.content.map((paragraph, idx) => (
                    <p key={"DevotionParagraph" + idx}>{paragraph}</p>
                  ))
                )}
              </div>
            </section>
            {devotionObj.prayer && (
              <Card className="w-full my-5">
                <CardHeader>
                  <CardTitle className="text-xl text-center">
                    Reflect & Pray
                  </CardTitle>
                </CardHeader>
                <CardContent className="italic">
                  {devotionObj.prayer}
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <h1 className="text-xl font-bold text-center p-5">
            Currently under trial.
            <br />
            More content coming soon!
          </h1>
        )}
      </div>
    </main>
  );
}
