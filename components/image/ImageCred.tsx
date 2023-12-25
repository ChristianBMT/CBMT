import Image from "next/image";
import { cn } from "@/lib/utils";

type ImageCred = {
  src: string;
  author?: string;
  alt?: string;
  className?: string;
};

export default function ImageCred({
  src,
  author = "Anonymous",
  alt = "",
  className = "",
}: ImageCred) {
  return (
    <div className="relative">
      {
        <Image
          src={src}
          width={500}
          height={500}
          alt={alt}
          className={cn(className)}
        />
      }
      <div className="absolute bottom-0 right-0 text-xs bg-black/50 p-1 opacity-75">
        Photo by: {author}
      </div>
    </div>
  );
}
