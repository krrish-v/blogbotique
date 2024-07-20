import React from 'react'

const CodeDisplay = ({ code }) => {
    return (
        <div className='px-10'>
            <div className="px-10 h-full w-full overflow-y-auto p-4 bg-black text-white font-mono text-sm rounded-lg overflow-x-auto">
                <pre className="whitespace-pre-wrap overflow-y-auto">
                    {code}
                </pre>
            </div>
        </div>
    )
}

export default CodeDisplay
