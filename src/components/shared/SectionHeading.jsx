import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SectionHeading = ({ title, subTitle, actionBtnTitle, actionBtnUrl }) => {
    return (
        < div className='flex items-center justify-between' >
            <div>
                {
                    subTitle && <p className='uppercase font-semibold text-green-600 text-sm'>{subTitle}</p>
                }
                <h3 className='text-2xl md:text-4xl font-semibold'>{title}</h3>
            </div>
            {
                actionBtnTitle && <Link href={actionBtnUrl}
                    className="hidden tablet:flex rounded-lg items-center gap-2 mr-4 text-green-600 tablet: hover:text-green-700 transition-colors 
                                duration-300 text-base font-semibold">
                    {actionBtnTitle}<ArrowRight />
                </Link>
            }
        </div >
    )
}

export default SectionHeading