'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ThemeContext } from '@/context/theme-context'
import { authClient } from '@/lib/auth-client'

const BookingForm = ({ facility, addBooking }) => {
    const router = useRouter();
    const { theme } = useContext(ThemeContext)
    const isDark = theme === 'dark'
    const { data } = authClient.useSession()
    const user = data?.user;
    const inputStyle = `input input-bordered w-full text-base focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent ${isDark ? 'bg-theme-background border-zinc-800 text-text-white placeholder:text-text-secondary' : ''}`
    const labelTextClass = isDark ? 'text-text-secondary' : 'text-base-content/70'
    const cardBorderClass = isDark ? 'border-zinc-800' : 'border-base-200'

    // Booking Form States
    const [bookingDate, setBookingDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [duration, setDuration] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Price Calculation
    const totalPrice = facility.pricePerHour * duration;

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        if (!bookingDate || !timeSlot || !duration) {
            setError('Please select a booking date, time slot and duration.');
            return;
        }

        if (!user?.email) {
            setError('Unable to proceed at the moment. Please check your internet connection or sign in again.');
            return;
        }

        const bookingPayload = {
            facilityId: facility._id,
            facilityName: facility.facilityName,
            userEmail: user.email,
            bookingDate,
            timeSlot,
            hours: duration,
            totalPrice,
            status: 'pending',
            facilityImage: facility.imageUpload,
            facilityLocation: facility.location,
            createdAt: new Date().toISOString()
        };

        setLoading(true);

        try {
            const response = await addBooking(bookingPayload);
            console.log('booking/success/response: ', response)
            if (response?.data.insertedId) {
                setBookingDate('');
                setTimeSlot('');
                setDuration(1);
                setError(null);
                router.push('/my-bookings');
                toast.success('Booking confirmed successfully!', { autoClose: 3000 });
            } else if (response?.data.message) {
                // already booked
                router.push('/my-bookings');
                toast.error(response?.data.message, { autoClose: 3000 });
            } else {
                toast.error(response?.error || 'Could not complete booking. Please try again.', { autoClose: 3000 });
            }
        } catch (err) {
            console.error('Booking submit error:', err);
            toast.error('An error occurred while confirming your booking. Please try again.', { autoClose: 3000 });
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className={`card bg-foreground border ${cardBorderClass} shadow-md p-6 rounded-xl lg:sticky lg:top-20`}>
            <h2 className={`text-xl font-extrabold mb-1 ${isDark ? 'text-text-white' : 'text-text-primary'}`}>Book This Facility</h2>
            <p className={`text-sm mb-6 ${labelTextClass}`}>Fill in your details to reserve this spot.</p>

            <form onSubmit={handleBookingSubmit} className="space-y-6">
                {/* Facility Fixed Name Input */}
                <div className="form-control w-full">
                    <label className="label py-1">
                        <span className={`label-text font-bold text-sm uppercase ${labelTextClass}`}>Facility</span>
                    </label>
                    <input
                        type="text"
                        value={facility.facilityName}
                        disabled
                        className={`input input-bordered w-full font-medium text-base focus:outline-none cursor-not-allowed ${isDark ? 'bg-theme-background border-zinc-800 text-text-white' : 'bg-base-200/50 border-base-200 text-base-content'}`}
                    />
                </div>

                {/* Booking Date */}
                <div className="form-control w-full">
                    <label className="label py-1">
                        <span className={`label-text font-bold text-sm uppercase ${labelTextClass}`}>📅 Booking Date</span>
                    </label>
                    <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        required
                        className={inputStyle}
                    />
                </div>

                {/* Time Slot Select */}
                <div className="form-control w-full">
                    <label className="label py-1">
                        <span className={`label-text font-bold text-sm uppercase ${labelTextClass}`}>🕒 Time Slot</span>
                    </label>
                    <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        required
                        className={`select select-bordered w-full text-base focus:outline-none ${isDark ? 'bg-theme-background border-zinc-800 text-text-white' : ''}`}
                    >
                        <option value="" disabled>Select a time slot</option>
                        {
                            facility.availableTimeSlots.map((slot, i) => (
                                <option key={i} value={slot}>{slot}</option>
                            ))
                        }
                        {/* <option value="09:00-10:00">09:00 AM - 10:00 AM</option>
                        <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
                        <option value="14:00-15:00">02:00 PM - 03:00 PM</option> */}
                    </select>
                </div>

                {/* Duration Input */}
                <div className="form-control w-full">
                    <label className="label py-1">
                        <span className={`label-text font-bold text-sm uppercase ${labelTextClass}`}>Duration (Hours)</span>
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="8"
                        value={duration}
                        onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                        required
                        className={inputStyle}
                    />
                </div>

                {/* Invoice Breakdown Banner */}
                <div className={`rounded-xl p-4 text-base mt-6 space-y-2 ${isDark ? 'bg-success/10 border border-success/20' : 'bg-success/5 border border-success/10'}`}>
                    <div className="flex justify-between">
                        <span className={`${isDark ? 'text-text-secondary' : ''}`}>${facility.pricePerHour}/hr × {duration} hr</span>
                        <span className={`${isDark ? 'text-text-secondary' : ''}`}>${totalPrice}</span>
                    </div>
                    <div className={`flex justify-between font-extrabold text-lg pt-2 border-t border-dashed ${isDark ? 'border-success/30 text-text-white' : 'border-success/20 text-base-content'}`}>
                        <span>Total Price</span>
                        <span className="text-theme-primary">${totalPrice}</span>
                    </div>
                </div>

                {error && (
                    <div className="text-sm text-error font-medium mt-3">
                        {error}
                    </div>
                )}

                {/* Submit Action Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`btn bg-green-600 hover:bg-green-700 transition-colors duration-300 w-full text-white text-base py-6 rounded-xl font-bold tracking-wide mt-4 uppercase ${loading ? 'opacity-70 cursor-not-allowed' : ''} border-none shadow-none`}
                >
                    {loading ? 'Confirming...' : 'Confirm Booking'}
                </button>
            </form>
        </div>
    )
}

export default BookingForm