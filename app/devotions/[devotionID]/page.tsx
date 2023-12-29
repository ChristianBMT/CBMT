"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Devotion } from "@/types";
import ImageCred from "@/components/image/ImageCred";
import ShareButton from "@/components/ShareButton";
import AudioPlayer from "@/components/audio/AudioPlayer";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DevotionPageParams = {
  params: {
    devotionID: string;
  };
};

export default function DevotionPage({ params }: DevotionPageParams) {
  const [currentLink, setCurrentLink] = useState<string>("");
  const [selectOpen, setSelectOpen] = useState<boolean>(false);

  useEffect(() => {
    setCurrentLink(window.location.href);
  }, []);

  const router = useRouter();
  const [devotionObj, setDevotionObj] = useState<Devotion>({
    audio_file: "",
    author: "",
    author_about: "",
    bible_verse: "",
    content: "",
    docs: "",
    id: "",
    prayer: "",
    title: "",
    verse_id: "",
    weekNo: 0,
  });
  const [allDevotion, setAllDevotion] = useState<Devotion[]>([]);

  async function getData() {
    let weekResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/week`
    );
    let weekData = await weekResponse.json();

    let response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/devotions/${weekData.currentWeek}`
    );
    let data = await response.json();
    setAllDevotion(data);
  }

  async function getCurrentDevotion() {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/getDevotion/${params.devotionID}`
    );
    let data = await response.json();
    if (data == null) {
      return router.back();
    }
    setDevotionObj(data);
  }

  useEffect(() => {
    getCurrentDevotion();
    getData();
  }, []);

  return (
    <main className="min-h-100dvh flex flex-col mx-auto max-w-[500px]  py-2">
      <ImageCred src="/Devotion1.jpeg" className="w-full aspect-[3/2]" />
      <div className="p-2 pb-[3.5rem]">
        <div className="flex w-full justify-between pb-0.5">
          <AudioPlayer audio_file={devotionObj.audio_file} />
          <Select
            defaultValue={devotionObj.id}
            open={selectOpen}
            onOpenChange={setSelectOpen}
            onValueChange={(value: string) => {
              router.push(`/devotions/${value}`);
            }}
            required
          >
            <SelectTrigger
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap",
                "rounded-md text-sm ring-offset-white transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
                "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
                "h-10 px-4 py-2 w-[200px] text-left font-normal bg-transparent dark:bg-transparent",
                "border-0 [&>span]:line-clamp-1 [&>svg]:ml-auto text-ellipsis"
              )}
            >
              <SelectValue
                placeholder={`Week ${devotionObj.weekNo}: ${devotionObj.title}`}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {allDevotion.map((devotion, idx) => {
                  return (
                    <SelectItem
                      value={devotion.id}
                      key={"Select-" + idx}
                      className="w-[300px] text-ellipsis whitespace-nowrap overflow-hidden"
                    >
                      Week {devotion.weekNo}: {devotion.title}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
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
                  <HoverCardContent className="max-w-[320px] w-fit min-w-[200px]">
                    <div className="flex justify-start space-x-4">
                      <Avatar>
                        {/* <AvatarImage src="https://github.com/vercel.png" /> */}
                        <AvatarFallback></AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                          {devotionObj.author}
                        </h4>
                        {devotionObj.author_about && (
                          <p className="text-sm">{devotionObj.author_about}</p>
                        )}
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </p>
              <div className="flex flex-col gap-2 mt-1">
                {devotionObj.content.split("  ").map((paragraph, idx) => (
                  <p key={"DevotionParagraph" + idx}>{paragraph}</p>
                ))}
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
