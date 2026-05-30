import React from 'react';
import SectionHeading from '../shared/SectionHeading';


const QuoteIcon = () => (
    <svg xmlns="http://w3.org" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
);


const StarIcon = () => (
    <svg xmlns="http://w3.org" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-[#f59e0b]">
        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z" />
    </svg>
);

const testimonials = [
    {
        quote: '"Sports Hub made booking our weekly football matches so much easier. The platform is intuitive, and the facilities are top-notch!"',
        name: 'David Kim',
        role: 'Football Enthusiast',
        avatar: '/assets/su1.png',
    },
    {
        quote: '"I love how I can see real-time availability and book courts instantly. The payment process is secure and seamless."',
        name: 'Michael Chen',
        role: 'Badminton Player',
        avatar: '/assets/su2.png',
    },
    {
        quote: '"As a swimming coach, I need reliable booking for my classes. Sports Hub never disappoints. Highly recommend!"',
        name: 'Alex Rivera',
        role: 'Swimming Coach',
        avatar: '/assets/su5.png',
    },
];

export default function Testimonials() {
    return (
        <section className="bg-foreground py-20">
            <div className="max-w-358 px-4 mx-auto">
                {/* Header Section */}
                <SectionHeading
                    title="What Our Users Say"
                    description="Don't just take our word for it - hear from our community"
                />

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="card relative bg-base-100 border border-neutral-100 rounded-3xl p-8 pt-10 pb-9 flex flex-col justify-between shadow-md transition-all duration-300 hover:shadow-lg"
                        >

                            <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-theme-primary text-white flex items-center justify-center shadow-sm">
                                <QuoteIcon />
                            </div>

                            <div>
                                <div className="flex items-center gap-0.5 mb-5">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon key={i} />
                                    ))}
                                </div>
                                <p className="text-[15px] italic font-medium text-neutral-500 leading-relaxed text-left mb-8">
                                    {testimonial.quote}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover border border-neutral-100 shadow-2xs"
                                />
                                <div className="text-left">
                                    <h4 className="text-base font-bold text-neutral-900 leading-tight">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-xs font-medium text-neutral-400 mt-1">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
