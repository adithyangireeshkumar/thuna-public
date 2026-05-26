import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ShieldAlert, AlertTriangle } from 'lucide-react';
import { SmileyBall } from '../components/SmileyBall';

interface AuthViewProps {
  onGrant: () => void;
  onBack: () => void;
}

// Documented Easter Egg and validation constants
const SNEEZE_KEYSTROKE_THRESHOLD = 6;
const SNEEZE_COOLDOWN_MS = 800;
const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_COOLDOWN_SECONDS = 5;

const SMILEYS = [
  { id: 'sunny', color: '#FFD93D', size: 130, xOffset: -180 },
  { id: 'berry', color: '#FF6B6B', size: 95, xOffset: -85 },
  { id: 'sky', color: '#6BCBFF', size: 65, xOffset: -15 },
  { id: 'minto', color: '#6BFFB8', size: 110, xOffset: 65 },
  { id: 'grape', color: '#D26BFF', size: 85, xOffset: 155 },
] as const;

export default function AuthView({ onGrant, onBack }: AuthViewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [appState, setAppState] = useState<'idle' | 'curious' | 'private' | 'confused' | 'success'>('idle');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSneezing, setIsSneezing] = useState(false);

  // Security - Cooldown Rate Limiting
  const [attempts, setAttempts] = useState(0);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastKeyTime = useRef(0);
  const typeCounter = useRef(0);

  const triggerSneeze = () => {
    setIsSneezing(true);
    setTimeout(() => setIsSneezing(false), SNEEZE_COOLDOWN_MS);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Lockout Countdown Timer
  useEffect(() => {
    if (lockoutRemaining <= 0) return;
    const interval = setInterval(() => {
      setLockoutRemaining((prev) => {
        if (prev <= 1) {
          setAttempts(0); // Reset attempts after cooldown
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutRemaining]);

  useEffect(() => {
    if (focusedField === 'email') {
      setAppState('curious');
      setError('');
    } else if (focusedField === 'password') {
      setAppState('private');
      setError('');
    } else if (appState !== 'confused' && appState !== 'success') {
      setAppState('idle');
    }
  }, [focusedField, appState]);

  const handleTyping = (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    const now = Date.now();
    if (now - lastKeyTime.current < 150) {
      typeCounter.current++;
      if (typeCounter.current > SNEEZE_KEYSTROKE_THRESHOLD) {
        triggerSneeze();
        typeCounter.current = 0;
      }
    } else {
      typeCounter.current = 0;
    }
    lastKeyTime.current = now;
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (lockoutRemaining > 0) return;

    // Strict regex email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email) || password.length < 8) {
      const currentAttempts = attempts + 1;
      setAttempts(currentAttempts);
      setAppState('confused');

      if (currentAttempts >= MAX_LOGIN_ATTEMPTS) {
        setLockoutRemaining(LOCKOUT_COOLDOWN_SECONDS);
        setError(`Too many invalid attempts. Account temporarily locked for ${LOCKOUT_COOLDOWN_SECONDS}s.`);
      } else {
        // Generic secure error message - does not reveal specific password schema requirements
        setError('Invalid credentials. Please verify your email format and password.');
      }

      setTimeout(() => {
        if (currentAttempts < MAX_LOGIN_ATTEMPTS) {
          setAppState(focusedField === 'email' ? 'curious' : (focusedField === 'password' ? 'private' : 'idle'));
          setError('');
        }
      }, 3000);
    } else {
      setAppState('success');
      setError('');
      setAttempts(0);
      setTimeout(() => {
        setAppState('idle');
        onGrant();
      }, 2000);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-bg-deep font-sans select-none"
    >
      {/* Background Dots Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(var(--color-primary, #3b82f6) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="w-full max-w-5xl px-lg py-xl flex flex-col md:flex-row items-center justify-between gap-xl z-10 relative">
        {/* Left: Smiley Arena */}
        <div className="hidden md:flex relative flex-1 min-h-[450px] w-full items-center justify-center">
          {SMILEYS.map((s) => (
            <SmileyBall
              key={s.id}
              color={s.color}
              size={s.size}
              initialX={s.xOffset}
              initialY={0}
              mouseX={mousePos.x}
              mouseY={mousePos.y}
              state={appState}
              isSneezing={isSneezing}
            />
          ))}
        </div>

        {/* Right: Glassmorphic Login Card */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, rotate: appState === 'confused' ? [0, -1, 1, -1, 1, 0] : 0 }}
          transition={{ rotate: { duration: 0.4 }, default: { type: 'spring', damping: 20, stiffness: 100 } }}
          className="w-full max-w-md bg-glass border border-glass p-10 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col gap-6"
        >
          {/* Demo Mode Notice */}
          <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/20 rounded-xl text-primary text-xs leading-relaxed">
            <ShieldAlert size={18} className="flex-shrink-0" />
            <div>
              <span className="font-bold">Institutional Preview Mode</span>: Secure public audits use simulated authority gates. Real Supabase GoTrue variables are linked in production.
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">
              Secure Auditing Gate
            </h2>
            <p className="text-sm text-text-muted">
              Enter official credentials to inspect sanitization ledgers.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Email Address */}
            <div className="flex flex-col gap-2 relative">
              <label 
                htmlFor="auth-email-input" 
                className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                  focusedField === 'email' ? 'text-primary' : 'text-text-muted'
                }`}
              >
                Auditor Email
              </label>
              <div className="relative">
                <input
                  id="auth-email-input"
                  type="email"
                  value={email}
                  onChange={handleTyping(setEmail)}
                  onFocus={() => { setFocusedField('email'); typeCounter.current = 0; }}
                  onBlur={() => { setFocusedField(null); if (email.length > 0 && email.length < 5) triggerSneeze(); }}
                  className={`w-full px-4 py-3 bg-[#111827]/40 border rounded-xl text-on-surface placeholder:text-text-muted/40 font-medium focus:outline-none transition-all ${
                    focusedField === 'email' ? 'border-primary shadow-[0_0_12px_rgba(59,130,246,0.2)]' : 'border-white/10'
                  }`}
                  placeholder="auditor.portal@keralapolice.gov.in"
                  required
                  disabled={lockoutRemaining > 0}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2 relative">
              <label 
                htmlFor="auth-password-input" 
                className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                  focusedField === 'password' ? 'text-primary' : 'text-text-muted'
                }`}
              >
                Access Password
              </label>
              <div className="relative">
                <input
                  id="auth-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handleTyping(setPassword)}
                  onFocus={() => { setFocusedField('password'); typeCounter.current = 0; }}
                  onBlur={() => { setFocusedField(null); if (password.length > 0 && password.length < 4) triggerSneeze(); }}
                  className={`w-full px-4 pr-12 py-3 bg-[#111827]/40 border rounded-xl text-on-surface placeholder:text-text-muted/40 font-medium focus:outline-none transition-all ${
                    focusedField === 'password' ? 'border-primary shadow-[0_0_12px_rgba(59,130,246,0.2)]' : 'border-white/10'
                  }`}
                  placeholder="••••••••"
                  required
                  disabled={lockoutRemaining > 0}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-on-surface transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-start gap-2 text-xs text-status-critical bg-status-critical/10 border border-status-critical/20 p-3 rounded-lg leading-snug"
                >
                  <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              whileHover={lockoutRemaining === 0 ? { scale: 1.01 } : {}}
              whileTap={lockoutRemaining === 0 ? { scale: 0.99 } : {}}
              className={`w-full py-3.5 bg-primary text-white font-bold text-sm rounded-xl uppercase tracking-wider shadow-lg transition-all active:scale-[0.98] ${
                lockoutRemaining > 0 ? 'bg-white/10 text-white/40 cursor-not-allowed shadow-none' : 'hover:bg-primary/90 cursor-pointer'
              }`}
              type="submit"
              disabled={lockoutRemaining > 0}
            >
              {lockoutRemaining > 0 ? `Locked Out (${lockoutRemaining}s)` : 'Verify Authorization'}
            </motion.button>
          </form>

          {/* Card Footer Actions */}
          <div className="flex justify-between items-center text-xs font-bold tracking-wider text-text-muted border-t border-white/5 pt-5 uppercase">
            <button 
              type="button" 
              onClick={onBack} 
              className="hover:text-primary transition-colors cursor-pointer"
            >
              ← Back to Portal
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 w-full text-center text-[10px] font-bold text-text-muted tracking-[0.3em] uppercase pointer-events-none opacity-40">
        Bilingual Transparency Shield System v2.0
      </div>
    </div>
  );
}
