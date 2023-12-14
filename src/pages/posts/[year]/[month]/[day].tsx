import { useRouter } from "next/router";
import { useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import "../../../../app/globals.css";
import Navbar from "../../../../components/Navbar";
import { Button } from "../../../../components/ui/button";
import Calendar from "../../../../components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  PlayIcon,
  PauseIcon,
  StopIcon,
  ShareIcon,
} from "@heroicons/react/20/solid";

import { cn } from "@/lib/utils";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

interface PostData {
  title: string;
  content: string;
  owner: string;
  // Add more properties based on your actual data structure
}

interface PostProps {
  postData: PostData;
}

// Function to fetch all possible paths at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // You might have your own logic to generate paths dynamically
  // Here's an example of static paths for demonstration
  const paths = [
    { params: { year: "2023", month: "12", day: "15" } },
    // ...more paths
  ];

  return {
    paths,
    fallback: false, // or 'blocking' for Incremental Static Regeneration
  };
};

// Function to fetch data for a specific post based on year, month, and day
export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  // Fetch data based on params.year, params.month, params.day
  // This might involve fetching data from an API or a database
  const postData: PostData = {
    title: "Equal before God",
    content: `While on vacation, my wife and I enjoyed some early morning bike rides. One route took us through a neighborhood of multi-million-dollar homes. We saw a variety of people—residents walking their dogs, fellow bike riders, and numerous workers building new homes or tending well-kept landscapes. It was a mixture of people from all walks of life, and I was reminded of a valuable reality. There was no true distinction among us. Rich or poor. Wealthy or working-class. Known or unknown. All of us on that street that morning were the same. “Rich and poor have this in common: The Lord is the Maker of them all” (Proverbs 22:2). Regardless of differences, we were all made in God’s image (Genesis 1:27).

But there’s more. Being equal before God also means that no matter our economic, social, or ethnic situation, we’re all born with a sin condition: “all have sinned and fall short of the glory of God” (Romans 3:23). We’re all disobedient and equally guilty before Him, and we need Jesus.

We often divide people into groups for a variety of reasons. But, in reality, we’re all part of the human race. And though we’re all in the same situation—sinners in need of a Savior—we can be “justified freely” (made right with God) by His grace (v. 24).`,
    owner: "Dave Branon",
  };

  return {
    props: {
      postData,
    },
  };
};

// Component for rendering the post
const Post: React.FC<PostProps> = ({ postData }) => {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const [isPlaying, setIsPlaying] = useState<Boolean>(false);

  // Render loading state while fetching data
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Render the fetched post data
  return (
    <>
      <Navbar />
      <Image src="/scenery.jpeg" width={500} height={500} alt="" />
      <div className="p-4">
        <div className="flex gap-2 items-center justify-between">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white"
          >
            {isPlaying ? (
              <StopIcon className="w-5 aspect-square" />
            ) : (
              <PlayIcon className="w-5 aspect-square" />
            )}
          </Button>

          <div>15 Dec 2023</div>

          <Button>
            <ShareIcon className="w-5 aspect-square" />
          </Button>
        </div>
        <h1 className="text-xl font-bold pt-3">{postData.title}</h1>
        <h1>By {postData.owner}</h1>
        <p className="pt-3">{postData.content}</p>
        <Calendar></Calendar>
      </div>
    </>
  );
};

export default Post;
