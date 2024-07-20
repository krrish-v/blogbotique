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
        <div className='py-5 relative h-svh max-h-32 w-full'>
            <h2 className="py-1 font-poppins font-semibold text-md tracking-wide">Summary</h2>
            <textarea
                value={summary}
                onChange={handleChange}
                className="whitespace-pre-wrap font-poppins text-[12px] w-full h-full max-h-24 border border-gray-300 rounded-lg p-2 resize-none focus:outline-none scroll-container"
            />
        </div>
    )
}

export default Summary
