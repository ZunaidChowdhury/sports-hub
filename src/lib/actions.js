'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { headers } from "next/headers";


export const addFacility = async (formData) => {

    try {
        // const newFacility = Object.fromEntries(formData);
        const newFacility = formData;
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/facilities`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newFacility)
        });


        const data = await res.json();
        // console.log('response in action, data: ', data);


        // if (data.insertedId) {
        //     revalidatePath('/');
        // }
        return { success: true, data };
    }
    catch (error) {
        console.log('Could not add facility, error: ', error);
        return { success: false, error: 'Could not add facility.' };
    }

}


export const updateFacility = async (formData) => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    try {
        const { id, ...updatedFacility } = formData;

        if (!id) {
            return { success: false, error: 'Facility ID is required' };
        }

        // console.log('id: ', id, ' updatedFacility: ', updatedFacility)
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/manage-facilities/edit/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedFacility)
        });
        const data = await res.json();
        // console.log('data: ', data)

        if (data.modifiedCount > 0) {
            revalidatePath('/manage-facilities');
            // redirect('/manage-facilities')
            return { success: true };
        }
        return { success: false, error: 'Could not update facility' };
    } catch (error) {
        console.log('Could not update facility, error: ', error);
        return { success: false, error: 'Could not update facility.' };
    }
}



export const deleteFacility = async (facilityId) => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    console.log('deleteFacility/facilityId: ', facilityId)
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/manage-facilities/delete/${facilityId}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`
        },
    });
    const data = await res.json();
    console.log('deleteFacility/data: ', data)
    if (data.deletedCount > 0) {
        console.log('deleteFacility/deletedCount: ', data.deletedCount)
        revalidatePath('/manage-facilities');
    }
    return data;
}


export const addBooking = async (formData) => {

    try {
        const { token } = await auth.api.getToken({
            headers: await headers()
        })

        // const newFacility = Object.fromEntries(formData);
        const newBooking = formData;
        console.log('client/actoins/newBooking: ', newBooking)
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newBooking)
        });


        const data = await res.json();
        console.log('client/actoins/data: ', data)


        // if (data.insertedId) {
        //     revalidatePath('/');
        // }
        return { success: true, data };
    }
    catch (error) {
        console.log('Could not add booking, error: ', error);
        return { success: false, error: 'Could not add booking.' };
    }

}