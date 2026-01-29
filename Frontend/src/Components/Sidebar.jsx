import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext.jsx'
import { ChatContext } from '../../context/ChatContext.jsx'

const Sidebar = () => {
  
  const {getUsers,users,selectedUser,setSelectedUser,unseenMessages,setUnseenMessages}=useContext(ChatContext)
  const {logout,onlineUsers}=useContext(AuthContext)
  const [input,setInput]=useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const navigate=useNavigate();

  const filteredUsers = input ? users.filter((user)=> user.fullName.toLowerCase().includes(input.toLowerCase())) : users;

  useEffect(()=>{
    getUsers();
  },[onlineUsers])

  useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuOpen) setIsMenuOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  return (
    <div className={`h-full bg-gradient-to-b from-gray-900/95 to-gray-900/90 border-r border-gray-800/50 overflow-y-auto scrollbar-thin`}>
      {/* Header Section */}
      <div className='sticky top-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900/90 pb-4 pt-2 z-10'>
        <div className='flex justify-between items-center p-4'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg'>
              <img src={assets.logo} alt="logo" className='w-8 h-8' />
            </div>
            <div>
              <h1 className='text-xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent'>Messages</h1>
              <p className='text-xs text-gray-400'>{users.length} contacts</p>
            </div>
          </div>
          
          {/* Menu Dropdown */}
          <div className='relative'>
            <button 
              onClick={(e) => {
                e.stopPropagation()
                setIsMenuOpen(!isMenuOpen)
              }}
              className='p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 transition-all duration-200 hover:shadow-md'
            >
              <img src={assets.menu_icon} alt="menuIcon" className='w-5 h-5' />
            </button>
            
            {isMenuOpen && (
              <div className='absolute top-full right-0 mt-2 z-20 w-48 rounded-xl bg-gray-800/95 backdrop-blur-lg border border-gray-700 shadow-2xl overflow-hidden'>
                <div className='p-2'>
                  <button 
                    onClick={() => {
                      navigate('/profile')
                      setIsMenuOpen(false)
                    }}
                    className='w-full text-left px-4 py-3 text-gray-200 hover:bg-gray-700/50 rounded-lg transition-colors duration-150 flex items-center gap-3'
                  >
                    <div className='w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center'>
                      <span className='text-xs'>👤</span>
                    </div>
                    <span className='text-sm'>Edit Profile</span>
                  </button>
                  
                  <div className='h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-1'></div>
                  
                  <button 
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                    className='w-full text-left px-4 py-3 text-red-400 hover:bg-gray-700/50 rounded-lg transition-colors duration-150 flex items-center gap-3'
                  >
                    <div className='w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center'>
                      <span className='text-xs'>🚪</span>
                    </div>
                    <span className='text-sm'>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className='px-4'>
          <div className='relative group'>
            <div className='absolute left-4 top-1/2 transform -translate-y-1/2'>
              <img src={assets.search_icon} alt="searchIcon" className='w-4 h-4 text-gray-400' />
            </div>
            <input 
              onChange={(e)=> setInput(e.target.value)}
              type="text" 
              className='w-full pl-12 pr-4 py-3 bg-gray-800/70 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-white placeholder-gray-500 transition-all duration-200'
              placeholder='Search contacts...'
            />
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
              <div className='w-6 h-6 text-xs flex items-center justify-center rounded-full bg-gray-700 text-gray-400'>
                {filteredUsers.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className='p-4 space-y-1'>
        {filteredUsers.length === 0 ? (
          <div className='text-center py-12'>
            <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center'>
              <span className='text-2xl'>👤</span>
            </div>
            <p className='text-gray-400'>No contacts found</p>
            <p className='text-sm text-gray-500 mt-1'>Try a different search</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div 
              onClick={() => { 
                setSelectedUser(user); 
                setUnseenMessages(prev=> ({...prev, [user._id]:0}))
              }}
              key={user._id} 
              className={`group relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedUser?._id === user._id 
                ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50 shadow-lg' 
                : 'hover:bg-gray-800/70 hover:border hover:border-gray-700/50'
              }`}
            >
              {/* Avatar with Online Status */}
              <div className='relative'>
                <img 
                  src={user?.profilePic || assets.avatar_icon} 
                  alt={user.fullName} 
                  className='w-12 h-12 rounded-full border-2 border-gray-700 group-hover:border-purple-500/50 transition-colors duration-200 object-cover' 
                />
                {onlineUsers.includes(user._id) ? (
                  <div className='absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 bg-green-500 animate-pulse'></div>
                ) : (
                  <div className='absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 bg-gray-500'></div>
                )}
              </div>

              {/* User Info */}
              <div className='flex-1 min-w-0'>
                <div className='flex items-center justify-between'>
                  <p className='font-medium text-gray-100 truncate'>{user.fullName}</p>
                  {unseenMessages[user._id] > 0 && (
                    <span className='bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center'>
                      {unseenMessages[user._id]}
                    </span>
                  )}
                </div>
                <div className='flex items-center gap-2 mt-1'>
                  {onlineUsers.includes(user._id) ? (
                    <>
                      <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse'></div>
                      <span className='text-xs text-green-400 font-medium'>Online</span>
                    </>
                  ) : (
                    <>
                      <div className='w-2 h-2 rounded-full bg-gray-500'></div>
                      <span className='text-xs text-gray-400'>Offline</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Status */}
      <div className='sticky bottom-0 p-4 border-t border-gray-800/50 bg-gray-900/95'>
        <div className='flex items-center justify-between text-xs text-gray-500'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-green-500'></div>
            <span>{onlineUsers.length} online</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-purple-500'></div>
            <span>{users.length - onlineUsers.length} offline</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar