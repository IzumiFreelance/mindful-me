import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Message } from '../../types';
import { getCurrentUser } from '../../utils/auth';
import { getItem, setItem } from '../../utils/storage';

interface ChatRoomProps {
  receiverId: string;
}

export default function ChatRoom({ receiverId }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const currentUser = getCurrentUser();

  useEffect(() => {
    const storedMessages = getItem<Message[]>(`messages-${currentUser?.id}-${receiverId}`) || [];
    setMessages(storedMessages);
  }, [receiverId, currentUser]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId,
      content: newMessage,
      timestamp: new Date()
    };

    const allMessages = getItem<Message[]>(`messages-${currentUser?.id}-${receiverId}`) || [];
    setItem(`messages-${currentUser?.id}-${receiverId}`, [...allMessages, message]);
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderId === currentUser?.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={sendMessage} className="border-t p-4 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}