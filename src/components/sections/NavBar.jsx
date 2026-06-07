'use client'
import { Bookmark, ChevronDown, LayoutGrid, LogIn, LogOut, Moon, PlusCircle, Sun, UserPlus } from 'lucide-react'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ThemeContext } from '@/context/theme-context'

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
    const { theme, toggleTheme } = useContext(ThemeContext)
    const [profileMenuOpen, setProfileMenuOpen] = useState(false)
    const profileMenuRef = useRef(null)
    const centerLinks = user ? navLinks : navLinks.filter((item) => item.path === '/' || item.path === '/all-facilities')

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

    useEffect(() => {
        setProfileMenuOpen(false)
    }, [pathname])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuOpen && profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setProfileMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [profileMenuOpen])

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
                                    <li><Link href='/log-in' className="mt-4 px-3 border-none shadow-none rounded-lg xs:hidden w-full flex items-center justify-start gap-2 mr-4 btn text-base font-semibold text-text-primary">
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
                            centerLinks.map((item, i) => (
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
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="btn  text-theme-primary hover:text-theme-primary bg-transparent border-none  shadow-none mr-4"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
                    </button>
                    {
                        isPending ? <><span className="loading loading-bars loading-md"></span></> : <>
                            {
                                user ? <div className='flex items-center gap-3'>
                                    <p className='hidden tablet:inline-flex text-text-primary text-lg'>
                                        <Link href='#'>
                                            <span className='text-text-white text-lg font-semibold ml-2'>{user?.name.split(' ')[0]}</span>
                                        </Link>
                                    </p>
                                    <div ref={profileMenuRef} className='relative inline-block'>
                                        <button
                                            type='button'
                                            onClick={() => setProfileMenuOpen((prev) => !prev)}
                                            className='relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-theme-surface p-0 shadow-sm transition hover:border-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary'
                                            aria-label='Open profile menu'
                                        >
                                            <img
                                                src={user?.image}
                                                alt='Profile'
                                                className='h-10 w-10 rounded-full object-cover'
                                            />
                                            <ChevronDown className='absolute -right-0.5 -bottom-0.5 h-4 w-4 text-theme-primary bg-theme-background rounded-full p-0.5' />
                                        </button>

                                        {profileMenuOpen && (
                                            <ul className='absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-zinc-800 bg-theme-background shadow-2xl'>
                                                <li>
                                                    <Link
                                                        href='/my-bookings'
                                                        onClick={() => setProfileMenuOpen(false)}
                                                        className='flex items-center gap-3 px-4 py-3 text-base font-medium text-text-white hover:bg-zinc-900'
                                                    >
                                                        <Bookmark className='h-5 w-5 text-theme-primary' />
                                                        My Bookings
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href='/add-facility'
                                                        onClick={() => setProfileMenuOpen(false)}
                                                        className='flex items-center gap-3 px-4 py-3 text-base font-medium text-text-white hover:bg-zinc-900'
                                                    >
                                                        <PlusCircle className='h-5 w-5 text-theme-primary' />
                                                        Add Facility
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        href='/manage-facilities'
                                                        onClick={() => setProfileMenuOpen(false)}
                                                        className='flex items-center gap-3 px-4 py-3 text-base font-medium text-text-white hover:bg-zinc-900'
                                                    >
                                                        <LayoutGrid className='h-5 w-5 text-theme-primary' />
                                                        Manage Facilities
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={() => {
                                                            setProfileMenuOpen(false)
                                                            handleLogOut()
                                                        }}
                                                        className='flex w-full items-center gap-3 px-4 py-3 text-left text-base font-medium text-text-white hover:bg-zinc-900 cursor-pointer'
                                                    >
                                                        <LogOut className='h-5 w-5 text-theme-primary' />
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        )}
                                    </div>

                                </div> : <>
                                    <Link href='/log-in' className="hidden xs:flex items-center gap-2 rounded-lg  mr-4 btn text-base font-semibold text-black shadow-none border-none">
                                        <LogIn />Log in</Link>
                                    <Link href='/register' className="rounded-lg hidden xl:flex items-center gap-2 mr-4 btn text-base font-semibold bg-green-600 shadow-none border-none hover:bg-green-700 text-white">
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