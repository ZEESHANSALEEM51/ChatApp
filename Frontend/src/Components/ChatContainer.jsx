import React, { useRef, useEffect, useContext, useState } from 'react'
import assets from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext)
  const { authUser, onlineUsers } = useContext(AuthContext)

  const scrollEnd = useRef()
  const [input, setInput] = useState("")

  // Handle send message 
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    await sendMessage({ text: input.trim() });
    setInput("");
  }

  // Handle sending an image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select a valid image file")
      return;
    }
    const reader = new FileReader()
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result })
      e.target.value = ""
    }
    reader.readAsDataURL(file)
  }

  // Handle key press for Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  }

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id)
    }
  }, [selectedUser])

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return selectedUser ? (
    <div className='h-full flex flex-col'>
      {/* Header */}
      <div className='flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-800/50 bg-gray-900/60'>
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <img 
              src={selectedUser.profilePic || assets.avatar_icon} 
              alt="profile" 
              className='w-10 h-10 rounded-full border-2 border-gray-700 object-cover' 
            />
            {onlineUsers.includes(selectedUser._id) && (
              <div className='absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-900 bg-green-500 animate-pulse'></div>
            )}
          </div>
          <div>
            <h2 className='font-medium text-white'>
              {selectedUser.fullName}
            </h2>
            {onlineUsers.includes(selectedUser._id) ? (
              <p className='text-xs text-green-400 flex items-center gap-1'>
                <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse'></div>
                Online
              </p>
            ) : (
              <p className='text-xs text-gray-400 flex items-center gap-1'>
                <div className='w-2 h-2 rounded-full bg-gray-500'></div>
                Offline
              </p>
            )}
          </div>
        </div>
        
        <div className='flex items-center gap-2'>
          <button className='hidden md:block p-2 rounded-lg hover:bg-gray-800/50 transition-colors'>
            <img src={assets.help_icon} alt="helpIcon" className='w-5 h-5' />
          </button>
          <button 
            onClick={() => setSelectedUser(null)}
            className='md:hidden p-2 rounded-lg hover:bg-gray-800/50 transition-colors'
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Chat Messages Area - FIXED SCROLLING */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent via-gray-900/5 to-transparent'>
        {messages.length === 0 ? (
          <div className='h-full flex flex-col items-center justify-center text-center p-8'>
            <div className='w-20 h-20 rounded-full bg-gray-800/50 flex items-center justify-center mb-4'>
              <span className='text-3xl'>💬</span>
            </div>
            <h3 className='text-xl font-medium text-white mb-2'>Start a conversation</h3>
            <p className='text-gray-400'>Send your first message to {selectedUser.fullName.split(' ')[0]}</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex gap-3 ${msg.senderId === authUser._id ? 'justify-end' : 'justify-start'}`}
            >
              {/* Avatar for received messages */}
              {msg.senderId !== authUser._id && (
                <div className='flex-shrink-0'>
                  <img 
                    src={selectedUser?.profilePic || assets.avatar_icon} 
                    alt="sender" 
                    className='w-8 h-8 rounded-full border border-gray-700 object-cover' 
                  />
                </div>
              )}

              {/* Message Bubble */}
              <div className={`max-w-[80%] ${msg.senderId === authUser._id ? 'order-1' : 'order-2'}`}>
                <div className={`flex flex-col ${msg.senderId === authUser._id ? 'items-end' : 'items-start'}`}>
                  {msg.image ? (
                    <div 
                      className='rounded-xl overflow-hidden cursor-pointer border border-gray-700 hover:border-purple-500/50 transition-all duration-200'
                      onClick={() => window.open(msg.image)}
                    >
                      <img 
                        src={msg.image} 
                        alt="shared" 
                        className='max-h-60 object-cover' 
                      />
                    </div>
                  ) : (
                    <div className={`p-3 rounded-2xl ${msg.senderId === authUser._id 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-none' 
                      : 'bg-gray-800/70 text-gray-100 rounded-bl-none border border-gray-700/50'
                    }`}>
                      <p className='text-sm break-words'>{msg.text}</p>
                    </div>
                  )}
                  
                  {/* Time */}
                  <span className={`text-xs text-gray-500 mt-1 px-1 ${msg.senderId === authUser._id ? 'text-right' : ''}`}>
                    {formatMessageTime(msg.createdAt)}
                  </span>
                </div>
              </div>

              {/* Avatar for sent messages */}
              {msg.senderId === authUser._id && (
                <div className='flex-shrink-0 order-3'>
                  <img 
                    src={authUser?.profilePic || assets.avatar_icon} 
                    alt="you" 
                    className='w-8 h-8 rounded-full border border-purple-500/50 object-cover' 
                  />
                </div>
              )}
            </div>
          ))
        )}
        <div ref={scrollEnd} className='h-4'></div>
      </div>

      {/* Input Area */}
      <div className='flex-shrink-0 p-4 border-t border-gray-800/50 bg-gray-900/60 pb-20 md:pb-4'>  {/* Added pb-20 for mobile */}
    <form onSubmit={handleSendMessage} className='flex items-center gap-3'>
          <div className='flex-1 flex items-center bg-gray-800/70 border border-gray-700 rounded-2xl px-4 hover:border-purple-500/50 focus-within:border-purple-500 transition-all duration-200'>
            {/* File Upload */}
            <input 
              onChange={handleSendImage} 
              type="file" 
              id="image" 
              accept='image/*' 
              hidden 
            />
            <label 
              htmlFor="image" 
              className='p-2 hover:bg-gray-700/50 rounded-lg transition-colors cursor-pointer group'
              title="Upload image"
            >
              <img 
                src={assets.gallery_icon} 
                alt="attach" 
                className='w-5 h-5 opacity-70 group-hover:opacity-100' 
              />
            </label>
            
            <input 
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyDown={handleKeyPress}
              type="text" 
              placeholder={`Message ${selectedUser.fullName.split(' ')[0]}...`}
              className='flex-1 bg-transparent p-3 border-none outline-none text-white placeholder-gray-500 text-sm'
            />
          </div>
          
          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim()}
            className={`p-3 rounded-full transition-all duration-200 ${input.trim()
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 cursor-pointer'
              : 'bg-gray-700 cursor-not-allowed'
            }`}
          >
            <svg 
              className="w-5 h-5 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div className='h-full hidden md:flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-gray-900/50 to-gray-900/20'>
      <div className='max-w-md space-y-6'>
        <div className='w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center'>
          <span className='text-4xl'>💬</span>
        </div>
        <div>
          <h2 className='text-2xl font-bold text-white mb-2'>Welcome to ChatApp</h2>
          <p className='text-gray-400'>Select a conversation from the sidebar to start chatting</p>
        </div>
        <div className='grid grid-cols-3 gap-4 pt-4'>
          <div className='text-center p-4 rounded-xl bg-gray-800/30'>
            <div className='w-10 h-10 mx-auto mb-2 rounded-full bg-purple-600/20 flex items-center justify-center'>
              <span className='text-lg'>🔒</span>
            </div>
            <p className='text-sm text-gray-300'>Secure</p>
          </div>
          <div className='text-center p-4 rounded-xl bg-gray-800/30'>
            <div className='w-10 h-10 mx-auto mb-2 rounded-full bg-blue-600/20 flex items-center justify-center'>
              <span className='text-lg'>⚡</span>
            </div>
            <p className='text-sm text-gray-300'>Fast</p>
          </div>
          <div className='text-center p-4 rounded-xl bg-gray-800/30'>
            <div className='w-10 h-10 mx-auto mb-2 rounded-full bg-green-600/20 flex items-center justify-center'>
              <span className='text-lg'>🌐</span>
            </div>
            <p className='text-sm text-gray-300'>Reliable</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatContainer