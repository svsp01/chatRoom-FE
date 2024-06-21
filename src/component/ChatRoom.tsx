import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import NavBar from './NavBar';

function ChatRoom() {
    const [messages, setMessages] = useState<any[]>([]);
    const [inputText, setInputText] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');

    useEffect(() => {
        const newSocket: Socket = io('http://localhost:8000')

        newSocket.on('connect', () => {
            console.log('Connected:', newSocket.id);
            newSocket.emit('join', { userId });
        });

        newSocket.on('message', (data: any) => {
            setMessages(prev => [...prev, data]);
        });

        newSocket.on('disconnect', () => {
            setMessages(prev => [...prev, { id: 'system', message: 'Disconnected from server' }]);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [userId]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (inputText.trim() && socket) {
            socket.emit('chatMessage', inputText);
            setInputText('');
        }
    };

    const handleInputChange = (e: any) => {
        setInputText(e.target.value);
    };

    const isCurrentUser = (messageId: string) => messageId === socket?.id;

    return (
        <div className='h-screen flex flex-col bg-gray-100'>
            <NavBar username={username}/>
            <div className='flex-grow overflow-y-auto p-4 space-y-4'>
                {messages.map((msg, index) => (
                    <div key={index} className={`max-w-xl ${isCurrentUser(msg.id) ? 'ml-auto' : 'mr-auto'}`}>
                        <div className={`rounded-lg p-3 ${isCurrentUser(msg.id) ? 'bg-blue-500 text-white' : 'bg-white'}`}>
                            <div className="font-bold mb-1">
                                {msg.id === 'system' ? 'System' : 
                                 isCurrentUser(msg.id) ? 'You' : 
                                 msg.username || 'Unknown User'}
                            </div>
                            <div>{msg.message}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='w-full p-4 bg-white border-t'>
                <form onSubmit={handleSubmit} className='flex space-x-2'>
                    <input
                        type="text"
                        value={inputText}
                        className='flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        onChange={handleInputChange}
                        placeholder="Type a message..."
                    />
                    <button type='submit' className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200'>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChatRoom;