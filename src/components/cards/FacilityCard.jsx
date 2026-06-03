import { ArrowRight, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import SlotsLeft from '../SlotsLeft'

const FacilityCard = ({ facility }) => {

    return (
        <div className='relative group bg-foreground rounded-xl shadow-md hover:shadow-lg overflow-hidden transition-all duration-300'>

            {/* <SlotsLeft /> */}

            <Link href={`/all-facilities/${facility._id}`} >
                <Image
                    src={facility.imageUpload}
                    width={400}
                    height={200}
                    alt={facility.facilityName}
                    className='w-full h-45 object-cover  group-hover:scale-105  transition-all duration-300'
                />
            </Link>
            <div className='p-6'>
                {/* title  */}
                <Link href={`/all-facilities/${facility._id}`} >
                    <h4 className='text-xl tablet:text-2xl font-bold line-clamp-1'>{facility.facilityName}</h4>
                </Link>

                {/* location */}
                <div className='flex items-center gap-1 text-text-secondary'>
                    <MapPin size={16} /> {facility.location}
                </div>

                {/* facility price and rating */}
                <div className='my-4 flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <span className='text-theme-primary text-xl font-medium'>${facility.pricePerHour}</span>
                        <span className='text-text-secondary'>/ hour</span>
                    </div>

                    <div className='flex items-center gap-2'>
                        <FaStar className='text-yellow-600 pb-0.5' />
                        <span className='font-medium'>{facility.rating}</span>
                        <span className='text-text-secondary'>({facility.ratedBy})</span>
                    </div>

                </div>

                {/* book now button  */}
                <Link href={`/all-facilities/${facility._id}`}
                    className=" py-5 w-full rounded-lg flex items-center gap-2 btn 
                                border-green-600 text-green-600 hover:bg-green-600 hover:text-foreground 
                                    transition-colors duration-300 text-lg font-semibold ">
                    Book Now
                </Link>
            </div>
        </div>
    )
}

export default FacilityCard