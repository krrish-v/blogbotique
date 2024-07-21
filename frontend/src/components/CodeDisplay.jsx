import React from 'react'

const CodeDisplay = ({ code }) => {
    return (
        <div className='px-10 h-full w-full overflow-y-auto scroll-smooth scroll-container'>
            <div className="h-full w-full p-4 overflow-auto bg-black text-white font-mono text-sm rounded-lg">
                <pre className="whitespace-pre-wrap overflow-y-auto">
                    {code}
                </pre>
            </div>
        </div>
    )
}

export default CodeDisplay
