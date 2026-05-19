import { ShieldCheck } from "lucide-react"
import { FaStar } from "react-icons/fa"
import { MdOutlineEventAvailable } from "react-icons/md"
import { TbBrandBooking } from "react-icons/tb"


const Hero = () => {
  return (
    <div className='bg-[url(/assets/hero-img-sports-hub2.jpeg)] bg-no-repeat bg-cover bg-position-[center_55%] py-40'>
      <div className="max-w-350 mx-auto flex flex-col gap-6">
        <h1 className="text-7xl font-extrabold text-text-white">
          Find. Book. Play. <br />
          All in <span className="text-theme-primary">One Place.</span>
        </h1>
        <p className='text-text-white text-2xl font-medium'>
          Discover and book the best sports facilities<br /> near you. Anytime, anywhere.
        </p>
        <div className='flex flex-col tablet:flex-row items-center gap-4 mt-6'>
          {[
            { icon: <TbBrandBooking  size={45} />, label: "Instant Booking", sub: "Book in just few clicks" },
            { icon: <MdOutlineEventAvailable  size={45} />, label: "Real-time Availability", sub: "Live slots, real-time info" },
            { icon: <ShieldCheck  size={45} />, label: "Secure & Reliable", sub: "Safe payments. Always.", star: true }
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