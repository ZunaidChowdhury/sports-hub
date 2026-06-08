import FacilityCard from '@/components/cards/FacilityCard';
import SearchNFilter from '@/components/SearchNFilter';
import SectionHeading from '@/components/shared/SectionHeading';
import { getFacilities } from '@/lib/data';





const AllFacilitiesPage = async ({ searchParams }) => {
    const sp = await searchParams;
    // console.log('search: ', sp.search, ' ', 'type: ', sp.type)
    const allFacilities = await getFacilities(sp.search, sp.type);
    // console.log('allFacilities: ', allFacilities)

    return (
        <div className='py-12 tablet:py-20'>
            <div className='max-w-358 px-4 mx-auto'>
                <SectionHeading
                    title='All Facilities'
                    description='All the facilities available for booking.'
                    classNames='pb-10' />

                <SearchNFilter />

                {/* Facility contents */}
                {
                    allFacilities && (
                        < div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-10'>
                            {
                                allFacilities.length > 0 ? (
                                    allFacilities.map((facility) => (
                                        <FacilityCard
                                            key={facility._id}
                                            facility={facility}
                                        />
                                    ))
                                ) : (
                                    <div className='col-span-full text-center py-12'>
                                        <p className='text-text-secondary text-lg'>
                                            No facilities found matching your criteria.
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div >
    )
}

export default AllFacilitiesPage