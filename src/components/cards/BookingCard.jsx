'use client'

import { formatDate } from '@/lib/utils';
import { MapPin, Calendar, Clock, DollarSign, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const BookingCard = ({ booking, updateBooking }) => {
    const router = useRouter();
    return (
        <div className="group card card-side bg-base-100 border border-base-200 rounded-xl hover:border-emerald-500 transition-all duration-300 shadow-md  p-6 gap-4 flex-col sm:flex-row items-start sm:items-center justify-between">

            {/* Left Side: Image and Details Group */}
            <div className="flex gap-4 items-start sm:items-center w-full sm:w-auto">
                {/* Thumbnail Image */}
                <div className="w-30 h-30 rounded-xl overflow-hidden bg-base-300 transition-all duration-300">
                    <Image
                        src={booking.facilityImage}
                        alt={booking.facilityName}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    />
                </div>

                {/* Details Content */}
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                    {/* Title and Status Badge */}
                    <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-2xl font-semibold text-base-content leading-tight truncate">
                            {booking.facilityName}
                        </h2>
                        <span className={`badge ${booking.status === 'pending' ? 'badge-warning' : 'badge-error'}  badge-lg font-semibold uppercase tracking-[0.2em] px-3 py-1 text-sm  border-none shadow-sm`}>
                            {booking.status}
                        </span>
                    </div>

                    {/* Metadata Rows */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-lg text-base-content/70 font-medium">
                        {/* Location */}
                        <div className="flex items-center gap-1 min-w-0">
                            <MapPin size={18} className="text-success" />
                            <span className="truncate">{booking.facilityLocation}</span>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-1">
                            <Calendar size={18} className="text-success" />
                            <span>{formatDate(booking.bookingDate)}</span>
                        </div>

                        {/* Time */}
                        <div className="flex items-center gap-1">
                            <Clock size={18} className="text-success" />
                            <span>{booking.timeSlot} ({booking.hours}h)</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-1 font-semibold text-base-content">
                            <DollarSign size={18} className="text-success" />
                            <span>{booking.totalPrice}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Action Button */}
            {
                booking.status === 'pending' ? (<div className="w-full sm:w-auto flex justify-end pt-4 sm:pt-0 border-t border-base-200 sm:border-t-0">
                    <button
                        className="btn text-base btn-ghost text-rose-500 hover:bg-rose-50 gap-1.5 px-3 py-1.5 h-auto min-h-0 font-semibold justify-start"
                        onClick={() => {
                            document.getElementById(`cancel_booking_modal_${booking._id}`).showModal();
                        }}>
                        <Trash2 className="w-4.5 h-4.5" />
                        <span>Cancel</span>
                    </button>
                </div>) : null
            }

            <dialog id={`cancel_booking_modal_${booking._id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Cancel Booking</h3>
                    <p className="py-4">
                        Are you sure you want to cancel your booking for <span className="font-bold">{booking.facilityName}</span> ?
                    </p>
                    <div className="modal-action">
                        {/* Added 'flex gap-x-3' to the form to space out the buttons */}
                        <form method="dialog" className="flex gap-x-3">
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                className="btn text-white bg-red-600 hover:bg-red-700"
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
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    )
}

export default BookingCard