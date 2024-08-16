import React, { useEffect } from 'react'

const Popup = ({ message, show, onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose()
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [show, onClose])

    return (
        <div
            className={`fixed top-0 left-1/2 transform -translate-x-1/2 mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg transition-all duration-500 ease-in-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
                }`}
            style={{ zIndex: 1000 }}
        >
            {message}
        </div>
    )
}

export default Popup
