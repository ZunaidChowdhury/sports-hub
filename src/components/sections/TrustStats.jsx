import React from 'react';
import SectionHeading from '../shared/SectionHeading';

// Icons using clean, crisp SVGs tailored to match the mockup exactly
const UsersIcon = () => (
    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

const BuildingIcon = () => (
    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5M8.25 21v-10.5A2.25 2.25 0 0110.5 8.25h3a2.25 2.25 0 012.25 2.25V21M6.022 9.348a.75.75 0 101.06 1.06l1.28-1.28a.75.75 0 000-1.061l-1.28-1.28a.75.75 0 00-1.06 1.06l.75.75H4.5A.75.75 0 004 9v.75H6.022zM12 12h.008v.008H12V12zm0 3h.008v.008H12V15zm3-3h.008v.008H15V12zm0 3h.008v.008H15V15z" />
    </svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008z" />
    </svg>
);

const StarIcon = () => (
    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.15-.363.682-.363.832 0l2.54 5.149 5.664.823c.402.058.562.56.273.843l-4.1 4.001 1.012 5.636c.072.404-.354.714-.717.524L12 17.654l-5.068 2.662c-.363.19-.791-.12-.717-.524l1.012-5.636-4.1-4.001c-.29-.282-.13-.784.273-.843l5.664-.823 2.54-5.149z" />
    </svg>
);

const stats = [
    {
        icon: <UsersIcon />,
        iconBg: 'bg-theme-primary', // Precise Emerald-500
        statValue: '10K+',
        valueColor: 'text-theme-primary',
        label: 'Active Users',
    },
    {
        icon: <BuildingIcon />,
        iconBg: 'bg-[#0ea5e9]', // Precise Sky-500
        statValue: '500+',
        valueColor: 'text-[#0ea5e9]',
        label: 'Facilities',
    },
    {
        icon: <CalendarIcon />,
        iconBg: 'bg-[#6366f1]', // Precise Indigo-500
        statValue: '25K+',
        valueColor: 'text-[#6366f1]',
        label: 'Bookings Completed',
    },
    {
        icon: <StarIcon />,
        iconBg: 'bg-[#f59e0b]', // Precise Amber-500
        statValue: '4.9/5',
        valueColor: 'text-[#f59e0b]',
        label: 'User Rating',
    },
];

export default function TrustStats() {
    return (

        <section className="relative w-full bg-theme-background  py-30 text-white overflow-hidden">
            <div className="max-w-358 px-6 mx-auto relative z-10">

                {/* Header Section */}
                <SectionHeading
                    title='Trusted by Thousands'
                    description='Join the growing community of sports enthusiasts'
                    dark={true}
                    classNames='pb-16' />

                {/* Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="card group bg-[#0d1e3d]/40   rounded-xl p-8 py-9 flex flex-col items-center text-center transition-all duration-300  hover:-translate-y-1"
                        >
                            {/* Smooth Rounded Square Icon Base */}
                            <div className={`w-14 h-14 rounded-2xl text-white ${stat.iconBg} mb-7 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105`}>
                                {stat.icon}
                            </div>

                            {/* Stat Numbers */}
                            <h3 className={`text-4xl font-extrabold tracking-tight mb-3 ${stat.valueColor}`}>
                                {stat.statValue}
                            </h3>

                            {/* Sub descriptive Typography */}
                            <p className="text-sm font-medium text-neutral-400 tracking-wide">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
