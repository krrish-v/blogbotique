import React, { useState } from 'react'
import { useAppContext } from '../contexts/AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const Keywords = ({ keywords }) => {
    const [newKeyword, setNewKeyword] = useState("")
    const { selectedKeywords, setSelectedKeywords } = useAppContext()
    const { setKeywords } = useAppContext()

    const handleAddKeyword = () => {
        if (newKeyword.trim() !== "") {
            const trimmedKeyword = newKeyword.trim()
            setKeywords((prevKeywords) => [...prevKeywords, trimmedKeyword])
            setSelectedKeywords((prevSelected) => [...prevSelected, trimmedKeyword])
            setNewKeyword("")
        }
    }

    const toggleKeywordSelection = (keyword) => {
        setSelectedKeywords((prevSelected) => {
            if (prevSelected.includes(keyword)) {
                return prevSelected.filter(k => k !== keyword)
            } else {
                return [...prevSelected, keyword]
            }
        })
    }

    return (
        <div className='relative mt-8 h-full w-full overflow-hidden'>
            <h2 className="py-1 font-tommy font-semibold text-md tracking-wider">Keywords</h2>
            <div className="flex flex-wrap gap-1 mt-2 max-h-20 overflow-y-auto scroll-container">
                {keywords && keywords.length > 0 ? (
                    keywords.map((keyword, index) => (
                        <button
                            key={index}
                            onClick={() => toggleKeywordSelection(keyword)}
                            className={`text-black text-[12px] font-poppins px-4 py-1 rounded-xl border-2 transition duration-200 ${selectedKeywords.includes(keyword)
                                ? 'border-custom-black bg-custom-gray text-white'
                                : 'hover:bg-custom-white hover:text-custom-gray border-gray-300'
                                }`}
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
