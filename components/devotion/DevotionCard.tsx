import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

type DevotionCardProps = {
  id: string;
  imageSrc: string;
  title: string;
  weekNo: number;
  className?: string;
};

export default function DevotionCard({
  id,
  imageSrc,
  title,
  weekNo,
  className,
}: DevotionCardProps) {
  const router = useRouter();

  return (
    <div
      className={cn(
        "flex flex-col min-w-[125px] w-full max-w-[150px] gap-1",
        className
      )}
      onClick={() => router.push(`/devotions/${id}`)}
    >
      <Image
        src={imageSrc}
        alt=""
        width={500}
        height={500}
        className="aspect-square w-full object-cover object-center rounded-lg"
      />
      <p className="text-gray-500 text-xs">Week {weekNo}</p>
      <p className="text-sm line-clamp-2">{title}</p>
    </div>
  );
}
