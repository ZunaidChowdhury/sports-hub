import BookingCard from '@/components/cards/BookingCard';
import SectionHeading from '@/components/shared/SectionHeading';
import { updateBooking } from '@/lib/actions';
import { getUserBookings } from '@/lib/data';
import React from 'react'

const MyBookingsPage = async () => {
    const userBookings = await getUserBookings();
    console.log('bookings: ', userBookings);
    return (
        <div className='py-12 tablet:py-20'>
            <div className='max-w-358 px-4 mx-auto'>
                <SectionHeading
                    title='My Bookings'
                    description='View and manage all your facility bookings.'
                    classNames='pb-10' />

                {/* content  */}
                <div className='space-y-4'>
                    {
                        userBookings.map(booking => <BookingCard key={booking._id} booking={booking} updateBooking={updateBooking} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default MyBookingsPage