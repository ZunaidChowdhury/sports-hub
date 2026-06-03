'use client'

const SlotsLeft = () => {
    return (
        <div className="absolute top-3 right-3 rounded-full text-white bg-theme-primary badge badge-success z-10">
            {Math.floor(Math.random() * 7) + 6} Slots Left
        </div>
    )
}

export default SlotsLeft