import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Send, Image as ImageIcon, MapPin, MoreVertical } from 'lucide-react';
import { Button } from '../../components/ui/Button';

// Dummy implementation representing real Socket.io hookup
export default function RealTimeChat() {
  const { bookingId } = useParams();
  const [messages, setMessages] = useState([
    { id: 1, senderId: 'provider', text: 'Hi! I am on my way to the location.', time: '10:45 AM' },
    { id: 2, senderId: 'user', text: 'Great, see you soon. The gate code is 1234.', time: '10:46 AM' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll Down
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Optimistic UI
    setMessages(prev => [...prev, { id: Date.now(), senderId: 'user', text: input, time: 'Now' }]);
    setInput('');
    // Ideally: socket.emit('send_message', { bookingId, text: input });
  };

  return (
    <div className="max-w-3xl mx-auto h-[80vh] flex flex-col mt-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg ring-1 ring-gray-900/5">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0 bg-gray-50 dark:bg-gray-800/30 rounded-t-2xl">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-bold">
               P
            </div>
            <div>
               <h2 className="font-semibold text-gray-900 dark:text-gray-100">Prakash Electrician</h2>
               <p className="text-xs text-green-500 font-medium">● Online</p>
            </div>
         </div>
         <Button variant="ghost" size="icon" className="text-gray-500 rounded-full">
            <MoreVertical className="w-5 h-5" />
         </Button>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dots">
         {messages.map((msg) => {
           const isMe = msg.senderId === 'user';
           return (
             <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-sm ${
                 isMe 
                  ? 'bg-primary-600 text-white rounded-br-none' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none border border-gray-200 dark:border-gray-700'
               }`}>
                 <p className="text-sm">{msg.text}</p>
                 <span className={`text-[10px] items-end block mt-1 ${isMe ? 'text-primary-200' : 'text-gray-400'}`}>
                   {msg.time}
                 </span>
               </div>
             </div>
           )
         })}
         <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={sendMessage} className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 rounded-b-2xl">
         <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="icon" className="text-gray-500 shrink-0 hidden sm:flex">
               <ImageIcon className="w-5 h-5" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="text-gray-500 shrink-0 hidden sm:flex">
               <MapPin className="w-5 h-5" />
            </Button>
            <input 
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder="Type a message..."
               className="flex-1 bg-gray-100 dark:bg-gray-800 border-transparent rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white dark:focus:bg-gray-950 transition-all dark:text-white"
            />
            <Button type="submit" size="icon" className="shrink-0 rounded-full h-10 w-10 shadow-md">
               <Send className="w-4 h-4 ml-0.5" />
            </Button>
         </div>
      </form>
    </div>
  );
}
