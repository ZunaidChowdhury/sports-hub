import ManageFacilityCard from "@/components/cards/ManageFacilityCard";
import { EmptyBookingsState } from "@/components/cards/EmptyBookingsState";
import SectionHeading from "@/components/shared/SectionHeading"

import { getUserAddedFacilities } from "@/lib/data";
import { Plus } from "lucide-react"

const ManageFacilitiesPage = async () => {
    const userAddedFacilities = await getUserAddedFacilities();
    const hasFacilities = Array.isArray(userAddedFacilities) && userAddedFacilities.length > 0;

    return (
        <div className='py-12 tablet:py-20'>
            <div className='max-w-358 px-4 mx-auto'>
                <SectionHeading
                    title='Manage Facilities'
                    description='Manage (Edit/Remove) your listed facilities.'
                    classNames='pb-10'
                    actionProperBtn={{ text: 'Add New', url: 'add-facility', icon: Plus }} />

                <div className='space-y-4'>
                    {hasFacilities ? (
                        userAddedFacilities.map(facility => <ManageFacilityCard key={facility._id} facility={facility} />)
                    ) : (
                        <EmptyBookingsState
                            title="You haven't added any facility yet, add one?"
                            description='Your facility listings will appear here once you add a court or sports venue.'
                            actionLabel='Add Facility'
                            actionHref='/add-facility'
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ManageFacilitiesPage