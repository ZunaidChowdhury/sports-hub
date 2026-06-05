'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

import { authClient } from '@/lib/auth-client'


const AddFacilityForm = ({ addFacility, updateFacility, facility }) => {
    const { data } = authClient.useSession()
    const user = data?.user;

    const router = useRouter();
    const isUpdateMode = !!facility;

    const [formData, setFormData] = useState({
        owner: user?.email,
        facilityName: '',
        facilityType: '',
        imageUpload: '',
        location: '',
        pricePerHour: '',
        capacity: '',
        availableTimeSlots: [],
        description: ''
    });

    const [error, setError] = useState(null);
    const [timeSlotInput, setTimeSlotInput] = useState('');
    const [loading, setLoading] = useState(false);

    // Initialize form data when facility is provided (update mode)
    useEffect(() => {
        if (facility) {
            setFormData({
                id: facility._id || facility.id,
                owner: facility.owner || user?.email,
                facilityName: facility.facilityName || '',
                facilityType: facility.facilityType || '',
                imageUpload: facility.imageUpload || '',
                location: facility.location || '',
                pricePerHour: facility.pricePerHour || '',
                capacity: facility.capacity || '',
                availableTimeSlots: facility.availableTimeSlots || [],
                description: facility.description || ''
            });
        } else {
            // Reset form for add mode
            setFormData({
                owner: user?.email,
                facilityName: '',
                facilityType: '',
                imageUpload: '',
                location: '',
                pricePerHour: '',
                capacity: '',
                availableTimeSlots: [],
                description: ''
            });
        }
    }, [facility, user?.email]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddTimeSlot = () => {
        if (timeSlotInput.trim() === '') {
            toast.warning('Please enter a time slot', { autoClose: 2000 });
            return;
        }
        if (formData.availableTimeSlots.includes(timeSlotInput.trim())) {
            toast.warning('This time slot already exists', { autoClose: 2000 });
            return;
        }
        setFormData(prev => ({
            ...prev,
            availableTimeSlots: [...prev.availableTimeSlots, timeSlotInput.trim()]
        }));
        setTimeSlotInput('');
    };

    const handleRemoveTimeSlot = (index) => {
        setFormData(prev => ({
            ...prev,
            availableTimeSlots: prev.availableTimeSlots.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation
        if (!formData.facilityName || !formData.facilityType || !formData.imageUpload || !formData.location || !formData.pricePerHour || !formData.capacity || formData.availableTimeSlots.length === 0 || !formData.description) {
            setError('Please fill in all required fields');
            return;
        }

        if (!user?.email) {
            setError('Unable to proceed at the moment, check your internet.');
            return;
        }

        formData.owner = user.email
        const date = new Date();
        const submitData = { ...formData };

        // Add mode
        if (!isUpdateMode) {
            submitData.createdAt = date;
            submitData.updatedAt = date;
            submitData.rating = parseFloat((Math.random() * 0.5 + 4.4).toFixed(1));
            submitData.ratedBy = Math.floor(Math.random() * 61) + 64;
        } else {
            // Update mode
            submitData.updatedAt = date;
        }

        setLoading(true);
        let response;

        try {
            if (!isUpdateMode && addFacility) {
                response = await addFacility(submitData);
            } else if (isUpdateMode && updateFacility) {
                response = await updateFacility(submitData);
            }

            if (response?.success) {
                router.push('/manage-facilities');
                toast.success(
                    isUpdateMode ? "Facility updated successfully!" : "Facility added successfully!", 
                    { autoClose: 3000 }
                );

                // Reset form
                setFormData({
                    facilityName: '',
                    facilityType: '',
                    imageUpload: '',
                    location: '',
                    pricePerHour: '',
                    capacity: '',
                    availableTimeSlots: [],
                    description: ''
                });
                setTimeSlotInput('');
                setError(null);
            } else {
                toast.error(
                    isUpdateMode ? "Could not update facility." : "Could not add facility.", 
                    { autoClose: 3000 }
                );
            }
        } catch (err) {
            toast.error("An error occurred. Please try again.", { autoClose: 3000 });
            console.error('Submit error:', err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex items-center justify-center bg-base-200 px-4 py-12 tablet:py-20">
            <div className="card border-zinc-200 w-full max-w-5xl bg-base-100 shadow-lg p-8">
                <h1 className="text-3xl font-bold text-base-content mb-2">
                    {isUpdateMode ? 'Update Facility' : 'Add Facility'}
                </h1>
                <p className="text-sm text-base-content/70 mb-6">
                    {isUpdateMode 
                        ? 'Modify details below to update the facility on Sports Hub' 
                        : 'Fill in the details below to add a new facility to Sports Hub'
                    }
                </p>

                <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Facility Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Facility Name <span className="text-error">*</span></span>
                        </label>
                        <input
                            name="facilityName"
                            type="text"
                            placeholder="e.g., Basketball Court"
                            value={formData.facilityName}
                            onChange={handleChange}
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Facility Type Dropdown */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Facility Type <span className="text-error">*</span></span>
                        </label>
                        <select
                            name="facilityType"
                            value={formData.facilityType}
                            onChange={handleChange}
                            className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            required
                        >
                            <option disabled value="">Select a facility type</option>
                            <option value="court">Court</option>
                            <option value="field">Field</option>
                            <option value="gym">Gym</option>
                            <option value="pool">Pool</option>
                            <option value="track">Track</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Image Upload <span className="text-error">*</span></span>
                        </label>
                        <input
                            name="imageUpload"
                            type="text"
                            placeholder="Enter image URL or path"
                            value={formData.imageUpload}
                            onChange={handleChange}
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Location */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Location <span className="text-error">*</span></span>
                        </label>
                        <input
                            name="location"
                            type="text"
                            placeholder="e.g., Downtown Sports Complex"
                            value={formData.location}
                            onChange={handleChange}
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Price Per Hour */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Price Per Hour <span className="text-error">*</span></span>
                        </label>
                        <input
                            name="pricePerHour"
                            type="number"
                            placeholder="e.g., 50"
                            value={formData.pricePerHour}
                            onChange={handleChange}
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>

                    {/* Capacity */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Capacity <span className="text-error">*</span></span>
                        </label>
                        <input
                            name="capacity"
                            type="number"
                            placeholder="e.g., 20"
                            value={formData.capacity}
                            onChange={handleChange}
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            min="1"
                            required
                        />
                    </div>

                    {/* Available Time Slots */}
                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text font-semibold">Available Time Slots <span className="text-error">*</span></span>
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="e.g., 6AM-10PM"
                                value={timeSlotInput}
                                onChange={(e) => setTimeSlotInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddTimeSlot();
                                    }
                                }}
                                className="input input-bordered flex-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                onClick={handleAddTimeSlot}
                                className="btn btn-square btn-outline border-green-500 text-green-500 hover:text-text-white hover:bg-green-700 hover:border-green-500"
                                title="Add time slot"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>

                        {/* Display Time Slots as Chips */}
                        {formData.availableTimeSlots.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {formData.availableTimeSlots.map((slot, index) => (
                                    <div
                                        key={index}
                                        className="badge badge-lg badge-success gap-2 px-3 py-3 text-white cursor-pointer hover:badge-error"
                                        onClick={() => handleRemoveTimeSlot(index)}
                                        title="Click to remove"
                                    >
                                        {slot}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text font-semibold">Description <span className="text-error">*</span></span>
                        </label>
                        <textarea
                            name="description"
                            placeholder="Enter facility description..."
                            value={formData.description}
                            onChange={handleChange}
                            className="textarea textarea-bordered w-full h-24 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                            required
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="alert alert-error md:col-span-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}


                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn col-span-1 md:col-span-2 py-3 text-lg bg-green-600 text-white hover:bg-green-700 border-0 w-full disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                    >
                        {loading 
                            ? (isUpdateMode ? 'Updating Facility...' : 'Adding Facility...') 
                            : (isUpdateMode ? 'Update Facility' : 'Add Facility')
                        }
                    </button>
                </form>

            </div>
        </div>
    )
}

export default AddFacilityForm