import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

export async function proxy (request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if(session){
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/log-in', request.url))
}


export const config = {
    // requires sign in for listed pages.
    matcher: ['/my-bookings', '/add-facility', '/manage-facilities', '/all-facilities/:path'],
}