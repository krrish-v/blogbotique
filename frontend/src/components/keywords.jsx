import React, { useState } from 'react'
import { useAppContext } from '../contexts/AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const Keywords = ({ keywords }) => {
    const [newKeyword, setNewKeyword] = useState("")
    const { setKeywords } = useAppContext()

    const handleAddKeyword = () => {
        if (newKeyword.trim() !== "") {
            setKeywords((prevKeywords) => [...prevKeywords, newKeyword.trim()])
            setNewKeyword("")
        }
    }

    return (
        <div className='relative h-2/5 w-full overflow-hidden'>
            <h2 className="py-1 font-tommy font-semibold text-md tracking-wider">Keywords</h2>
            <div className="flex flex-wrap gap-2 mt-2 max-h-24 overflow-y-auto scroll-container">
                {keywords && keywords.length > 0 ? (
                    keywords.map((keyword, index) => (
                        <button
                            key={index}
                            className="text-black text-[14px] font-poppins px-4 py-1 rounded-xl border-2 hover:bg-custom-white hover:text-custom-gray transition duration-200"
                        >
                            {keyword}
                        </button>
                    ))
                ) : (
                    <p className="text-gray-500">No keywords available</p>
                )}
            </div>
            <div className="mt-4 relative flex items-center">
                <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-1 pr-10 w-full placeholder-gray-500 focus:outline-none"
                    placeholder="Add a new keyword"
                />
                <button
                    onClick={handleAddKeyword}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 text-black rounded-full hover:bg-gray-200 transition duration-200"
                >
                    <FontAwesomeIcon icon={faCheck} />
                </button>
            </div>
        </div>
    )
}

export default Keywords

