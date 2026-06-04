import ManageFacilityCard from "@/components/cards/ManageFacilityCard";
import SectionHeading from "@/components/shared/SectionHeading"
import DeleteConfirmation from "@/components/ui/modals/DeleteConfirmation";
import { auth } from "@/lib/auth";
import { getUserAddedFacilities } from "@/lib/data";
import { Plus } from "lucide-react"
import { headers } from "next/headers";


const ManageFacilitiesPage = async () => {

    const userAddedFacilities = await getUserAddedFacilities();
    // console.log('userAddedFacilities', userAddedFacilities);


    return (
        <div className='py-12 tablet:py-20'>
            <div className='max-w-358 px-4 mx-auto'>
                <SectionHeading
                    title='Manage Facilities'
                    description='Manage (Edit/Remove) your listed facilities.'
                    classNames='pb-10'
                    actionProperBtn={{ text: 'Add New', url: 'add-facility', icon: Plus }} />

                {/* content  */}
                <div className='space-y-4'>
                    {
                        userAddedFacilities.map(facility => <ManageFacilityCard key={facility._id} facility={facility} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default ManageFacilitiesPage