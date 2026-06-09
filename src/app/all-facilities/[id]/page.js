import AvailableSlotsDP from '@/components/cards/AvailableSlotsDP';
import BookingForm from '@/components/ui/forms/BookingForm';
import { addBooking } from '@/lib/actions';
import { getFacilities, getSpecificFacility } from '@/lib/data';
import { ImPriceTags } from 'react-icons/im';
import { LuClock4 } from 'react-icons/lu';
import { MdOutlineLocationOn, MdOutlinePeopleAlt } from 'react-icons/md';

export async function generateStaticParams() {
    const allFacilities = await getFacilities();
    return allFacilities.map(facility => ({
        id: facility._id.toString(),
    }));
}

// Revalidate this page every hour (in seconds)
// export const revalidate = 3600;

const FacilityDetailsPage = async ({ params }) => {
    const { id } = await params;
    const facility = await getSpecificFacility(id);
    // console.log('facility: ', facility)

    return (
        <div className="py-12 tablet:py-20 bg-background">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-358 px-4 mx-auto">

                {/* LEFT COLUMN: Main Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Image Container with Absolute Tag */}
                    <div className="relative w-full h-80 md:h-100 rounded-2xl overflow-hidden shadow-md">
                        <img
                            src={facility.imageUpload}
                            alt={facility.facilityName}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 p-4 capitalize rounded-full text-white text-base tracking-normal bg-green-600 border-none badge badge-success z-1">
                            {facility.facilityType}
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-black text-text-primary">
                        {facility.facilityName}
                    </h1>

                    {/* Grid Info Specs Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="card bg-foreground rounded-xl shadow-md p-6 flex flex-col justify-center">
                            <span className="text-sm font-medium uppercase flex items-center gap-2 text-text-secondary"><MdOutlineLocationOn className='w-5 h-5 text-theme-primary'/>Location</span>
                            <span className="text-lg font-semibold tracking-normal mt-1 text-text-primary">{facility.location}</span>
                        </div>

                        <div className="card bg-foreground shadow-md rounded-xl p-6 flex flex-col justify-center">
                            <span className="text-sm font-medium uppercase flex items-center gap-2 text-text-secondary"><MdOutlinePeopleAlt className='w-5 h-5 text-theme-primary' /> Capacity</span>
                            <span className="text-lg font-semibold tracking-normal mt-1 text-text-primary">{facility.capacity}</span>
                        </div>

                        <div className="card bg-foreground shadow-md p-6 rounded-xl flex flex-col justify-center">
                            <span className="text-sm font-medium uppercase flex items-center gap-2 text-text-secondary"><ImPriceTags className='w-5 h-5 text-theme-primary' /> Price</span>
                            <span className="text-lg font-semibold tracking-normal mt-1 text-text-primary">${facility.pricePerHour}/hour</span>
                        </div>

                        <AvailableSlotsDP />
                    </div>

                    {/* Description Section */}
                    <div className="space-y-2 bg-foreground shadow-md rounded-xl p-6">
                        <h3 className="text-lg font-bold tracking-normal text-text-primary">About this facility</h3>
                        <p className="text-base tracking-normal text-text-secondary">
                            {facility.description}
                        </p>
                    </div>
                </div>

                {/* RIGHT COLUMN: Booking Sticky Card Form */}
                <BookingForm facility={facility} addBooking={addBooking} />

            </div>
        </div>
    )
}

export default FacilityDetailsPage