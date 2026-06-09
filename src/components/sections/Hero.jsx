"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { MdOutlineEventAvailable } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";

const stats = [
  { icon: <TbBrandBooking size={45} />, label: "Instant Booking", sub: "Book in just few clicks" },
  { icon: <MdOutlineEventAvailable size={45} />, label: "Real-time Availability", sub: "Live slots, real-time info" },
  { icon: <ShieldCheck size={45} />, label: "Secure & Reliable", sub: "Safe payments. Always." }
];

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  // 1. Parent orchestration container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // Automatically staggers heading, text, CTA, and stats
        delayChildren: 0.1,
      },
    },
  };

  // 2. Hardware-accelerated text/element animation
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 25
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 14,
        mass: 0.8,
      },
    },
  };

  // 3. Sequential stagger container specifically for the stats row
  const statsContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="bg-[url(/assets/hero-img-sports-hub2.jpeg)] bg-no-repeat bg-cover bg-position-[90%_55%] py-12 tablet:py-32">
      {/* Turn the layout wrapper into a motion element */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-358 px-4 sm:px-6 lg:px-8 mx-auto flex flex-col items-center tablet:items-start gap-6"
      >
        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl tablet:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-white text-center tablet:text-left leading-tight"
        >
          Find. Book. Play. <br />
          All in <span className="text-theme-primary">One Place.</span>
        </motion.h1>

        {/* Subtitle Description */}
        <motion.p
          variants={itemVariants}
          className="max-w-3xl text-base tablet:text-xl text-text-white/90 text-center tablet:text-left font-medium"
        >
          Discover and book the best sports facilities<br /> near you. Anytime, anywhere.
        </motion.p>

        {/* Main CTA Link Button */}
        <motion.div variants={itemVariants}>
          <Link href="/all-facilities" passHref legacyBehavior>
            <motion.a
              whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
              className="inline-flex items-center justify-center gap-2 rounded-lg btn px-8 py-3 w-fit h-12 text-base font-semibold bg-theme-primary border-none shadow-none text-white transition-colors"
            >
              Explore All Facilities <ArrowRight size={18} />
            </motion.a>
          </Link>
        </motion.div>

        {/* Stats Row Container */}
        <motion.div
          variants={statsContainerVariants}
          className="flex flex-col tablet:flex-row flex-wrap items-center gap-4 mt-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={shouldReduceMotion ? {} : { y: -4, borderColor: "rgba(var(--theme-primary-rgb), 0.4)" }}
              className="min-w-72.5 flex items-center gap-3 bg-theme-background/80 border border-zinc-800 rounded-xl p-4 transition-colors duration-200"
            >
              <div className="text-theme-primary">{stat.icon}</div>
              <div>
                <h4 className="text-text-white text-lg font-semibold flex items-center gap-1">
                  {stat.label}
                </h4>
                <p className="text-text-white/80 text-lg">{stat.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
