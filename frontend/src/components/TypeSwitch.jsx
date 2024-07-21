import React from "react"

function SwitchOutput({ selectedContent, onSelect }) {

    const getButtonClasses = (type) => {
        return `py-3 font-semibold font-tommy text-sm ${selectedContent === type ? "text-custom-gray bg-gray-100 border-b-2 border-x-2 px-4 rounded-3xl " : "text-black"
            }`
    }

    return (
        <div className="absolute top-2 z-40 left-9 h-fit w-auto rounded-full border-2 shadow-md ">
            <div className="bg-white rounded-full m-[2px] px-4 space-x-4">
                <button onClick={() => onSelect('text')} className={getButtonClasses('text')}>TEXT</button>
                <button onClick={() => onSelect('html')} className={getButtonClasses('html')}>HTML</button>
                <button onClick={() => onSelect('jsx')} className={getButtonClasses('jsx')}>JSX</button>
            </div>
        </div>
    )
}

export default SwitchOutput