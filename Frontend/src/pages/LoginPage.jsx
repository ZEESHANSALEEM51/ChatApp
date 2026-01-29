import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useContext(AuthContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true)
      setIsLoading(false)
      return;
    }

    try {
      await login(currState === "Sign up" ? 'signup' : 'login', { fullName, email, password, bio })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 flex items-center justify-center p-4'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000'></div>
      </div>

      <div className='relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12'>
        {/* Left Side - Brand Section */}
        <div className='text-center lg:text-left lg:w-1/2 space-y-8'>
          {/* Logo Section - Made more prominent */}
          <div className='flex flex-col items-center lg:items-start gap-6'>
            <div className='flex flex-col items-center lg:flex-row lg:items-center gap-6'>
              <div className='p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300'>
                <a href="https://github.com/ZEESHANSALEEM51">
                  <img 
                  src={assets.logo_big} 
                  alt="ChatApp Logo" 
                  className='w-32 h-32 lg:w-40 lg:h-40 drop-shadow-2xl' 
                />
                </a>
              </div>
              <div>
                <h1 className='text-4xl lg:text-5xl font-bold text-white mb-2'>
                  Chat<span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'>App</span>
                </h1>
                <p className='text-xl lg:text-2xl font-semibold text-gray-200'>
                  Where Conversations Come Alive
                </p>
              </div>
            </div>
            
            <p className='text-lg text-gray-300 max-w-lg'>
              Experience seamless, real-time messaging with friends, family, and colleagues in a secure and intuitive environment.
            </p>
          </div>
          
          {/* Features List */}
          <div className='space-y-6'>
            <div className='space-y-4'>
              <div className='flex items-center gap-3 text-gray-200'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg'>
                  <span className='text-white font-bold text-lg'>✓</span>
                </div>
                <div>
                  <span className='text-lg font-medium'>Real-time Messaging</span>
                  <p className='text-sm text-gray-400'>Instant delivery with typing indicators</p>
                </div>
              </div>
              <div className='flex items-center gap-3 text-gray-200'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg'>
                  <span className='text-white font-bold text-lg'>✓</span>
                </div>
                <div>
                  <span className='text-lg font-medium'>Secure & Encrypted</span>
                  <p className='text-sm text-gray-400'>Your conversations are protected</p>
                </div>
              </div>
              <div className='flex items-center gap-3 text-gray-200'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg'>
                  <span className='text-white font-bold text-lg'>✓</span>
                </div>
                <div>
                  <span className='text-lg font-medium'>Group Conversations</span>
                  <p className='text-sm text-gray-400'>Connect with multiple people at once</p>
                </div>
              </div>
              <div className='flex items-center gap-3 text-gray-200'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg'>
                  <span className='text-white font-bold text-lg'>✓</span>
                </div>
                <div>
                  <span className='text-lg font-medium'>File Sharing</span>
                  <p className='text-sm text-gray-400'>Share images and documents easily</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className='hidden lg:block'>
            <div className='inline-block p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl'>
              <p className='text-gray-300 italic text-lg mb-3'>"This chat app transformed how our team communicates. Simple, fast, and reliable!"</p>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500'></div>
                <div>
                  <p className='text-white font-medium'>Sahil Mehta</p>
                  <p className='text-gray-400 text-sm'>Zeeshu Tech</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className='w-full max-w-md'>
          <form onSubmit={onSubmitHandler} className='bg-gray-900/60 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-2xl font-bold text-white'>
                {currState === "Sign up" ? "Create Account" : "Welcome Back"}
              </h2>
              {isDataSubmitted && (
                <button
                  type="button"
                  onClick={() => setIsDataSubmitted(false)}
                  className='p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 group'
                  title="Go back"
                >
                  <img src={assets.arrow_icon} alt="arrowIcon" className='w-5 h-5 rotate-180 group-hover:scale-110 transition-transform' />
                </button>
              )}
            </div>

            {currState === "Sign up" && !isDataSubmitted && (
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>
                    Full Name
                  </label>
                  <input
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                    type="text"
                    className='w-full px-4 py-3 bg-gray-800/70 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-white transition-all duration-200'
                    placeholder='Zee Salim'
                    required
                  />
                </div>
              </div>
            )}

            {!isDataSubmitted && (
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>
                    Email Address
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder='you@example.com'
                    required
                    className='w-full px-4 py-3 bg-gray-800/70 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-white transition-all duration-200'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>
                    Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder='••••••••'
                    required
                    className='w-full px-4 py-3 bg-gray-800/70 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-white transition-all duration-200'
                  />
                  {currState === "Login" && (
                    <div className='mt-2 text-right'>
                      <a href="#" className='text-sm text-purple-400 hover:text-purple-300 transition-colors'>
                        Forgot password?
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {currState === "Sign up" && isDataSubmitted && (
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-300 mb-2'>
                    Tell us about yourself
                    <span className='text-xs text-gray-400 ml-2'>(Optional)</span>
                  </label>
                  <textarea
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                    rows={4}
                    className='w-full px-4 py-3 bg-gray-800/70 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-white resize-none transition-all duration-200'
                    placeholder='A brief introduction about yourself... This will be visible on your profile.'
                  ></textarea>
                </div>
              </div>
            )}

            <div className='space-y-4'>
              <div className='flex items-start gap-3'>
                <input
                  type="checkbox"
                  id="terms"
                  className='w-5 h-5 mt-1 rounded border-gray-600 bg-gray-800 text-purple-600 focus:ring-purple-500 focus:ring-offset-gray-900'
                  required
                />
                <label htmlFor="terms" className='text-sm text-gray-300'>
                  I agree to the{' '}
                  <a href="#" className='text-purple-400 hover:text-purple-300 transition-colors font-medium'>
                    Terms of Use
                  </a>{' '}
                  &{' '}
                  <a href="#" className='text-purple-400 hover:text-purple-300 transition-colors font-medium'>
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className={`w-full py-3 rounded-xl font-medium text-white transition-all duration-200 ${
                  isLoading
                    ? 'bg-purple-800 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-xl'
                }`}
              >
                {isLoading ? (
                  <span className='flex items-center justify-center gap-2'>
                    <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                    {currState === "Sign up" ? "Creating Account..." : "Logging in..."}
                  </span>
                ) : (
                  currState === "Sign up" ? (isDataSubmitted ? "Complete Sign Up" : "Continue") : "Sign In"
                )}
              </button>
            </div>

            <div className='pt-4 border-t border-gray-700'>
              {currState === "Sign up" ? (
                <p className='text-center text-gray-400'>
                  Already have an Account?{' '}
                  <button
                    type="button"
                    onClick={() => { setCurrState("Login"); setIsDataSubmitted(false) }}
                    className='font-medium text-purple-400 hover:text-purple-300 transition-colors'
                  >
                    Login here
                  </button>
                </p>
              ) : (
                <p className='text-center text-gray-400'>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setCurrState("Sign up")}
                    className='font-medium text-purple-400 hover:text-purple-300 transition-colors'
                  >
                    Sign up here
                  </button>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Add this to your global CSS or Tailwind config for animations */}
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

export default LoginPage