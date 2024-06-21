import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (e: any) => {
        e.preventDefault()
        if (name.trim() === '') {
            setError('Please provide a username')
        } else {
            setIsLoading(true)
            try {
                const response = await axios.post('http://localhost:8000/login', { username: name })
                const { userId, username } = response.data
                localStorage.setItem('userId', userId)
                localStorage.setItem('username', username)
                navigate('/chat')
            } catch (error) {
                setError('Login failed. Please try again.')
                console.error('Login error:', error)
            } finally {
                setIsLoading(false)
            }
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100 px-4 py-8'>
            <div className='w-full max-w-md'>
                <form onSubmit={handleLogin} className='bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4'>
                    <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Login</h2>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                            Username
                        </label>
                        <input
                            id='username'
                            type='text'
                            placeholder='Enter your username'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
                        />
                    </div>
                    {error && <p className='text-red-500 text-xs italic mb-4'>{error}</p>}
                    <div className='flex items-center justify-between'>
                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Enter the Chat Room'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login