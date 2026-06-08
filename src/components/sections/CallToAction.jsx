import Link from 'next/link';
import React from 'react';

export default function CallToAction() {
    return (
        <section className="relative w-full bg-theme-background bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-[#0a274c] via-[#04132d] to-[#030f26] py-12 tablet:py-30 text-white overflow-hidden text-center">

            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#1e2d4a_1px,transparent_1px),linear-gradient(to_bottom,#1e2d4a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="max-w-358 px-6 mx-auto relative z-10 flex flex-col items-center">

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 max-w-3xl leading-[1.15]">
                    Ready to Book Your <br />
                    <span className="bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] bg-clip-text text-transparent">
                        Next Match?
                    </span>
                </h2>

                <p className="text-sm sm:text-base text-neutral-400 font-normal max-w-xl mb-12 leading-relaxed tracking-wide">
                    Join thousands of sports enthusiasts who trust Sports Hub for their facility bookings
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto px-4 sm:px-0">
                    <Link href='/all-facilities' className="btn bg-green-600 min-w-55 hover:bg-green-700 text-white font-semibold border-none rounded-xl px-8 h-14 min-h-14 shadow-lg shadow-emerald-500/10 transition-all duration-300 gap-2 text-base group">
                        Explore Facilities
                        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>

                    <button className="btn min-w-55 bg-[#0d1e3d]/40 hover:bg-[#0d1e3d]/80 text-white font-semibold border border-[#1e2d4a]/80 hover:border-[#2b3e64] rounded-xl px-8 h-14 min-h-14 transition-all duration-300 text-base">
                        Learn More
                    </button>
                </div>

            

            </div>
        </section>
    );
}
