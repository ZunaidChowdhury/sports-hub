'use client'
import { GraduationCap, LogIn, LogOut, UserPlus } from 'lucide-react'
import React from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { useRouter } from "next/navigation";
import { authClient } from '@/lib/auth-client'
import { toast } from 'react-toastify'
import Image from 'next/image'

const linkParentActiveStyle = 'border-l-4 lg:border-l-0 lg:border-b-4 border-theme-primary'
const linkStyle = 'px-4 py-2 lg:py-1.5 lg:px-3 text-base font-semibold hover:bg-transparent hover:text-theme-primary transition-colors duration-300'
const linkActiveStyle = 'text-theme-primary'

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Facilities', path: '/all-facilities' },
    { name: 'My Bookings', path: '/my-bookings' },
    { name: 'Add Facility', path: '/add-facility' },
    { name: 'Manage Facilities', path: '/manage-facilities' },
];

const NavBar = () => {
    const router = useRouter();
    const pathname = usePathname()
    const { data, isPending } = authClient.useSession()
    const user = data?.user;
    const handleLogOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/log-in");
                    toast.success("Logged out!", { autoClose: 3000, });
                },
            },
        });
    }
    return (
        <div className='sticky top-0 z-100 bg-theme-background text-text-white border-b border-zinc-900'>
            <div className="navbar bg-theme-background max-w-350 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="bg-theme-background menu menu-sm dropdown-content  rounded-box z-1 mt-3 w-52 p-2 shadow text-base font-semibold" >

                            {
                                navLinks.map((item, i) => (
                                    <li key={i} className={`${pathname === item.path ? linkParentActiveStyle : ''}`}>
                                        <Link href={item.path}
                                            className={`${linkStyle} ${pathname === item.path ? linkActiveStyle : ''}`}>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))
                            }

                            {
                                user ? <button onClick={handleLogOut} className="mt-4 px-3 border-none shadow-none inline-flex md:hidden rounded-lg btn  text-base font-semibold text-text-primary">
                                    <LogOut />Log out</button> :
                                    <li><Link href='/log-in' className="mt-4 px-3 border-none shadow-none rounded-lg xs:hidden w-full flex items-center justify-start gap-2 mr-4 btn text-base font-semibold text-text-primary text-foreground">
                                        <LogIn />Log in</Link></li>
                            }

                        </ul>
                    </div>
                    <Link href='/' className="flex items-center gap-2">
                        <Image
                            src='/assets/sports-hub-logo.png'
                            alt='Sports Hub logo'
                            width={40}
                            height={40} />
                        <span className='text-xl font-semibold'>Sports <span className='text-theme-primary'>Hub</span></span></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-base font-semibold ">
                        {
                            navLinks.map((item, i) => (
                                <li key={i} className={`${pathname === item.path ? linkParentActiveStyle : ''}`}>
                                    <Link href={item.path} className={`${linkStyle} ${pathname === item.path ? linkActiveStyle : ''}`}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="navbar-end ">
                    {
                        isPending ? <><span className="loading loading-bars loading-md"></span></> : <>
                            {
                                user ? <div className='flex items-center gap-3'>
                                    <p className='hidden tablet:inline-flex text-text-primary text-lg'>
                                        <Link href='/user/profile'>
                                            <span className='text-text-white text-lg font-semibold ml-2'>{user?.name}</span>
                                        </Link>
                                    </p>
                                    <div className='group relative inline-block'>

                                        <Link href='/user/profile'>
                                            <img
                                                src={user?.image}
                                                alt="Profile"
                                                className='w-10 h-10 rounded-full object-cover hover:opacity-90 transition-opacity'
                                            />
                                        </Link>

                                        {
                                            // <div className='hidden group-hover:block absolute top-full right-0 z-50'>
                                            //     <div onClick={handleLogOut} className='bg-white shadow-xl border border-zinc-200 rounded-lg py-3 px-6 whitespace-nowrap text-base font-medium text-gray-700 hover:bg-gray-50 cursor-pointer'>
                                            //         Log out
                                            //     </div>
                                            // </div>
                                        }
                                    </div>
                                    <button onClick={handleLogOut} className="hidden md:inline-flex rounded-lg btn shadow-none border-none text-base font-semibold text-text-primary">
                                        <LogOut />Log out</button>

                                </div> : <>
                                    <Link href='/log-in' className="hidden xs:flex items-center gap-2 rounded-lg  mr-4 btn text-base font-semibold text-text-primary shadow-none border-none">
                                        <LogIn />Log in</Link>
                                    <Link href='/register' className="rounded-lg hidden xl:flex items-center gap-2 mr-4 btn text-base font-semibold bg-green-600 shadow-none border-none hover:bg-green-700 text-foreground">
                                        <UserPlus />Register</Link>
                                </>
                            }
                        </>

                    }
                </div>
            </div>
        </div>
    )
}

export default NavBar