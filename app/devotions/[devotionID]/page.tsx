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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  const [devotionObj, setDevotionObj] = useState<Devotion>();
  const [allDevotion, setAllDevotion] = useState<Devotion[]>([]);
  const [isRead, setIsRead] = useState<boolean>(false);

  async function getData() {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/devotions`
    );
    let data = await response.json();
    let currentDevotionIdx = data.findIndex(
      (devotion: Devotion) => devotion.id == params.devotionID
    );
    let currentDevotion = data.splice(currentDevotionIdx, 1)[0];
    data.unshift(currentDevotion);
    setAllDevotion(data);
  }

  async function getCurrentDevotion() {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/getDevotion/${params.devotionID}`
    );
    let data = await response.json();
    if (!data) {
      return router.back();
    }

    setDevotionObj(data);
  }

  useEffect(() => {
    getCurrentDevotion();
    getData();
  }, []);

  useEffect(() => {
    if (devotionObj) {
      let currentRead: { [key: string]: boolean } = JSON.parse(
        localStorage.getItem("read") || "{}"
      );
      if (Object.keys(currentRead).includes(devotionObj.id)) {
        setIsRead(true);
      }
    }
  }, [devotionObj]);

  return (
    <main className="min-h-[calc(100dvh-48px)] flex flex-col mx-auto max-w-[500px]  py-2">
      <ImageCred
        src={devotionObj?.image || "/DailyImage.webp"}
        className="w-full aspect-[3/2]"
      />
      <div className="p-2 pb-[3.5rem]">
        <div className="flex w-full justify-between pb-0.5 gap-2">
          <AudioPlayer audio_file={devotionObj?.audio_file} />
          <Select
            defaultValue={devotionObj?.id}
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
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300",
                "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
                "h-10 px-2 py-2 w-[225px] text-left font-normal bg-transparent dark:bg-transparent",
                "border-0 [&>span]:line-clamp-1 [&>svg]:ml-auto text-ellipsis"
              )}
            >
              <SelectValue
                placeholder={`Week ${devotionObj?.weekNo ?? ""}: ${
                  devotionObj?.title ?? ""
                }`}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {allDevotion.map((devotion, idx) => {
                  return (
                    <SelectItem
                      value={devotion.id}
                      key={"Select-" + idx}
                      className="w-[300px] text-ellipsis whitespace-nowrap overflow-hidden pl-2 [&>:first-child]:hidden"
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
        {devotionObj?.content ? (
          <>
            <section className="p-2">
              {/* {devotionObj.verse_id && (
                <div className="flex items-center mb-2 gap-2">
                  <p>Today&apos;s Scripture: {devotionObj.verse_id}</p>
                </div>
              )} */}
              {devotionObj.verse_id && (
                <Card className="w-full mb-5 rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50">
                  <CardHeader className="py-6 px-1">
                    <CardTitle className="text-base text-center flex gap-3 items-center justify-center">
                      <p className="text-lg whitespace-nowrap">
                        Today&apos;s Scripture:
                      </p>
                      <Button
                        variant={"secondary"}
                        className="font-bold bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80"
                      >
                        {devotionObj.verse_id}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="italic">
                    {devotionObj.bible_verse}
                  </CardContent>
                </Card>
              )}
              <h2 className="font-bold text-xl">{devotionObj?.title}</h2>
              <div className="flex">
                <p className="text-sm">
                  <span>By</span>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button
                        variant={"ghost"}
                        className="h-fit px-1.5 underline underline-offset-2"
                      >
                        {devotionObj?.author}
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
                            {devotionObj?.author}
                          </h4>
                          {devotionObj?.author_about && (
                            <p className="text-sm">
                              {devotionObj?.author_about}
                            </p>
                          )}
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </p>
              </div>
              <div className="flex flex-col gap-2 mt-1">
                {devotionObj?.content.split("  ").map((paragraph, idx) => (
                  <p key={"DevotionParagraph" + idx}>{paragraph}</p>
                ))}
              </div>
            </section>
            {devotionObj?.prayer && (
              <Card className="w-full my-5 rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50">
                <CardHeader>
                  <CardTitle className="text-xl text-center">
                    Reflect & Pray
                  </CardTitle>
                </CardHeader>
                <CardContent className="italic">
                  {devotionObj?.prayer}
                </CardContent>
              </Card>
            )}
            <div className="my-5">
              <div className="flex items-center space-x-2 justify-center">
                <Switch
                  id="showRead"
                  checked={isRead}
                  onCheckedChange={(value) => {
                    // setUnreadOnly(value);
                    let currentRead: { [key: string]: boolean } = JSON.parse(
                      localStorage.getItem("read") || "{}"
                    );
                    setIsRead(value);
                    if (value) {
                      currentRead[devotionObj.id] = true;
                      localStorage.setItem("read", JSON.stringify(currentRead));
                    } else {
                      delete currentRead[devotionObj.id];
                      localStorage.setItem("read", JSON.stringify(currentRead));
                    }
                  }}
                />
                <Label htmlFor="showRead">Mark as Read</Label>
              </div>
            </div>
          </>
        ) : (
          <h1 className="text-xl font-bold text-center p-5">
            Loading Content...
          </h1>
        )}
      </div>
    </main>
  );
}
