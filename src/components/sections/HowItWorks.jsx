import React from 'react';
import SectionHeading from '../shared/SectionHeading';

const SearchIcon = () => (
    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.602 10.602z" />
    </svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
    </svg>
);

const CheckCircleIcon = () => (
    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const PlayIcon = () => (
    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 fill-current">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
    </svg>
);

const steps = [
    {
        stepNumber: '01',
        icon: <SearchIcon />,
        iconBg: 'bg-theme-primary',
        badgeBg: 'bg-theme-primary',
        lineColor: 'after:bg-emerald-500',
        title: 'Search Facility',
        description: 'Browse through our extensive list of premium sports facilities near you',
    },
    {
        stepNumber: '02',
        icon: <CalendarIcon />,
        iconBg: 'bg-sky-500',
        badgeBg: 'bg-sky-500',
        lineColor: 'after:bg-sky-500',
        title: 'Choose Time Slot',
        description: 'Select your preferred date and time from available slots in real-time',
    },
    {
        stepNumber: '03',
        icon: <CheckCircleIcon />,
        iconBg: 'bg-violet-600',
        badgeBg: 'bg-violet-600',
        lineColor: 'after:bg-amber-700/30',
        title: 'Confirm Booking',
        description: 'Complete your booking with secure payment and instant confirmation',
    },
    {
        stepNumber: '04',
        icon: <PlayIcon />,
        iconBg: 'bg-amber-500',
        badgeBg: 'bg-amber-500',
        lineColor: '', // Last step has no connecting line
        title: 'Play Your Game',
        description: 'Show up at the facility and enjoy your game without any hassle',
    },
];

export default function HowItWorks() {
    return (
        <section className="py-30">
            <div className="max-w-358 px-4 mx-auto">
                {/* Header Section */}
                <SectionHeading
                    title="How It Works"
                    description="Book your sports facility in 4 simple steps"
                />

                {/* Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="card relative bg-base-100 border border-neutral-100 rounded-2xl shadow-md px-8 py-20 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg"
                        >
                            {/* Floating Step Number Badge */}
                            <div className={`absolute -top-4 left-1/2 -translate-x-1/2 text-base font-bold text-white w-12 h-12 flex items-center justify-center rounded-full ${step.badgeBg} shadow-xs z-10`}>
                                {step.stepNumber}
                            </div>


                            {/* Square Rounded Icon Box */}
                            <div className={`p-4 rounded-2xl text-white ${step.iconBg} mb-6 shadow-xs flex items-center justify-center`}>
                                {step.icon}
                            </div>

                            {/* Text Content Block */}
                            <h3 className="text-xl font-bold text-neutral-900 mb-3">
                                {step.title}
                            </h3>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
