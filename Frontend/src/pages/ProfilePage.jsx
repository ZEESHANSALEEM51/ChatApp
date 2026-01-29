import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [name, setName] = useState(authUser?.fullName || "")
  const [bio, setBio] = useState(authUser?.bio || "")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    
    try {
      if (!selectedImage) {
        await updateProfile({ fullName: name, bio })
        navigate('/')
        return;
      }

      const reader = new FileReader()
      reader.readAsDataURL(selectedImage)
      reader.onload = async () => {
        const base64Image = reader.result;
        await updateProfile({ profilePic: base64Image, fullName: name, bio })
        navigate('/')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 flex items-center justify-center p-4'>
      {/* Animated Background */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000'></div>
      </div>

      <div className='relative z-10 w-full max-w-4xl'>
        {/* Header */}
        <div className='text-center mb-8'>
          <button
            onClick={() => navigate('/')}
            className='absolute left-0 top-0 flex items-center gap-2 text-gray-400 hover:text-white transition-colors'
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className='text-sm'>Back to Chat</span>
          </button>
          <h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>Edit Profile</h1>
          <p className='text-gray-400'>Customize your profile information</p>
        </div>

        <div className='bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden'>
          <div className='flex flex-col lg:flex-row'>
            {/* Left Side - Profile Preview */}
            <div className='lg:w-2/5 p-8 md:p-10 bg-gradient-to-br from-gray-900/80 to-gray-900/40 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-800/50'>
              <div className='relative mb-6'>
                <div className='w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl'>
                  <img 
                    src={selectedImage ? URL.createObjectURL(selectedImage) : authUser?.profilePic || assets.avatar_icon} 
                    alt="Profile" 
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg'>
                  <span className='text-white text-lg'>👤</span>
                </div>
              </div>
              
              <div className='text-center'>
                <h2 className='text-xl md:text-2xl font-bold text-white mb-2'>
                  {name || 'Your Name'}
                </h2>
                <p className='text-gray-400 text-sm mb-4'>
                  {bio ? bio : 'Add a bio to tell others about yourself'}
                </p>
                <div className='flex items-center justify-center gap-2 text-sm text-gray-500'>
                  <div className='w-2 h-2 rounded-full bg-green-500'></div>
                  <span>Profile visible to all users</span>
                </div>
              </div>
            </div>

            {/* Right Side - Edit Form */}
            <div className='lg:w-3/5 p-6 md:p-8 lg:p-10'>
              <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Profile Picture Upload */}
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-300'>
                    Profile Picture
                  </label>
                  <div className='flex items-center gap-4'>
                    <input 
                      onChange={(e) => setSelectedImage(e.target.files[0])} 
                      type="file" 
                      id='avatar' 
                      accept=".png,.jpg,.jpeg,.webp"
                      className='hidden'
                    />
                    <label 
                      htmlFor="avatar" 
                      className='flex-1 p-4 border-2 border-dashed border-gray-700 hover:border-purple-500/50 rounded-xl cursor-pointer transition-colors duration-200 bg-gray-800/30 hover:bg-gray-800/50'
                    >
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center'>
                          <span className='text-lg'>📷</span>
                        </div>
                        <div>
                          <p className='text-white font-medium'>
                            {selectedImage ? selectedImage.name : 'Upload new photo'}
                          </p>
                          <p className='text-xs text-gray-400'>
                            PNG, JPG, JPEG up to 5MB
                          </p>
                        </div>
                      </div>
                    </label>
                    {selectedImage && (
                      <button
                        type='button'
                        onClick={() => setSelectedImage(null)}
                        className='p-2 text-red-400 hover:text-red-300 transition-colors'
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Name Input */}
                <div className='space-y-2'>
                  <label htmlFor="name" className='block text-sm font-medium text-gray-300'>
                    Full Name
                  </label>
                  <input 
                    onChange={(e) => setName(e.target.value)} 
                    value={name}
                    id="name"
                    type="text" 
                    required 
                    placeholder='Enter your full name'
                    className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-200'
                  />
                  <p className='text-xs text-gray-400'>
                    This will be displayed to other users
                  </p>
                </div>

                {/* Bio Input */}
                <div className='space-y-2'>
                  <label htmlFor="bio" className='block text-sm font-medium text-gray-300'>
                    Bio
                    <span className='text-xs text-gray-400 ml-2'>(Optional)</span>
                  </label>
                  <textarea 
                    onChange={(e) => setBio(e.target.value)} 
                    value={bio} 
                    id="bio"
                    placeholder='Tell others about yourself...'
                    className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 resize-none transition-all duration-200 h-32'
                    rows={4}
                  ></textarea>
                  <p className='text-xs text-gray-400'>
                    Maximum 200 characters • {bio.length}/200
                  </p>
                </div>

                {/* Action Buttons */}
                <div className='flex gap-4 pt-4'>
                  <button
                    type='button'
                    onClick={handleCancel}
                    className='flex-1 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-200 font-medium'
                  >
                    Cancel
                  </button>
                  <button 
                    type='submit' 
                    disabled={isLoading || !name.trim()}
                    className={`flex-1 py-3 rounded-xl font-medium text-white transition-all duration-200 ${
                      isLoading || !name.trim()
                        ? 'bg-purple-800/50 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isLoading ? (
                      <span className='flex items-center justify-center gap-2'>
                        <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                        Saving...
                      </span>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>

                {/* Security Note */}
                <div className='pt-4 border-t border-gray-800/50'>
                  <div className='flex items-start gap-3 p-3 rounded-lg bg-gray-800/30'>
                    <div className='w-8 h-8 rounded-full bg-gradient-to-r from-green-600/20 to-emerald-600/20 flex items-center justify-center flex-shrink-0'>
                      <span className='text-sm'>🔒</span>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-300'>Your information is secure</p>
                      <p className='text-xs text-gray-500 mt-1'>
                        All profile data is encrypted and protected. Only information you choose to share is visible to others.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className='mt-6 text-center text-sm text-gray-500'>
          <p>Need help? <a href="https://github.com/ZEESHANSALEEM51" className='text-purple-400 hover:text-purple-300 transition-colors'>Contact support</a></p>
        </div>
      </div>

      {/* Add animation styles */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default ProfilePage