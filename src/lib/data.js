export const getFeaturedFacilities = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/featured-facilities`);
    const data = await res.json();
    return data;
}
export const getFacilities = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/facilities`);
    const data = await res.json();
    return data;
}
