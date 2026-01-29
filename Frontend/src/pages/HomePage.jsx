import React, { useContext, useState } from 'react'
import RightSidebar from '../Components/RightSidebar'
import Sidebar from '../Components/Sidebar'
import ChatContainer from '../Components/ChatContainer'
import { ChatContext } from '../../context/ChatContext'

const HomePage = () => {
    const { selectedUser } = useContext(ChatContext)
    const [showRightSidebarMobile, setShowRightSidebarMobile] = useState(false)

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
            {/* Decorative Background Elements - Fixed positioning */}
            <div className='fixed inset-0 overflow-hidden pointer-events-none -z-10'>
                <div className='absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl'></div>
                <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl'></div>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl'></div>
            </div>

            {/* Main Container - FIXED: No outer padding causing overflow */}
            <div className='h-screen w-full overflow-hidden'>
                {/* Header - Only show when no user selected on mobile */}
                {!selectedUser && (
                    <div className='flex-shrink-0 flex items-center justify-between p-4 bg-gray-900/60 backdrop-blur-sm border-b border-gray-800/50'>
                        <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg'>
                                <span className='text-white font-bold text-lg md:text-xl'>C</span>
                            </div>
                            <div>
                                <h1 className='text-xl md:text-2xl font-bold text-white'>ChatApp</h1>
                                <p className='text-xs md:text-sm text-gray-400'>Real-time messaging</p>
                            </div>
                        </div>
                        
                        <div className='flex items-center gap-2'>
                            <div className='w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 border border-gray-700 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity'>
                                <span className='text-gray-300 text-sm'>⚙️</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Chat Interface - FIXED: No outer div causing scroll */}
                <div className={`h-full flex ${selectedUser ? 'max-md:flex-col' : ''} ${!selectedUser ? 'h-[calc(100vh-80px)] md:h-full' : 'h-full'}`}>
                    {/* Sidebar - Always visible */}
                    <div className={`${selectedUser ? 'hidden md:block md:w-1/4 lg:w-1/5' : 'w-full md:w-1/3 lg:w-1/4'} h-full overflow-hidden`}>
                        <Sidebar />
                    </div>

                    {/* Chat Container - Main Content */}
                    <div className={`${selectedUser ? 'w-full md:w-2/4 lg:w-3/5' : 'hidden md:block md:w-2/3 lg:w-3/4'} h-full overflow-hidden`}>
                        <ChatContainer />
                    </div>

                    {/* Right Sidebar - Only when user selected */}
                    {selectedUser && (
                        <div className='hidden md:block md:w-1/4 lg:w-1/5 h-full overflow-hidden'>
                            <RightSidebar />
                        </div>
                    )}
                </div>

                {/* Mobile Right Sidebar Overlay */}
                {showRightSidebarMobile && selectedUser && (
                    <div className='md:hidden fixed inset-0 z-50'>
                        <div className='absolute inset-0 bg-gray-900/95 backdrop-blur-lg'>
                            <div className='h-full flex flex-col'>
                                <div className='flex-shrink-0 p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900'>
                                    <button 
                                        onClick={() => setShowRightSidebarMobile(false)}
                                        className='p-2 rounded-lg hover:bg-gray-800 transition-colors'
                                    >
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <h3 className='text-white font-medium'>Profile</h3>
                                    <div className='w-10'></div>
                                </div>
                                <div className='flex-1 overflow-y-auto'>
                                    <RightSidebar />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Bottom Navigation for Mobile */}
                {selectedUser && (
                    <div className='md:hidden fixed bottom-4 left-4 right-4 z-40'>
                        <div className='bg-gray-900/90 backdrop-blur-lg border border-gray-800 rounded-xl p-2 shadow-2xl'>
                            <div className='flex items-center justify-around'>
                                <button 
                                    onClick={() => setShowRightSidebarMobile(true)}
                                    className='flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-800 transition-colors'
                                >
                                    <div className='w-6 h-6 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 flex items-center justify-center'>
                                        <span className='text-xs'>👤</span>
                                    </div>
                                    <span className='text-xs text-gray-300'>Profile</span>
                                </button>
                                <button className='flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-800 transition-colors'>
                                    <div className='w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center'>
                                        <span className='text-xs'>📞</span>
                                    </div>
                                    <span className='text-xs text-gray-300'>Call</span>
                                </button>
                                <button className='flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-800 transition-colors'>
                                    <div className='w-6 h-6 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center'>
                                        <span className='text-xs'>📎</span>
                                    </div>
                                    <span className='text-xs text-gray-300'>Attach</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* New Message Button */}
                <button className='fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl hover:shadow-purple-500/25 hover:scale-105 active:scale-95 transition-all duration-200'>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default HomePage