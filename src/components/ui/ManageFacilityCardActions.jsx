'use client'

import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

const ManageFacilityCardActions = ({ facility, deleteFacility }) => {

    return (
        <div className="flex flex-col gap-2 justify-center shrink-0 font-medium text-lg">
            {/* Edit Button */}
            <Link href={`/manage-facilities/edit/${facility._id}`} className="btn text-base btn-ghost text-blue-600 hover:bg-blue-50 gap-1.5 px-3 py-1.5 h-auto min-h-0 font-semibold justify-start">
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit</span>
            </Link>

            {/* Delete Button */}
            <button
                className="btn text-base btn-ghost text-rose-500 hover:bg-rose-50 gap-1.5 px-3 py-1.5 h-auto min-h-0 font-semibold justify-start"
                onClick={() => {
                    document.getElementById(`delete_confirmation_modal_${facility._id}`).showModal();
                }}>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
            </button>

            <dialog id={`delete_confirmation_modal_${facility._id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete Confirmation</h3>
                    <p className="py-4">
                        Are you sure you want to delete <span className="font-bold">{facility.facilityName}</span> facility?
                    </p>
                    <div className="modal-action">
                        {/* Added 'flex gap-x-3' to the form to space out the buttons */}
                        <form method="dialog" className="flex gap-x-3">
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                className="btn text-white bg-red-600 hover:bg-red-700"
                                onClick={() => deleteFacility(facility._id)}
                            >
                                Delete
                            </button>
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    )
}

export default ManageFacilityCardActions