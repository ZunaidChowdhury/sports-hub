'use client'

import Link from 'next/link';

import React from 'react';
import { MapPin, DollarSign, Users, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { deleteFacility } from '@/lib/actions';

import { useContext } from 'react'
import { ThemeContext } from '@/context/theme-context'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function ManageFacilityCard({ facility }) {
    const { theme } = useContext(ThemeContext);
    const router = useRouter();

    return (
        <div>
            {/* card */}
            <div className={`group bg-foreground rounded-xl shadow-md border hover:border-green-700 transition-all duration-300 p-6 flex gap-4  flex-col md:flex-row md:items-center md:justify-between ${theme === 'light' ? 'border-zinc-100' : 'border-zinc-900'}`}>
                {/* Left Section: Image and Details */}
                <div className='flex gap-4 flex-col md:flex-row'>
                    {/* Thumbnail Image */}
                    <Link href={`/all-facilities/${facility._id}`} className="w-full h-50 md:w-30 md:h-30 rounded-xl overflow-hidden   transition-all duration-300">
                        <Image
                            src={facility.imageUpload}
                            alt={facility.facilityName}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                        />
                    </Link>

                    {/* Text Content */}
                    <div className="flex flex-col gap-4">
                        {/* Title and Tag */}
                        <div className="flex flex-col md:flex-row  gap-3">
                            <Link href={`/all-facilities/${facility._id}`}>
                            <h3 className="text-2xl font-bold text-text-primary hover:text-theme-primary transition-colors duration-300 truncate">{facility.facilityName}</h3>
                            </Link>
                        </div>

                        {/* Meta Info Row */}
                        <div className="flex flex-col md:flex-row md:flex-wrap max-w-80 items-start gap-4  text-lg text-text-secondary font-medium">
                            {/* Location */}
                            <span className="flex items-center gap-1 min-w-0">
                                <MapPin className="w-4 h-4 text-theme-primary shrink-0" />
                                <span className="truncate">{facility.location}</span>
                            </span>

                            {/* Pricing */}
                            <span className="flex items-center gap-0.5 text-text-secondary">
                                <DollarSign className="w-4 h-4 text-theme-primary" />
                                <span>{facility.pricePerHour}/hr</span>
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
                <div className="flex flex-col gap-2 justify-center shrink-0 font-medium text-lg">
                    {/* Edit Button */}
                    <Link href={`/manage-facilities/edit/${facility._id}`} className="btn text-base btn-ghost text-white bg-blue-600  hover:bg-blue-700 border-none shadow-none transition-colors duration-300 gap-1.5 px-3 py-1.5 h-auto min-h-0 font-semibold ">
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Edit</span>
                    </Link>

                    {/* Delete Button */}
                    <button
                        className="btn text-base btn-ghost text-white bg-red-600  hover:bg-red-700 border-none shadow-none  gap-1.5 px-3 py-1.5 h-auto min-h-0 font-semibold transition-colors duration-300"
                        onClick={() => {
                            document.getElementById(`delete_confirmation_modal_${facility._id}`).showModal();
                        }}>
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                    </button>



                </div>
            </div>

            <dialog id={`delete_confirmation_modal_${facility._id}`} className="modal">
                <div className="modal-box bg-foreground">
                    <h3 className="font-bold text-lg text-text-primary">Delete Confirmation</h3>
                    <p className="py-4 text-text-secondary">
                        Are you sure you want to delete <span className="font-bold">{facility.facilityName}</span> facility?
                    </p>
                    <div className="modal-action">
                        {/* Added 'flex gap-x-3' to the form to space out the buttons */}
                        <form method="dialog" className="flex gap-x-3">
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                className="btn text-white bg-red-600 hover:bg-red-700 border-none shadow-none transition-colors duration-300"
                                onClick={async () => {
                                    const data = await deleteFacility(facility._id)
                                    if(data.deletedCount > 0){
                                        router.refresh();
                                        toast.success(`${facility.facilityName} deleted successfully.`);
                                    }
                                }}
                            >
                                Yes, Delete
                            </button>
                            <button className="btn border-none shadow-none">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
}
