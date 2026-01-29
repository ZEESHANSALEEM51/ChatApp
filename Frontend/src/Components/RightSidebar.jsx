import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const RightSidebar = () => {
  const {selectedUser, messages} = useContext(ChatContext)
  const {logout, onlineUsers} = useContext(AuthContext)
  const [messageImages, setMessageImages] = useState([])

  useEffect(() => {
    setMessageImages(
      messages.filter(msg => msg.image).map(msg => msg.image)
    )
  }, [messages])

  return selectedUser && (
    <div className={`h-full bg-gradient-to-b from-gray-900/95 to-gray-900/90 border-l border-gray-800/50 overflow-y-auto scrollbar-thin`}>
      {/* User Profile Section */}
      <div className='p-6 flex flex-col items-center gap-4'>
        {/* Avatar with Online Status */}
        <div className='relative'>
          <div className='w-24 h-24 rounded-full border-4 border-gray-800 overflow-hidden shadow-xl'>
            <img 
              src={selectedUser?.profilePic || assets.avatar_icon} 
              alt="profile" 
              className='w-full h-full object-cover'
            />
          </div>
          {onlineUsers.includes(selectedUser._id) ? (
            <div className='absolute bottom-2 right-2 w-5 h-5 rounded-full border-3 border-gray-900 bg-green-500 animate-pulse shadow-lg'></div>
          ) : (
            <div className='absolute bottom-2 right-2 w-5 h-5 rounded-full border-3 border-gray-900 bg-gray-500 shadow-lg'></div>
          )}
        </div>

        {/* User Info */}
        <div className='text-center space-y-3 w-full'>
          <div className='flex items-center justify-center gap-2'>
            <h1 className='text-xl font-bold text-white'>
              {selectedUser.fullName}
            </h1>
          </div>
          
          <div className='flex items-center justify-center gap-1'>
            {onlineUsers.includes(selectedUser._id) ? (
              <span className='text-green-400 text-sm font-medium flex items-center gap-1'>
                <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse'></div>
                Online
              </span>
            ) : (
              <span className='text-gray-400 text-sm flex items-center gap-1'>
                <div className='w-2 h-2 rounded-full bg-gray-500'></div>
                Offline
              </span>
            )}
          </div>
          
          {selectedUser.bio && (
            <div className='bg-gray-800/50 rounded-xl p-4'>
              <p className='text-gray-300 text-sm leading-relaxed'>
                {selectedUser.bio}
              </p>
            </div>
          )}

          {/* Stats */}
          <div className='flex justify-center gap-6 pt-4'>
            <div className='text-center'>
              <div className='text-lg font-bold text-white'>{messages.filter(m => m.senderId === selectedUser._id).length}</div>
              <div className='text-xs text-gray-400'>Messages</div>
            </div>
            <div className='text-center'>
              <div className='text-lg font-bold text-white'>{messageImages.length}</div>
              <div className='text-xs text-gray-400'>Media</div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className='my-6 px-4'>
        <div className='h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent'></div>
        <p className='text-xs text-gray-500 mt-3 px-2'>Media Shared</p>
      </div>

      {/* Media Section */}
      <div className='px-4 mb-24'>
        {messageImages.length > 0 ? (
          <>
            <div className='grid grid-cols-3 gap-2'>
              {messageImages.slice(0, 9).map((url, index) => (
                <div 
                  key={index} 
                  onClick={() => window.open(url)}
                  className='aspect-square rounded-lg overflow-hidden cursor-pointer group relative border border-gray-800 hover:border-purple-500/50 transition-all duration-200'
                >
                  <img 
                    src={url} 
                    alt={`shared-media-${index}`} 
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
                  />
                </div>
              ))}
            </div>
            
            {messageImages.length > 9 && (
              <div className='mt-3 text-center'>
                <p className='text-sm text-gray-400'>
                  +{messageImages.length - 9} more images
                </p>
              </div>
            )}
          </>
        ) : (
          <div className='text-center py-8'>
            <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center'>
              <span className='text-2xl'>📷</span>
            </div>
            <p className='text-gray-400'>No media shared yet</p>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <div className='sticky bottom-0 p-4 border-t border-gray-800/50 bg-gray-900/95'>
        <button 
          onClick={() => logout()} 
          className='w-full py-3 rounded-xl bg-gradient-to-r from-red-600/90 to-orange-600/90 hover:from-red-700 hover:to-orange-700 text-white transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-red-500/10'
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default RightSidebar