"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PlayIcon, PauseIcon } from "lucide-react";
import { useInView } from "react-intersection-observer";
import ReactPlayer from "react-player";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import Duration from "./Duration";

type AudioPlayerProps = {
  audio_file: string;
};

type AudioObj = {
  duration: number;
  played: number;
};

export default function AudioPlayer({ audio_file }: AudioPlayerProps) {
  const playerRef = useRef<ReactPlayer>(null);

  const [audio, setAudio] = useState<string>("");
  const [audioObj, setAudioObj] = useState<AudioObj>({
    duration: 0,
    played: 0,
  });
  const [changeValue, setChangeValue] = useState<boolean>(false);

  let handleDuration = (duration: number) => {
    setAudioObj((prevState) => ({ ...prevState, duration }));
  };

  let handleProgress = (progress: {
    loaded: number;
    loadedSeconds: number;
    played: number;
    playedSeconds: number;
  }) => {
    if (!changeValue) {
      setAudioObj((prevState) => ({ ...prevState, played: progress.played }));
    }
  };

  async function getAudio() {
    if (audio_file == "") {
      return;
    }
    let response = await fetch(
      `https://api.elevenlabs.io/v1/history/${audio_file}/audio`,
      {
        method: "GET",
        headers: {
          "xi-api-key": process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || "",
        },
      }
    );
    let blob = await response.blob();
    let blobURL = URL.createObjectURL(blob);
    setAudio(blobURL);
    return;
  }

  useEffect(() => {
    getAudio();
  }, [audio_file]);

  const [ref, inView] = useInView({
    threshold: 1,
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  function changeIsPlaying() {
    setIsPlaying(!isPlaying);
  }

  let valueChangeHandler = (value: number[]) => {
    setIsPlaying(false);
    setChangeValue(true);
    setAudioObj((prevState) => ({ ...prevState, played: value[0] / 100 }));
  };

  let valueCommitHandler = async (value: number[]) => {
    setAudioObj((prevState) => ({
      ...prevState,
      played: value[0] / 100,
    }));
    if (playerRef.current) {
      playerRef.current.seekTo(value[0] / 100);
    }
    setIsPlaying(true);
    setChangeValue(false);
  };

  return (
    <>
      <Button variant={"ghost"} onClick={() => changeIsPlaying()} ref={ref}>
        {isPlaying ? (
          <PauseIcon className="w-4 h-4" />
        ) : (
          <PlayIcon className="w-4 h-4" />
        )}
      </Button>

      <div
        className={cn(
          "flex items-center p-2 fixed w-full h-16 border-t bg-white dark:bg-black bottom-0 left-0 right-0",
          isPlaying || changeValue || !inView ? "" : "hidden"
        )}
      >
        <div className="max-w-[500px] w-full mx-auto flex items-center">
          <Button variant={"ghost"} onClick={() => changeIsPlaying()}>
            {isPlaying ? (
              <PauseIcon className="w-4 h-4" />
            ) : (
              <PlayIcon className="w-4 h-4" />
            )}
          </Button>
          <Slider
            value={[audioObj.played * 100]}
            className="h-2 m-2"
            onValueChange={valueChangeHandler}
            onValueCommit={valueCommitHandler}
            step={0.001}
          ></Slider>
          {audio && (
            <div className="hidden">
              <ReactPlayer
                ref={playerRef}
                playing={isPlaying}
                url={audio}
                width={"0%"}
                height={"2.5rem"}
                config={{
                  file: {
                    forceAudio: true,
                  },
                }}
                onDuration={handleDuration}
                onProgress={handleProgress}
              />
            </div>
          )}
          <div className="text-xs flex gap-1 pr-2">
            <Duration seconds={audioObj.duration * audioObj.played} />
            <span>/</span>
            <Duration seconds={audioObj.duration} />
          </div>
        </div>
      </div>
    </>
  );
}
