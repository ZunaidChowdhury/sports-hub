'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import FacilityCard from '../cards/FacilityCard'

const AllFacilities = ({ initialFacilities, searchParams, sportTypes }) => {
    const router = useRouter()
    const searchParamsObj = useSearchParams()

    const [facilities, setFacilities] = useState(initialFacilities || [])
    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState(searchParamsObj.get('search') || '')
    const [sportsType, setSportsType] = useState(searchParamsObj.get('type') || '')

    // Get unique sports types from initial facilities
    const sportsTypes = useMemo(() => {
        const types = new Set()
        initialFacilities.forEach((facility) => {
            if (facility.sportsType) types.add(facility.sportsType)
        })
        return Array.from(types).sort()
    }, [initialFacilities])

    // Fetch filtered facilities from server
    const fetchFilteredFacilities = async (query='', type='') => {
        setIsLoading(true)
        try {
            const params = new URLSearchParams()
            if (query) params.append('searchQuery', query)
            if (type) params.append('sportsType', type)

            console.log('test/params: ', params.toString());
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/search-facilities?${params.toString()}`
            )
            const data = await res.json()
            console.log('test/fetchUrl: ', `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/search-facilities?${params.toString()}`);
            console.log('test/data: ', data);
            setFacilities(data)
        } catch (error) {
            console.error('Error fetching facilities:', error)
        } finally {
            setIsLoading(false)
        }
    }

    // Handle search input change
    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearchQuery(value)

        // Update URL params
        const params = new URLSearchParams()
        if (value) params.set('search', value)
        if (sportsType) params.set('type', sportsType)
        router.push(`?${params.toString()}`)
    }

    // Handle sports type filter change
    const handleSportsTypeChange = (e) => {
        const value = e.target.value
        setSportsType(value)

        // Update URL params
        const params = new URLSearchParams()
        if (searchQuery) params.set('search', searchQuery)
        if (value) params.set('type', value)
        router.push(`?${params.toString()}`)
    }

    // Fetch data when URL params change
    useEffect(() => {
        fetchFilteredFacilities(searchQuery, sportsType)
    }, [searchQuery, sportsType])

    return (
        <div>
            {/* search and filter section */}
            <div className='flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mt-6'>
                {/* Search box */}
                <div
                    className="flex items-center w-full md:flex-1 h-11 border border-[#e4e4e7FF] rounded-sm p-4 focus-within:border-theme-primary transition-all duration-300"
                >
                    {/* Search Icon */}
                    <svg
                        className="w-6 h-6 text-text-secondary mr-1 flex-shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </svg>

                    {/* Input Field */}
                    <input
                        value={searchQuery}
                        onChange={handleSearchChange}
                        type="text"
                        placeholder="Search facilities by name..."
                        className="w-full text-lg font-normal border-none focus:outline-none text-text-primary placeholder-text-secondary"
                    />
                </div>

                {/* Sports Type Filter Dropdown */}
                <select
                    value={sportsType}
                    onChange={handleSportsTypeChange}
                    className="w-full md:w-60 px-3 h-11 border capitalize border-[#e4e4e7FF] rounded-sm focus:border-theme-primary focus:outline-none transition-all duration-300 bg-white text-text-primary appearance-none bg-no-repeat bg-right"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                        backgroundPosition: 'right 0.5rem center',
                    }}
                >
                    <option value="">All Sports Types</option>
                    {sportTypes.map((type) => (
                        <option key={type} value={type} className='capitalize'>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            {/* content */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-10'>
                {isLoading ? (
                    <div className='col-span-full text-center py-12'>
                        <p className='text-text-secondary text-lg'>Loading facilities...</p>
                    </div>
                ) : facilities.length > 0 ? (
                    facilities.map((facility) => (
                        <FacilityCard key={facility._id} facility={facility} />
                    ))
                ) : (
                    <div className='col-span-full text-center py-12'>
                        <p className='text-text-secondary text-lg'>
                            No facilities found matching your criteria.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllFacilities