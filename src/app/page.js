import CallToAction from "@/components/sections/CallToAction";
import FeaturedFacilities from "@/components/sections/FeaturedFacilities";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import TrustStats from "@/components/sections/TrustStats";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
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

      <WhyChooseUs />
      <HowItWorks />
      <TrustStats />
      <Testimonials />  
      <CallToAction />  

      {/* <Image
      alt='whatever'
        src='/assets/design.png'
        width={500}
        height={1000} /> */}
    </div>
  );
}
