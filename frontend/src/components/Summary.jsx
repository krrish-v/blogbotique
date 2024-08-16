import React from 'react'
import { useAppContext } from '../contexts/AppContext'

const Summary = () => {
    const { summary, setSummary } = useAppContext()

    const handleChange = (e) => {
        const newText = e.target.value
        setSummary(newText)
        onTextChange(newText)
    }

    return (
        <div className='py-5 relative h-full w-full p-10 flex flex-col justify-center '>
            <h2 className="py-1 font-poppins font-semibold text-md tracking-wide">Summary</h2>
            <div>
                <textarea
                    value={summary}
                    onChange={handleChange}
                    className="pb-6 whitespace-pre-wrap font-poppins text-[12px] w-full h-fit rounded-lg p-2 resize-none focus:outline-none scroll-container"
                />
            </div>
        </div>
    )
}

export default Summary
