'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ThemeContext } from '@/context/theme-context'

const sportTypes = [
    { name: 'All Sports Type', value: '' },
    { name: 'Football', value: 'football' },
    { name: 'Badminton', value: 'badminton' },
    { name: 'Swimming', value: 'swimming' },
    { name: 'Tennis', value: 'tennis' },
    { name: 'Bowling', value: 'bowling' },
    { name: 'Basketball', value: 'basketball' },
    { name: 'Baseball', value: 'baseball' },
    { name: 'Volleyball', value: 'volleyball' },
    { name: 'Skating', value: 'skating' },
    { name: 'Climbing', value: 'climbing' },
    { name: 'Other', value: 'other' }
]

const SearchNFilter = () => {
    const { theme } = useContext(ThemeContext)
    const [searchQuery, setSearchQuery] = useState('')
    const [sportTypeState, setSportTypeState] = useState('')

    const [isOpen, setIsOpen] = useState(false);

    // reference for the dropdown container
    const dropdownRef = useRef(null);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleSearch = () => {
        const newSearchParams = new URLSearchParams(searchParams);

        if (searchQuery) newSearchParams.set('search', searchQuery)
        else newSearchParams.delete('search')

        router.push(`${pathname}?${newSearchParams.toString()}`)
    }

    const handleSportsTypeChange = (sportsType) => {
        const newSearchParams = new URLSearchParams(searchParams);

        if (sportsType) newSearchParams.set('type', sportsType)
        else newSearchParams.delete('type')

        router.push(`${pathname}?${newSearchParams.toString()}`)
    }

    const selectedLabel = sportTypes.find((t) => t.value === sportTypeState)?.name || 'All Sports Type'

    return (
        <div className='flex flex-col md:flex-row gap-4 justify-between items-start md:items-center'>
            {/* Search */}
            <div className='w-full md:flex-1'>
                <div className="relative">
                    <svg
                        className='z-1 absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    >
                        <circle cx='11' cy='11' r='8'></circle>
                        <path d='m21 21-4.3-4.3'></path>
                    </svg>

                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        type='text'
                        placeholder='Search...'
                        className={`focus:border-green-600 transition-colors duration-300 input input-bordered w-full pl-12 pr-28 text-lg focus:outline-none focus:ring-0 focus-visible:outline-none ${theme === 'dark' ? 'bg-theme-background border-zinc-800 text-text-white' : 'bg-white border-[#e4e4e7] text-text-primary'}`}
                    />

                    <button
                        type='button'
                        onClick={handleSearch}
                        className='btn btn-primary absolute right-0 top-1/2 -translate-y-1/2 h-10 normal-case focus:outline-none focus:ring-0 bg-green-600 border-none shadow-none'
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Filter */}
            <div ref={dropdownRef} className="relative w-full md:w-60 text-base capitalize">
                <div className="dropdown">
                    <button
                        type="button"
                        onClick={() => setIsOpen((s) => !s)}
                        className={`btn justify-between w-60 ${isOpen ? 'btn-active' : ''} ${theme === 'dark' ? 'bg-theme-background border-zinc-800 text-text-white' : 'bg-white border-[#e4e4e7] text-text-primary'} shadow-none`}
                    >
                        <span className='truncate text-left'>{selectedLabel}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" className="ml-2 fill-current">
                            <path d="M6 9L1 4h10z" />
                        </svg>
                    </button>

                    <ul className={`dropdown-content menu mt-2 p-1 shadow rounded-box w-full ${isOpen ? 'block' : 'hidden'} ${theme === 'dark' ? 'bg-theme-background border-zinc-800 text-text-white' : 'bg-white border-[#e4e4e7] text-text-primary'}`}>
                        {sportTypes.map((type) => (
                            <li key={type.value}>
                                <a
                                    onClick={() => {
                                        handleSportsTypeChange(type.value)
                                        setIsOpen(false)
                                        setSportTypeState(type.value)
                                    }}
                                    className='px-3 py-2 cursor-pointer hover:bg-green-600 hover:text-white'
                                >
                                    {type.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SearchNFilter