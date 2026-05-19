import Hero from "@/components/sections/Hero";
import { Button } from "@heroui/react";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      {/* <Image
      alt='whatever'
        src='/assets/design.png'
        width={500}
        height={1000} /> */}
    </div>
  );
}
