import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SectionHeading from '../shared/SectionHeading'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import FacilityCard from '../cards/FacilityCard'

const FeaturedFacilities = async ({ facilities }) => {
    const facilitiesData = facilities;
    // facilitiesData.sort((a, b) => b.rating - a.rating);
    // console.log('courses', courses);

    return (
        <div className='py-12 tablet:py-20'>
            {/* container */}
            <div className='max-w-358 px-4 mx-auto'>
                <SectionHeading
                    title='Featured Facilities'
                    subTitle='FEATURED'
                    actionBtnTitle='View All Facilities'
                    actionBtnUrl='/all-facilities' />
                {/* content  */}
                <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {/* card */}
                    {
                        facilitiesData.slice(0, 9).map(facility => <FacilityCard key={facility._id} facility={facility} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default FeaturedFacilities