"use client";

import ImageCred from "@/components/image/ImageCred";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Foreword() {
  useEffect(() => {
    document.title = "Foreword";
  }, []);

  return (
    <main className="min-h-[calc(100dvh-48px)] flex flex-col mx-auto max-w-[500px]  py-2">
      <ImageCred
        src={"/ranger.jpg"}
        author={"Anonymous"}
        className="w-full aspect-[3/2]"
      />
      <div className="p-2 pb-[1rem]">
        <section className="p-2">
          <h2 className="font-bold text-xl">Foreword</h2>
          <div className="flex">
            <p className="text-sm">
              <span>By</span>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className="h-fit px-1.5 underline underline-offset-2"
                  >
                    David Neo
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="max-w-[320px] w-fit min-w-[200px]">
                  <div className="flex justify-start space-x-4">
                    <Avatar>
                      {/* <AvatarImage src="https://github.com/vercel.png" /> */}
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">David Neo</h4>
                      <p className="text-sm"></p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-1">
            <p>
              The Ranger course is notoriously difficult, and one of the hardest
              courses for any soldier. About 25 years ago, i was sent for the
              United States Army Ranger School, with the express order that i
              should not fail. As the only Singaporean in the course, it was
              daunting to say the least. I could fail for any of a number of
              reasons; injuries, frostbite (i was in the winter course), fail to
              pass my missions, or fail my peer appraisals (my coursemates were
              largely soldiers from the Ranger battalions, and had no reason to
              rank a foreigner well).
            </p>
            <p>
              In such a situation, I turn to the one source of strength that I
              know would not fail me - our Lord and saviour, Jesus Christ. By
              happenstance, i was handed a copy of the Ranger Devotional by the
              course chaplain, a small green booklet, no more than 3 inches x 3
              inches, with 65 devotionals, one for each day of the course, and
              they spoke to me each and every single day. About the love our
              Lord has for us, about the hope we can have in him, and of the
              best laid plans he has for each and every one of us. And that saw
              me through one of the hardest courses in the world.
            </p>
            <p>
              And the Lord laid it upon my heart then, that i should put
              together a similar devotional, for all our soldiers serving our
              nation in Singapore, so that you too may arm yourselves with the
              armour of God during your Basic Military Training. Over the past
              25 years, the Lord kept reminding me of this, but there was always
              something that kept me from doing it. There were always operations
              to run, projects to complete, and soldiers to attend to.{" "}
            </p>
            <p>
              But we are all called to obey the Lord, and i am glad that while
              it took me a long time, i have finally heeded his call. In here,
              are devotionals written by different ones who were inspired by the
              Lord to pen down their thoughts and prayers for you. Some have
              gone through BMT, just like you are doing now, and share what kept
              them strong during their time. Some have supported their loved
              ones through their BMT journey, and now they too support you in
              your journey. But no matter who they are and what their
              experiences were, every one of us wrote this with the same
              intention of letting you know that our Lord is here for you, and
              walking every step of the journey with you, and that you shall not
              fail, for he is with you.
            </p>
            <p>
              Thank you for your service, and may you experience God&apos;s love
              for you in BMT, in your National Service, and for every single day
              of your life.
            </p>
            <p className="mt-3">
              In God&apos;s Army,
              <br />
              <span className="text-3xl" id="authorForeword">David Neo</span>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
