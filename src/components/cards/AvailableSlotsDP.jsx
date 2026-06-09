'use client'

import { LuClock4 } from "react-icons/lu"


const AvailableSlotsDP = () => {
    return (
        <div className="card bg-foreground shadow-md p-6 rounded-xl flex flex-col justify-center">
            <span className="text-sm font-medium uppercase flex items-center gap-2 text-text-secondary"><LuClock4 className='w-5 h-5 text-theme-primary' /> Slots</span>
            <span className="text-lg font-semibold tracking-normal mt-1 text-text-primary">{Math.floor(Math.random() * 7) + 6} available</span>
        </div>
    )
}

export default AvailableSlotsDP