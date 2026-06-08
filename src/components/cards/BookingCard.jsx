'use client'

import { formatDate } from '@/lib/utils';
import { MapPin, Calendar, Clock, DollarSign, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const BookingCard = ({ booking, updateBooking }) => {
    const router = useRouter();
    return (
        <div>
            {/* booking card */}
            <div className="group bg-foreground rounded-xl  border  hover:border-green-700 transition-all duration-300 p-6 flex gap-4  flex-col md:flex-row md:items-center md: justify-between">
                {/* left content */}
                <div className='flex gap-4 flex-col md:flex-row'>
                    {/* Thumbnail Image */}
                    <div className="w-full h-50 md:w-30 md:h-30 rounded-xl overflow-hidden   transition-all duration-300">
                        <Image
                            src={booking.facilityImage}
                            alt={booking.facilityName}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                        />
                    </div>

                    {/* Details Content */}
                    <div className="flex flex-col gap-4 ">
                        {/* Title and Status Badge */}
                        <div className="flex flex-col md:flex-row  gap-3">
                            <h2 className="text-2xl font-semibold text-text-primary leading-tight truncate">
                                {booking.facilityName}
                            </h2>
                            <span className={`badge ${booking.status === 'pending' ? 'badge-warning' : 'badge-error'} badge-lg font-semibold uppercase tracking-[0.2em] px-3 py-1 text-sm border-none shadow-sm`}>
                                {booking.status}
                            </span>
                        </div>

                        {/* Metadata Rows */}
                        <div className="flex flex-col md:flex-row md:flex-wrap max-w-110 items-start gap-4  text-lg text-text-secondary font-medium">
                            {/* Location */}
                            <div className="flex items-center gap-1 min-w-0 text-text-secondary">
                                <MapPin size={18} className="text-theme-primary" />
                                <span className="truncate">{booking.facilityLocation}</span>
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-1 text-text-secondary">
                                <Calendar size={18} className="text-theme-primary" />
                                <span>{formatDate(booking.bookingDate)}</span>
                            </div>

                            {/* Time */}
                            <div className="flex items-center gap-1 text-text-secondary">
                                <Clock size={18} className="text-theme-primary" />
                                <span>{booking.timeSlot} ({booking.hours}h)</span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-1 font-semibold text-text-primary">
                                <DollarSign size={18} className="text-theme-primary" />
                                <span>{booking.totalPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right Action Button */}
                {
                    booking.status === 'pending' ? (
                        <button
                            className="btn btn-ghost border-none shadow-none text-base text-text-white bg-red-600 hover:bg-red-700 gap-1.5 px-3 py-1.5 h-auto min-h-0 font-semibold"
                            onClick={() => {
                                document.getElementById(`cancel_booking_modal_${booking._id}`).showModal();
                            }}>
                            <Trash2 className="w-4.5 h-4.5" />
                            <span>Cancel</span>
                        </button>) : null
                }
            </div>



            <dialog id={`cancel_booking_modal_${booking._id}`} className="modal">
                <div className="modal-box  bg-foreground">
                    <h3 className="text-text-primary font-bold text-lg">Cancel Booking</h3>
                    <p className="py-4 text-text-secondary">
                        Are you sure you want to cancel your booking for <span className="font-bold">{booking.facilityName}</span> ?
                    </p>
                    <div className="modal-action">
                        {/* Added 'flex gap-x-3' to the form to space out the buttons */}
                        <form method="dialog" className="flex gap-x-3">
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                className="btn text-white bg-red-600 hover:bg-red-700 border-none shadow-none"
                                onClick={async () => {
                                    const updatedData = {
                                        ...booking,
                                        status: 'canceled'
                                    };
                                    const res = await updateBooking(updatedData);
                                    if (res.modifiedCount > 0) {
                                        router.refresh();
                                        toast.success('Booking canceled.');
                                    }
                                }}
                            >
                                Yes, Cancel
                            </button>
                            <button className="btn border-none shadow-none">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    )
}

export default BookingCard