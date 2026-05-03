import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { SmileyBall } from '../components/SmileyBall';

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    background: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Inter", system-ui, sans-serif',
  },
  bgPattern: {
    position: 'absolute',
    inset: 0,
    opacity: 0.2,
    pointerEvents: 'none',
    backgroundImage: 'radial-gradient(#e5e7eb 1.5px, transparent 1.5px)',
    backgroundSize: '32px 32px',
  },
  innerWrap: {
    width: '100%',
    maxWidth: '80rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 3rem',
    zIndex: 10,
    margin: '0 auto',
  },
  smileyArea: {
    position: 'relative',
    width: '50%',
    height: 400,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    padding: 48,
    background: '#fff',
    borderRadius: 40,
    boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
    border: '1px solid #f3f4f6',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: 40,
  },
  header: { marginBottom: 40, textAlign: 'center' },
  h1: {
    fontSize: '2.25rem',
    fontWeight: 900,
    color: '#111827',
    letterSpacing: '-0.025em',
    marginBottom: 8,
    textTransform: 'uppercase',
    lineHeight: 1.1,
    margin: '0 0 8px',
  },
  subtitle: { color: '#9ca3af', fontWeight: 500, letterSpacing: '0.05em', margin: 0 },
  form: { width: '100%', display: 'flex', flexDirection: 'column', gap: 32 },
  fieldWrap: { position: 'relative' },
  fieldLabel: (active) => ({
    position: 'absolute',
    top: -12,
    left: 24,
    background: '#fff',
    padding: '0 8px',
    fontSize: 10,
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    transition: 'color 0.2s',
    color: active ? '#4D96FF' : '#d1d5db',
    zIndex: 1,
  }),
  input: (active) => ({
    width: '100%',
    height: 64,
    padding: '0 32px',
    borderRadius: 9999,
    border: `2px solid ${active ? '#4D96FF' : '#f3f4f6'}`,
    background: active ? 'rgba(239,246,255,0.2)' : 'rgba(239,246,255,0.1)',
    color: '#1f2937',
    fontWeight: 700,
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.2s',
    boxShadow: active ? '0 0 0 4px rgba(77,150,255,0.05)' : 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  }),
  dots: {
    position: 'absolute',
    right: 24,
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    gap: 4,
    opacity: 0.2,
  },
  dot: { width: 6, height: 6, background: '#4D96FF', borderRadius: 9999 },
  eyeBtn: {
    position: 'absolute',
    right: 24,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    color: '#d1d5db',
    cursor: 'pointer',
    transition: 'color 0.2s',
    padding: 0,
  },
  error: {
    fontSize: 12,
    fontWeight: 900,
    color: '#f43f5e',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  submit: {
    width: '100%',
    height: 64,
    background: '#111827',
    color: '#fff',
    borderRadius: 9999,
    fontWeight: 900,
    fontSize: '1.125rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.2s',
    boxShadow: '0 20px 25px -5px rgba(209,213,219,1)',
    fontFamily: 'inherit',
  },
  footer: {
    marginTop: 40,
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    fontSize: 10,
    fontWeight: 900,
    color: '#d1d5db',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
  },
  footerBtn: {
    background: 'none',
    border: 'none',
    color: '#d1d5db',
    cursor: 'pointer',
    transition: 'color 0.2s',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    letterSpacing: 'inherit',
    textTransform: 'inherit',
    fontFamily: 'inherit',
    padding: 0,
  },
  bottomText: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    textAlign: 'center',
    color: '#e5e7eb',
    fontSize: 10,
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '0.4em',
    pointerEvents: 'none',
  },
  blob: (pos) => ({
    position: 'absolute',
    width: 256,
    height: 256,
    borderRadius: 9999,
    filter: 'blur(48px)',
    zIndex: -1,
    animation: 'pulse 2s ease-in-out infinite',
    ...(pos === 'top' ? { top: 40, right: 40, background: '#eef2ff' } : { bottom: 40, left: 40, background: '#fff1f2', animationDelay: '1s' }),
  }),
};

export default function AuthView({ authGranted, onGrant, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [appState, setAppState] = useState('idle');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSneezing, setIsSneezing] = useState(false);

  const containerRef = useRef(null);
  const lastKeyTime = useRef(0);
  const typeCounter = useRef(0);

  const triggerSneeze = () => {
    setIsSneezing(true);
    setTimeout(() => setIsSneezing(false), 800);
  };

  const smileys = [
    { id: 'sunny', color: '#FFD93D', size: 130, xOffset: -180 },
    { id: 'berry', color: '#FF6B6B', size: 95, xOffset: -85 },
    { id: 'sky', color: '#6BCBFF', size: 65, xOffset: -15 },
    { id: 'minto', color: '#6BFFB8', size: 110, xOffset: 65 },
    { id: 'grape', color: '#D26BFF', size: 85, xOffset: 155 },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (focusedField === 'email') { setAppState('curious'); setError(''); }
    else if (focusedField === 'password') { setAppState('private'); setError(''); }
    else if (appState !== 'confused' && appState !== 'success') { setAppState('idle'); }
  }, [focusedField, appState]);

  const handleTyping = (setter) => (e) => {
    setter(e.target.value);
    const now = Date.now();
    if (now - lastKeyTime.current < 150) {
      typeCounter.current++;
      if (typeCounter.current > 6) { triggerSneeze(); typeCounter.current = 0; }
    } else { typeCounter.current = 0; }
    lastKeyTime.current = now;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.includes('@') || password.length < 6) {
      setAppState('confused');
      setError('Wrong password! We are disappointed.');
      setTimeout(() => {
        setAppState(focusedField === 'email' ? 'curious' : (focusedField === 'password' ? 'private' : 'idle'));
        setError('');
      }, 3000);
    } else {
      setAppState('success');
      setError('');
      setTimeout(() => { setAppState('idle'); onGrant(); }, 2000);
    }
  };

  return (
    <div ref={containerRef} style={styles.container}>
      <div style={styles.bgPattern} />

      <div style={styles.innerWrap}>
        {/* Left: Smileys */}
        <div style={styles.smileyArea}>
          {smileys.map((s) => (
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

        {/* Right: Login Card */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, rotate: appState === 'confused' ? [0, -1, 1, -1, 1, 0] : 0 }}
          transition={{ rotate: { duration: 0.4 }, default: { type: 'spring', damping: 20, stiffness: 100 } }}
          style={styles.card}
        >
          <div style={styles.header}>
            <h1 style={styles.h1}>Hello there!</h1>
            <p style={styles.subtitle}>Welcome back to the fun zone</p>
          </div>

          <form onSubmit={handleLogin} style={styles.form}>
            {/* Email */}
            <div style={styles.fieldWrap}>
              <span style={styles.fieldLabel(focusedField === 'email')}>Email Address</span>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  value={email}
                  onChange={handleTyping(setEmail)}
                  onFocus={() => { setFocusedField('email'); typeCounter.current = 0; }}
                  onBlur={() => { setFocusedField(null); if (email.length > 0 && email.length < 5) triggerSneeze(); }}
                  style={styles.input(focusedField === 'email')}
                  placeholder="curious.user@gmail.com"
                  required
                />
                <div style={styles.dots}>
                  <div style={styles.dot} />
                  <div style={styles.dot} />
                </div>
              </div>
            </div>

            {/* Password */}
            <div style={styles.fieldWrap}>
              <span style={styles.fieldLabel(focusedField === 'password')}>Password</span>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handleTyping(setPassword)}
                  onFocus={() => { setFocusedField('password'); typeCounter.current = 0; }}
                  onBlur={() => { setFocusedField(null); if (password.length > 0 && password.length < 4) triggerSneeze(); }}
                  style={styles.input(focusedField === 'password')}
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                  {showPassword ? <EyeOff style={{ width: 20, height: 20 }} /> : <Eye style={{ width: 20, height: 20 }} />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={styles.error}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={styles.submit}
              type="submit"
            >
              Hop In!
            </motion.button>
          </form>

          <div style={styles.footer}>
            <button type="button" onClick={onBack} style={styles.footerBtn}>Back to Portal</button>
          </div>
        </motion.div>
      </div>

      <div style={styles.bottomText}>The smilies are watching your progress</div>

      {/* Floating blobs */}
      <div style={styles.blob('top')} />
      <div style={styles.blob('bottom')} />
    </div>
  );
}
