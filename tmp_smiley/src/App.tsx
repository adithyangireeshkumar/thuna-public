/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef, FormEvent } from 'react';
import { LogIn, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { SmileyBall } from './components/SmileyBall';

type AppState = 'idle' | 'curious' | 'private' | 'confused' | 'success';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [appState, setAppState] = useState<AppState>('idle');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSneezing, setIsSneezing] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastKeyTime = useRef<number>(0);
  const typeCounter = useRef<number>(0);

  // Sneeze trigger helper
  const triggerSneeze = () => {
    setIsSneezing(true);
    setTimeout(() => setIsSneezing(false), 800);
  };

  // Smiley character configurations as towers
  // Arranged to be touching and emphasizing size layers
  const smileys = [
    { id: 'sunny', color: '#FFD93D', size: 130, xOffset: -180 },  // Large back
    { id: 'berry', color: '#FF6B6B', size: 95, xOffset: -85 },    // Medium
    { id: 'sky', color: '#6BCBFF', size: 65, xOffset: -15 },     // Small front
    { id: 'minto', color: '#6BFFB8', size: 110, xOffset: 65 },    // Large
    { id: 'grape', color: '#D26BFF', size: 85, xOffset: 155 },   // Medium
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (focusedField === 'email') {
      setAppState('curious');
      setError('');
    } else if (focusedField === 'password') {
      setAppState('private');
      setError('');
    } else {
      if (appState !== 'confused' && appState !== 'success') {
        setAppState('idle');
      }
    }
  }, [focusedField]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    
    // Simple validation "reaction"
    if (!email.includes('@') || password.length < 6) {
      setAppState('confused');
      setError('Wrong password! We are disappointed.');
      
      // Reset after a bit
      setTimeout(() => {
        setAppState(focusedField === 'email' ? 'curious' : (focusedField === 'password' ? 'private' : 'idle'));
        setError('');
      }, 3000);
    } else {
      setAppState('success');
      setError('');
      // Simulation of success
      setTimeout(() => {
        setAppState('idle');
      }, 3000);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-white flex items-center justify-center font-sans selection:bg-indigo-100"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#e5e7eb 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} 
      />

      <div className="w-full max-w-7xl flex flex-row items-center justify-between px-12 z-10">
        {/* Left Side: Smiley Gang in a horizontal line */}
        <div className="relative w-1/2 h-[400px] flex items-center justify-center">
          {smileys.map((s) => (
            <SmileyBall
              key={s.id}
              color={s.color}
              size={s.size}
              initialX={s.xOffset} // Horizontal offset
              initialY={0} // Centered vertically
              mouseX={mousePos.x}
              mouseY={mousePos.y}
              state={appState}
              isSneezing={isSneezing}
            />
          ))}
        </div>

        {/* Right Side: Login Card */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ 
            x: 0, 
            opacity: 1,
            rotate: appState === 'confused' ? [0, -1, 1, -1, 1, 0] : 0
          }}
          transition={{ 
            rotate: { duration: 0.4 },
            default: { type: 'spring', damping: 20, stiffness: 100 }
          }}
          className="w-full max-w-[420px] p-12 bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col items-center relative z-40"
        >
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2 uppercase">Hello there!</h1>
          <p className="text-gray-400 font-medium tracking-wide">Welcome back to the fun zone</p>
        </div>

        <form onSubmit={handleLogin} className="w-full space-y-8">
          <div className="relative group">
            <label className={`absolute -top-3 left-6 bg-white px-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${focusedField === 'email' ? 'text-[#4D96FF]' : 'text-gray-300'}`}>
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  const now = Date.now();
                  if (now - lastKeyTime.current < 150) {
                    typeCounter.current++;
                    if (typeCounter.current > 6) {
                      triggerSneeze();
                      typeCounter.current = 0;
                    }
                  } else {
                    typeCounter.current = 0;
                  }
                  lastKeyTime.current = now;
                }}
                onFocus={() => {
                  setFocusedField('email');
                  typeCounter.current = 0;
                }}
                onBlur={() => {
                  setFocusedField(null);
                  if (email.length > 0 && email.length < 5) {
                    triggerSneeze();
                  }
                }}
                className={`w-full h-16 px-8 rounded-full border-2 bg-blue-50/10 text-gray-800 font-bold focus:outline-none transition-all ${focusedField === 'email' ? 'border-[#4D96FF] ring-4 ring-[#4D96FF]/5 bg-blue-50/20' : 'border-gray-100'}`}
                placeholder="curious.user@gmail.com"
                required
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex space-x-1 opacity-20">
                <div className="w-1.5 h-1.5 bg-[#4D96FF] rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-[#4D96FF] rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <label className={`absolute -top-3 left-6 bg-white px-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${focusedField === 'password' ? 'text-[#4D96FF]' : 'text-gray-300'}`}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  const now = Date.now();
                  if (now - lastKeyTime.current < 150) {
                    typeCounter.current++;
                    if (typeCounter.current > 6) {
                      triggerSneeze();
                      typeCounter.current = 0;
                    }
                  } else {
                    typeCounter.current = 0;
                  }
                  lastKeyTime.current = now;
                }}
                onFocus={() => {
                  setFocusedField('password');
                  typeCounter.current = 0;
                }}
                onBlur={() => {
                  setFocusedField(null);
                  if (password.length > 0 && password.length < 4) {
                    triggerSneeze();
                  }
                }}
                className={`w-full h-16 px-8 rounded-full border-2 bg-blue-50/10 text-gray-800 font-bold focus:outline-none transition-all ${focusedField === 'password' ? 'border-[#4D96FF] ring-4 ring-[#4D96FF]/5 bg-blue-50/20' : 'border-gray-100'}`}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-6 flex items-center text-gray-300 hover:text-gray-500 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs font-black text-rose-500 text-center uppercase tracking-widest"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-16 bg-gray-900 text-white rounded-full font-black text-lg uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-95"
            type="submit"
          >
            Hop In!
          </motion.button>
        </form>

        <div className="mt-10 flex items-center space-x-6 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
          <button className="hover:text-gray-500 transition-colors">Reset</button>
          <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
          <button className="hover:text-gray-500 transition-colors">Create Account</button>
        </div>
      </motion.div>
    </div>

    <div className="absolute bottom-10 w-full text-center text-gray-200 text-[10px] font-black uppercase tracking-[0.4em] pointer-events-none">
        The smilies are watching your progress
      </div>

      {/* Floating Blobs for decoration */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-rose-50 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
}
