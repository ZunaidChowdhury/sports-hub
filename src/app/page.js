import FeaturedFacilities from "@/components/sections/FeaturedFacilities";
import Hero from "@/components/sections/Hero";
import { getFacilities, getFeaturedFacilities } from "@/lib/data";
import { Button } from "@heroui/react";
import Image from "next/image";

export default async function Home() {
  const facilities = await getFeaturedFacilities();
  // console.log('facilities: ', facilities);

  return (
    <div>
      <Hero />

      {
        facilities ? <FeaturedFacilities facilities={facilities} /> : null
      }

      {/* <Image
      alt='whatever'
        src='/assets/design.png'
        width={500}
        height={1000} /> */}
    </div>
  );
}
