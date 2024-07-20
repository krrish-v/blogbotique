import React from 'react'
import ReactMarkdown from 'react-markdown'

const Summary = ({ text }) => {
    return (
        <div className=' py-5 relative h-2/5 w-full'>
            <h2 className="py-1 font-tommy font-semibold text-md tracking-wider">Summary</h2>
            <ReactMarkdown className="whitespace-pre-wrap font-poppins text-[12px]">
                {text}
            </ReactMarkdown>
        </div>
    )
}

export default Summary