
import React from 'react';
import { MapPin, DollarSign, Users, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import ManageFacilityCardActions from '../ui/ManageFacilityCardActions';
import { deleteFacility } from '@/lib/actions';

export default function ManageFacilityCard({ facility }) {
    return (
        <div className="group card card-side bg-base-100 border border-base-200 rounded-xl hover:border-green-600 transition-colors duration-300 shadow-sm p-6 items-center justify-between gap-4 w-full">

            {/* Left Section: Image and Details */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Thumbnail Image */}
                <figure className="w-30 h-30  rounded-xl overflow-hidden shrink-0">
                    <Image
                        src={facility.imageUpload}
                        alt={facility.facilityName}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    />
                </figure>

                {/* Text Content */}
                <div className="flex flex-col gap-2 min-w-0">
                    {/* Title and Tag */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-2xl font-bold text-base-content truncate">{facility.facilityName}</h3>
                        {/* <span className="badge badge-success badge-sm font-semibold tracking-wider text-[10px] uppercase bg-emerald-100 text-emerald-700 border-none px-2 py-0.5">
                            Football
                        </span> */}
                    </div>

                    {/* Meta Info Row */}
                    <div className="flex items-center gap-x-4 gap-y-1 text-lg text-base-content/60 flex-wrap font-medium">
                        {/* Location */}
                        <span className="flex items-center gap-1 min-w-0">
                            <MapPin className="w-4 h-4 text-emerald-500/70 shrink-0" />
                            <span className="truncate">{facility.location}</span>
                        </span>

                        {/* Pricing */}
                        <span className="flex items-center gap-0.5">
                            <DollarSign className="w-4 h-4 text-emerald-500/70" />
                            <span>${facility.pricePerHour}/hr</span>
                        </span>

                        {/* Player Capacity */}
                        <span className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-emerald-500/70" />
                            <span>{facility.capacity} players</span>
                        </span>

                        {/* Booking Status Tag */}
                        {/* <span className="badge font-bold text-xs bg-emerald-100 text-emerald-800 border-none px-2.5 py-1">
                            0 Bookings
                        </span> */}
                    </div>
                </div>
            </div>

            {/* Right Section: Action Controls */}
            <ManageFacilityCardActions facilityId={facility._id} deleteFacility={deleteFacility} />

        </div>
    );
}
