import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { logout } = useAuthContext()
    const navigate = useNavigate()

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    const handleNavigate = (path) => {
        navigate(path)
        setIsOpen(false)
    }

    const handleLogout = () => {
        alert('Logged Out')
        setTimeout(() => {
            logout()
            navigate('/Login')
        }, 300)
        setIsOpen(false)
    }

    return (
        <div className="relative inline-block text-left ">
            <div>
                <button
                    onClick={handleToggle}
                    className="inline-flex group justify-center items-center w-12 h-12 p-1 rounded-full border border-gray-300 shadow-sm bg-sky-600 hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <img src={'/Profile.png'} className=' w-full h-full rounded-full'></img>
                </button>
            </div>

            {isOpen && (
                <div className="origin-top-right absolute right-0 z-50 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button
                            onClick={() => handleNavigate('/MyProjects')}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            role="menuitem"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => handleNavigate('/')}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            role="menuitem"
                        >
                            Landing Page
                        </button>
                        <button
                            onClick={() => handleNavigate('/MyAccount')}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            role="menuitem"
                        >
                            My Account
                        </button>
                        <button
                            onClick={() => handleNavigate('/MyCredits')}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            role="menuitem"
                        >
                            My Credits
                        </button>
                        <button
                            onClick={handleLogout}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            role="menuitem"
                        >
                            Log Out <label htmlFor="Logout" className='absolute right-4'><box-icon name='log-out-circle' color="gray" ></box-icon></label>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dropdown
