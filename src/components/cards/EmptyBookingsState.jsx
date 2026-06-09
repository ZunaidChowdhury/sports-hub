'use client'

import { useContext } from 'react'
import { ThemeContext } from '@/context/theme-context'
import Link from 'next/link';

export const EmptyBookingsState = ({
    title = "You haven't booked any facility yet",
    description = 'Your upcoming reservations will appear here once you book a court or sports venue.',
    actionLabel = 'Explore Facilities',
    actionHref = '/all-facilities'
}) => {
    const { theme } = useContext(ThemeContext)

    return (
        <div className={`w-full rounded-xl border bg-foreground p-8 text-center shadow-sm backdrop-blur-sm ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'}`}>
            <div className={`mx-auto mb-6 flex h-36 w-36 items-center justify-center rounded-full border ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900/80' : 'border-zinc-200 bg-zinc-100/80'}`}>
                <svg viewBox='0 0 320 320' className='h-24 w-24 text-green-600 dark:text-green-500' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <rect x='54' y='88' width='212' height='144' rx='28' stroke='currentColor' strokeWidth='12' />
                    <path d='M112 140H208' stroke='currentColor' strokeWidth='12' strokeLinecap='round' />
                    <path d='M112 176H160' stroke='currentColor' strokeWidth='12' strokeLinecap='round' />
                    <circle cx='232' cy='228' r='34' fill='currentColor' opacity='0.18' />
                    <path d='M216 228L228 240L248 214' stroke='currentColor' strokeWidth='10' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
            </div>

            <h3 className='mb-3 text-2xl font-semibold tracking-tight text-text-primary'>{title}</h3>
            <p className='mx-auto mb-6 max-w-md text-base leading-7 text-text-secondary'>{description}</p>
            <Link
                href={actionHref}
                className='inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-green-700'
            >
                {actionLabel}
            </Link>
        </div>
    )
}