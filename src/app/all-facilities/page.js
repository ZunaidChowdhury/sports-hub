import AllFacilities from '@/components/sections/AllFacilities';
import SectionHeading from '@/components/shared/SectionHeading';
import { getFacilities } from '@/lib/data';

const sportTypes = ['football',
    'badminton',
    'swimming',
    'tennis',
    'bowling',
    'basketball',
    'baseball',
    'volleyball',
    'skating',
    'climbing',
    'other',
]

const AllFacilitiesPage = async ({ searchParams }) => {
    const allFacilities = await getFacilities();
    return (
        <div className='py-12 tablet:py-30'>
            <div className='max-w-358 px-4 mx-auto'>
                <SectionHeading
                    title='All Facilities' />

                {
                    allFacilities && <AllFacilities initialFacilities={allFacilities} searchParams={searchParams} sportTypes={sportTypes} />
                }
            </div>
        </div>
    )
}

export default AllFacilitiesPage