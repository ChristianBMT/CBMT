import Image from "next/image";
import { Navbar } from "@/components/navigation/Navbar";

export default function Home() {
  return (
    <div className="min-h-100dvh p-3">
      <Navbar />
      <main className="flex flex-col mx-auto max-w-[500px] px-8 py-4">
        <h1>Transforming your walk with Christ</h1>
        <h6>Start your journey today!</h6>
      </main>
    </div>
  );
}
