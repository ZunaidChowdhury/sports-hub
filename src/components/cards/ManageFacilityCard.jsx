
import React from 'react';
import { MapPin, DollarSign, Users, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import ManageFacilityCardActions from '../ui/ManageFacilityCardActions';
import { deleteFacility } from '@/lib/actions';

export default function ManageFacilityCard({ facility }) {
    return (
        <div className="group relative bg-foreground rounded-xl shadow-md hover:shadow-lg overflow-hidden hover:-translate-y-1 transition-all duration-300 p-6 items-center justify-between gap-4 w-full">

            {/* Left Section: Image and Details */}
            <div className="flex items-center justify-between gap-4 flex-1 min-w-0">
                <div className='flex items-center gap-4'>
                    {/* Thumbnail Image */}
                    <figure className="w-30 h-30 rounded-xl overflow-hidden shrink-0 bg-zinc-200 dark:bg-base-300 transition-all duration-300">
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
                            <h3 className="text-2xl font-bold text-text-primary truncate">{facility.facilityName}</h3>
                        </div>

                        {/* Meta Info Row */}
                        <div className="flex items-center gap-x-4 gap-y-1 text-lg text-text-secondary flex-wrap font-medium">
                            {/* Location */}
                            <span className="flex items-center gap-1 min-w-0">
                                <MapPin className="w-4 h-4 text-theme-primary shrink-0" />
                                <span className="truncate">{facility.location}</span>
                            </span>

                            {/* Pricing */}
                            <span className="flex items-center gap-0.5 text-text-secondary">
                                <DollarSign className="w-4 h-4 text-theme-primary" />
                                <span>${facility.pricePerHour}/hr</span>
                            </span>

                            {/* Player Capacity */}
                            <span className="flex items-center gap-1 text-text-secondary">
                                <Users className="w-4 h-4 text-theme-primary" />
                                <span>{facility.capacity} players</span>
                            </span>
                        </div>
                    </div>
                </div>
                {/* Right Section: Action Controls */}
                <ManageFacilityCardActions facility={facility} deleteFacility={deleteFacility} />
            </div>

        </div>
    );
}
