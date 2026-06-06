import { headers } from "next/headers";
import { auth } from "./auth";

export const getFeaturedFacilities = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/featured-facilities`);
    const data = await res.json();
    return data;
}
export const getFacilities = async (search = '', type = '') => {
    const newSearchParams = new URLSearchParams()
    if (search) newSearchParams.set('searchQuery', search)
    if (type) newSearchParams.set('sportsType', type)

    let res = null;
    if (newSearchParams.toString()) {
        res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/facilities?${newSearchParams.toString()}`);
    }
    else {
        res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/facilities`);
    }

    const data = await res.json();
    // console.log('data: ', data);
    return data;
}

export const getUserAddedFacilities = async () => {

    const { token } = await auth.api.getToken({
        headers: await headers()
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/manage-facilities`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    const data = await res.json();
    return data;
}

export const getSpecificFacility = async (facilityId) => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/all-facilities/${facilityId}`);

    const data = await res.json();
    return data;
}

export const getUserBookings = async () => {

    const { token } = await auth.api.getToken({
        headers: await headers()
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/my-bookings`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    const data = await res.json();
    return data;
}