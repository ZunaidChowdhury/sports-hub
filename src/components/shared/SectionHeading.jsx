import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SectionHeading = ({ title, subTitle, description, actionTxtBtn, actionProperBtn, dark, classNames }) => {
    const ActionProperBtnIcon = actionProperBtn?.icon;
    return (
        < div className={`flex items-center justify-between ${classNames}`} >
            <div>
                {
                    subTitle && <p className='uppercase font-semibold text-green-600 text-sm'>{subTitle}</p>
                }
                <h3 className={`text-2xl md:text-4xl font-semibold mb-3 ${dark === true ? 'text-text-white' : ''}`}>{title}</h3>
                {
                    description && <p className={`text-text-secondary text-lg ${dark === true ? 'text-text-white opacity-60' : ''}`}>
                        {description}
                    </p>
                }
            </div>
            {
                actionTxtBtn && <Link href={actionTxtBtn.url}
                    className="hidden tablet:flex rounded-lg items-center gap-2 mr-4 text-green-600 tablet: hover:text-green-700 transition-colors 
                                duration-300 text-base font-semibold">
                    {actionTxtBtn.text}<ArrowRight />
                </Link>
            }
            {
                actionProperBtn && <Link href={actionProperBtn.url}
                    className="hidden tablet:flex rounded-lg items-center gap-2 mr-4 text-green-600 tablet: hover:text-green-700 transition-colors 
                                duration-300 text-base font-semibold">
                    <button className="btn  rounded-lg text-base font-semibold text-text-white bg-green-600 hover:bg-green-700 ">
                        <ActionProperBtnIcon className="w-5 h-5" />{actionProperBtn.text}
                    </button>
                </Link>
            }
        </div >
    )
}

export default SectionHeading