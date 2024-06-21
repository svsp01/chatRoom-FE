import React from 'react'
import { useNavigate } from 'react-router-dom'

function NavBar({ username }: any) {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('userId')
        navigate('/login')
    }

    return (
        <nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-white text-2xl font-bold">Chat Room</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="text-white mr-4">
                            Welcome, <span className="font-semibold">{username}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform  hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        >
                            Leave Chat
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar