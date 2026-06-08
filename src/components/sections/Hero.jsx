import { ArrowRight, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { MdOutlineEventAvailable } from "react-icons/md"
import { TbBrandBooking } from "react-icons/tb"

const stats = [
  { icon: <TbBrandBooking size={40} />, label: "Instant Booking", sub: "Book in just few clicks" },
  { icon: <MdOutlineEventAvailable size={40} />, label: "Real-time Availability", sub: "Live slots, real-time info" },
  { icon: <ShieldCheck size={40} />, label: "Secure & Reliable", sub: "Safe payments. Always." }
]

const Hero = () => {
  return (
    <div className='bg-[url(/assets/hero-img-sports-hub2.jpeg)] bg-no-repeat bg-cover bg-position-[90%_55%] py-12 tablet:py-32'>
      <div className="max-w-358 px-4 sm:px-6 lg:px-8 mx-auto flex flex-col items-center tablet:items-start gap-6">
        <h1 className="text-4xl tablet:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-white text-center tablet:text-left leading-tight">
          Find. Book. Play. <br />
          All in <span className="text-theme-primary">One Place.</span>
        </h1>
        <p className='max-w-3xl text-base tablet:text-xl text-text-white/90 text-center tablet:text-left font-medium'>
          Discover and book the best sports facilities<br /> near you. Anytime, anywhere.
        </p>
        <Link
          href='/all-facilities'
          className="rounded-lg btn px-8 py-3 w-fit h-12 text-base font-semibold bg-theme-primary border-none shadow-none text-white transition-all hover:scale-105 active:scale-95"
        >
          Explore All Facilities <ArrowRight />
        </Link>
        <div className='flex flex-col tablet:flex-row flex-wrap items-center gap-4 mt-6'>
          {[
            { icon: <TbBrandBooking size={45} />, label: "Instant Booking", sub: "Book in just few clicks" },
            { icon: <MdOutlineEventAvailable size={45} />, label: "Real-time Availability", sub: "Live slots, real-time info" },
            { icon: <ShieldCheck size={45} />, label: "Secure & Reliable", sub: "Safe payments. Always.", star: true }
          ].map((stat, i) => (
            <div
              key={i}
              className='min-w-72.5 flex items-center gap-3 bg-theme-background/80 border border-zinc-800 rounded-xl p-4'
            >
              <div className='text-theme-primary'>{stat.icon}</div>
              <div>
                <h4 className='text-text-white text-lg font-semibold flex items-center gap-1'>
                  {stat.label}
                </h4>
                <p className='text-text-white/80 text-lg'>{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero