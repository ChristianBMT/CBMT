import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type CategoryButtonProps = {
  text: string;
  className?: string;
  color: string;
  href?: string;
};

export function CategoryButton({
  text,
  className,
  color = "blue",
  href,
}: CategoryButtonProps) {
  const router = useRouter();
  let colorMap: { [key: string]: string } = {
    blue: "bg-blue-400 hover:bg-blue-300 dark:bg-blue-800 dark:hover:bg-blue-900",
    green:
      "bg-green-400 hover:bg-green-300 dark:bg-green-800 dark:hover:bg-green-900",
    red: "bg-red-400 hover:bg-red-300 dark:bg-red-800 dark:hover:bg-red-900",
    yellow:
      "bg-yellow-400 hover:bg-yellow-300 dark:bg-yellow-800 dark:hover:bg-yellow-900",
    pink: "bg-pink-400 hover:bg-pink-300 dark:bg-pink-800 dark:hover:bg-pink-900",
    purple:
      "bg-purple-400 hover:bg-purple-300 dark:bg-purple-800 dark:hover:bg-purple-900",
    violet:
      "bg-violet-400 hover:bg-violet-300 dark:bg-violet-800 dark:hover:bg-violet-900",
    indigo:
      "bg-indigo-400 hover:bg-indigo-300 dark:bg-indigo-800 dark:hover:bg-indigo-900",
    orange:
      "bg-orange-400 hover:bg-orange-300 dark:bg-orange-800 dark:hover:bg-orange-900",
  };
  let colorClass = colorMap[color];

  return (
    <Button
      variant={"secondary"}
      className={cn(colorClass, className, "font-semibold")}
      onClick={() => {
        return href ? router.push(href) : "";
      }}
    >
      {text}
    </Button>
  );
}
