'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

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
    const [searchQuery, setSearchQuery] = useState('')
    const [sportTypeState, setSportTypeState] = useState('')

    const [isOpen, setIsOpen] = useState(false);

    // 1. reference for the dropdown container
    const dropdownRef = useRef(null);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();


    useEffect(() => {
        // 2. function to check if click occurred outside the container
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // 3. attach event listener when dropdown opens
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // 4. clean up the listener when dropdown closes or component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);


    const handleSearch = () => {
        // console.log('Search query:', searchQuery)
        const newSearchParams = new URLSearchParams(searchParams);

        if (searchQuery) {
            newSearchParams.set('search', searchQuery);
        } else {
            newSearchParams.delete('search');
        }

        router.push(`${pathname}?${newSearchParams.toString()}`);
    }


    const handleSportsTypeChange = (sportsType) => {
        // console.log('Search query:', searchQuery)
        const newSearchParams = new URLSearchParams(searchParams);

        if (sportsType) {
            newSearchParams.set('type', sportsType);
        } else {
            newSearchParams.delete('type');
        }

        router.push(`${pathname}?${newSearchParams.toString()}`);
    }



    return (
        <div className='flex flex-col md:flex-row gap-4 justify-between items-start md:items-center'>
            {/* search  */}
            <div className='flex items-center w-full md:flex-1 h-11 border border-[#e4e4e7] rounded-sm  focus-within:border-theme-primary transition-all duration-300'>
                <svg
                    className='ml-3 w-6 h-6 text-text-secondary mr-2 flex-shrink-0'
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
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                    type='text'
                    placeholder='Search facilities by name...'
                    className='flex-1 text-lg font-normal border-none focus:outline-none text-text-primary placeholder-text-secondary'
                />

                <button
                    type='button'
                    onClick={handleSearch}
                    className='ml-3 h-11 btn btn-primary text-base bg-green-600 hover:bg-green-700 transition-colors duration-300 border-none shadow-none normal-case'
                >
                    Search
                </button>
            </div>


            {/* filter  */}
            {/* 5. added ref={dropdownRef} here  */}
            <div ref={dropdownRef} className="relative w-full md:w-60 text-base text-text-primary capitalize">
                {/* Dropdown Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="capitalize flex items-center justify-between w-full h-11 px-3 border border-[#e4e4e7] rounded-sm bg-white focus:border-theme-primary focus:outline-none transition-all duration-300"
                >
                    <span>{sportTypeState === '' ? 'All Sports Type' : sportTypeState}</span>
                    {/* Custom Arrow Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" className="fill-[#666]">
                        <path d="M6 9L1 4h10z" />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <ul className="absolute z-2 w-full mt-1 bg-white border border-[#e4e4e7] rounded-sm shadow-lg max-h-60 overflow-auto focus:outline-none">
                        {/* Default Option */}
                        {/* <li
                            onClick={() => {
                                handleSportsTypeChange(sportTypes[0].value);
                                setIsOpen(false);
                            }}
                            className="px-3 py-2 cursor-pointer transition-colors duration-150 hover:bg-green-600 hover:text-white"
                        >
                            All Sports Types
                        </li> */}

                        {/* Mapped Options */}
                        {sportTypes.map((type) => (
                            <li
                                key={type.value}
                                onClick={() => {
                                    handleSportsTypeChange(type.value);
                                    setIsOpen(false);
                                    setSportTypeState(type.value);
                                }}
                                className="px-3 py-2 cursor-pointer transition-colors duration-150 hover:bg-green-600 hover:text-white"
                            >
                                {type.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default SearchNFilter