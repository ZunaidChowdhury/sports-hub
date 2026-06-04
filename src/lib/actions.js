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
        return { success: true };
    }
    catch (error) {
        console.log('Could not add facility, error: '.error)
        return { success: false, error: 'Could not add facility.' };
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
        console.log('deleteFacility/deletedCount: ', deletedCount)
        revalidatePath('/manage-facilities');
    }
    return data;
}
