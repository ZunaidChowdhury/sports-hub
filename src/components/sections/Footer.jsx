import { GraduationCap, Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"



const Footer = () => {
    return (

        <footer className="text-foreground">
            <div className="bg-theme-background py-12 tablet:py-30">
                <div className="w-full max-w-358 px-4 mx-auto grid grid-cols-1  sm:grid-cols-[2fr_2fr]  md:grid-cols-[2.5fr_2fr_1fr] lg:grid-cols-[2.5fr_2fr_1fr_1fr_1fr] gap-16 ">
                    {/* col 1 */}
                    <div className="text-white">
                        <Link href='/' className="flex items-center gap-2">
                            <Image
                                src='/assets/sports-hub-logo.png'
                                alt='Sports Hub logo'
                                width={60}
                                height={60} />
                            <span className='text-2xl font-semibold'>Sports <span className='text-theme-primary'>Hub</span></span></Link>
                        <p className='text-lg opacity-60'>
                            A premier booking platform for reserving<br/> top-tier sports facilities, 
                            courts, and turfs seamlessly.
                        </p>
                        
                        {/* social icons container  */}
                        <div className='flex items-center gap-3 mt-6'>
                            {/* tt  */}
                            <a href='#' className='w-fit p-2.5 bg-white rounded-full'>
                                <img src={`/assets/twitter.png`} />
                            </a>
                            {/* insta  */}
                            <a href='#' className='w-fit p-2.5 bg-white rounded-full'>
                                <img src={`/assets/instagram.png`} />
                            </a>
                            {/* fb  */}
                            <a href='#' className='w-fit p-2.5 bg-white rounded-full'>
                                <img src={`/assets/facebook.png`} />
                            </a>
                        </div>
                    </div>
                    {/* col 2 */}
                    <nav className='  text-white space-y-3'>
                        <h6 className="text-xl font-semibold opacity-100">Contact Info</h6>
                        <p className="flex items-center gap-2 opacity-60"><Mail />support@sportshub.com</p>
                        <p className="flex items-center gap-2 opacity-60"><Phone />+880 1234-567890</p>
                        <p className="flex items-center gap-2 opacity-60"><MapPin />123 Sports Avenue, Dhaka</p>
                    </nav>

                    <nav className=' text-white space-y-3 flex flex-col'>
                        <h6 className="text-xl font-semibold opacity-100">Quick Links</h6>
                        <a className="link link-hover opacity-60 hover:opacity-100 transform-all duration-300">Home</a>
                        <a className="link link-hover opacity-60 hover:opacity-100 transform-all duration-300">All Facilities</a>                        
                        <a className="link link-hover opacity-60 hover:opacity-100 transform-all duration-300">About Us</a>
                    </nav>

                    <nav className=' text-white space-y-3 flex flex-col'>
                        <h6 className="text-xl font-semibold opacity-100">Support</h6>
                        <a className="link link-hover opacity-60 hover:opacity-100 transform-all duration-300">Help Center</a>
                        <a className="link link-hover opacity-60 hover:opacity-100 transform-all duration-300">How It Works</a>
                        <a className="link link-hover opacity-60 hover:opacity-100 transform-all duration-300">FAQs</a>
                        <a className="link link-hover opacity-60 hover:opacity-100 transform-all duration-300">Refund Policy</a>
                    </nav>
                    <nav className=' text-white space-y-3 flex flex-col'>
                        <h6 className="text-xl font-semibold opacity-100 ">Legal</h6>
                        <a className="link link-hover opacity-60 hover:opacity-100 transform-all duration-300">Terms & Conditions</a>
                        <a className="link link-hover opacity-60 hover:opacity-100 transform-all duration-300">Privacy Policy</a>
                    </nav>

                </div>
            </div>

            <div className='bg-black text-gray-100 text-center py-3 text-lg '>
                <span className="opacity-60">&copy; {new Date().getFullYear()} Sports Hub. All rights reserved.</span>
            </div>
        </footer>

    )
}

export default Footer



// <div>
//     <div className="bg-[#101828]">
//         <footer className="grid grid-cols-8 w-full max-w-7xl mx-auto   text-white   ">
//             <aside className="col-span-3">
//                 <Link href='/' className="text-3xl font-extrabold flex items-center gap-4">
//                     <GraduationCap
//                         className='text-primary mb-1'
//                         // color="blue"
//                         size={36}
//                         strokeWidth={2}
//                     />
//                     SkillSphere</Link>
//                 <p className='text-lg opacity-60'>
//                     Empowering learners worldwide  <br /> with quality education and industry-leading <br /> courses to achieve goals and shape a<br /> better future.
//                 </p>
//                 {/* social icons container  */}
//                 <div className='flex items-center gap-3 mt-6'>
//                     {/* tt  */}
//                     <a href='#' className='w-fit p-2.5 bg-background rounded-full'>
//                         <img src={`/twitter.png`} />
//                     </a>
//                     {/* insta  */}
//                     <a href='#' className='w-fit p-2.5 bg-background rounded-full'>
//                         <img src={`/instagram.png`} />
//                     </a>
//                     {/* fb  */}
//                     <a href='#' className='w-fit p-2.5 bg-background rounded-full'>
//                         <img src={`/facebook.png`} />
//                     </a>
//                 </div>
//             </aside>
//             <nav className='text-lg col-span-2'>
//                 <h6 className="footer-title capitalize opacity-100 ">Contact Info</h6>
//                 <p className="flex items-center  gap-2 opacity-60"><Mail />support@skillsphere.com</p>
//                 <p className="flex items-center  gap-2  opacity-60"><Phone />+1 (555) 123-4567</p>
//                 <p className="flex items-center  gap-2  opacity-60"><MapPin />123 Learning St, Tech City</p>
//             </nav>
//             <nav className='text-lg col-span-1'>
//                 <h6 className="footer-title capitalize opacity-100 ">Quick Links</h6>
//                 <a className="link link-hover opacity-60 hover:opacity-100 transform-all duration-300">Home</a>
//                 <a className="link link-hover opacity-60 hover:opacity-100 transform-all duration-300">Courses</a>
//                 <a className="link link-hover opacity-60 hover:opacity-100 transform-all duration-300">My Profile</a>
//                 <a className="link link-hover opacity-60 hover:opacity-100 transform-all duration-300">About Us</a>
//             </nav>
//             <nav className='text-lg col-span-1'>
//                 <h6 className="footer-title capitalize opacity-100">Support</h6>
//                 <a className="link link-hover opacity-60 hover:opacity-100 transform-all duration-300">Help Center</a>
//                 <a className="link link-hover opacity-60 hover:opacity-100 transform-all duration-300">FAQs</a>
//                 <a className="link link-hover opacity-60 hover:opacity-100 transform-all duration-300">Refund Policy</a>
//             </nav>
//             <nav className='text-lg col-span-1'>
//                 <h6 className="footer-title capitalize opacity-100 hover:opacity-100 transform-all duration-300">Legal</h6>
//                 <a className="link link-hover opacity-60 hover:opacity-100 transform-all duration-300">Terms & Conditions</a>
//                 <a className="link link-hover opacity-60 hover:opacity-100 transform-all duration-300">Privacy Policy</a>
//             </nav>


//         </footer>
//     </div>

// </div>