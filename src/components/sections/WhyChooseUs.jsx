import React from 'react';
import SectionHeading from '../shared/SectionHeading';

// Icons 
const LightningIcon = () => (
    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ShieldIcon = () => (
    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
);

const TrophyIcon = () => (
    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013-3h.375a3 3 0 003-3v-.375a3 3 0 00-3-3H20.25m-3.75 9.75V21m0 0H6.75m9 0v-1.125c0-1.168-.757-2.164-1.84-2.486a26.27 26.27 0 00-3.82 0C10.007 17.711 9.25 18.707 9.25 19.875V21m0 0H3.75m3-9.75V10.5A3 3 0 003.75 7.5H3.375a3 3 0 00-3 3v.375a3 3 0 003 3H6.75m-.75-3c0-3.52 2.613-6.432 6-6.92V2.41a1.125 1.125 0 012.25 0v1.17c3.387.488 6 3.4 6 6.92V10.5" />
    </svg>
);

const features = [
    {
        icon: <LightningIcon />,
        iconBg: 'bg-theme-primary',
        title: 'Instant Booking',
        description: 'Book your favorite sports facility in just a few clicks with real-time confirmation',
    },
    {
        icon: <ClockIcon />,
        iconBg: 'bg-sky-500',
        title: 'Real-Time Availability',
        description: 'See live slot availability and never miss your preferred time slot again',
    },
    {
        icon: <ShieldIcon />,
        iconBg: 'bg-violet-600',
        title: 'Secure Payments',
        description: 'Safe and encrypted payment processing with multiple payment options',
    },
    {
        icon: <TrophyIcon />,
        iconBg: 'bg-amber-500',
        title: 'Multiple Sports Facilities',
        description: 'Access to football turfs, badminton courts, tennis courts, swimming pools, and more',
    },
];

export default function WhyChooseUs() {

    return (
        <section className="bg-theme-background py-20 ">
            <div className='max-w-358 px-4 mx-auto'>
                {/* Header Section */}
                <SectionHeading
                    title='Why Choose Sports Hub'
                    description='Everything you need to book and play at the best sports facilities'
                    dark={true} />

                {/* Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="card bg-[#0d1e3d]/40 border border-[#1e2d4a]/50 hover:bg-[#0d1e3d]/70 hover:border-[#2b3e64] hover:-translate-y-1 rounded-2xl shadow-md p-8 flex flex-col items-start transition-all duration-300 hover:shadow-lg"
                        >
                            {/* Icon Wrapper */}
                            <div className={`p-3 rounded-xl text-white ${feature.iconBg} mb-6`}>
                                {feature.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-bold text-text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-text-white opacity-60 leading-relaxed text-left">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
