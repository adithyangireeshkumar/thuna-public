import { motion, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export const SmileyBall = ({
  color,
  size,
  initialX,
  initialY,
  mouseX,
  mouseY,
  state,
  isSneezing = false,
}) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const wanderX = useSpring(0, { stiffness: 20, damping: 10 });
  const wanderY = useSpring(0, { stiffness: 20, damping: 10 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    wanderX.set(0);
    wanderY.set(0);
    return () => window.removeEventListener('resize', handleResize);
  }, [state, wanderX, wanderY]);

  const floatY = useSpring(0, { stiffness: 50, damping: 20 });
  useEffect(() => { floatY.set(0); }, [floatY]);

  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  useEffect(() => { setPosX(initialX); setPosY(initialY); }, [initialX, initialY]);

  const [isBlinking, setIsBlinking] = useState(false);
  useEffect(() => {
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
      const nextBlink = Math.random() * 4000 + 2000;
      return setTimeout(triggerBlink, nextBlink);
    };
    const timeoutId = setTimeout(triggerBlink, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  const dx = (mouseX - windowSize.width * 0.25) / (windowSize.width || 1);
  const dy = (mouseY - windowSize.height * 0.5) / (windowSize.height || 1);

  const eyeX = useSpring(0, { stiffness: 150, damping: 20 });
  const eyeY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    if (state === 'private') { eyeX.set(0); eyeY.set(-size * 0.1); }
    else if (state === 'curious') { eyeX.set(size * 0.2); eyeY.set(0); }
    else if (state === 'confused') { eyeX.set(-size * 0.15); eyeY.set(0); }
    else { eyeX.set(dx * (size * 0.2)); eyeY.set(dy * (size * 0.1)); }
  }, [mouseX, mouseY, dx, dy, state, size, eyeX, eyeY]);

  const tiltX = useSpring(0, { stiffness: 100, damping: 15 });
  const tiltY = useSpring(0, { stiffness: 100, damping: 15 });

  useEffect(() => {
    if (state === 'private') { tiltX.set(-15); tiltY.set(10); }
    else if (state === 'curious') { tiltX.set(0); tiltY.set(35); }
    else if (state === 'success') { tiltX.set(0); tiltY.set(Math.sin(Date.now() / 200) * 5); }
    else if (state === 'confused') { tiltX.set(5); tiltY.set(-45); }
    else { tiltX.set(dy * 15); tiltY.set(dx * 15); }
  }, [state, dx, dy, tiltX, tiltY]);

  const towerHeight = size * 1.8;
  const particles = Array.from({ length: 12 });

  return (
    <motion.div
      animate={{
        x: isSneezing ? [0, -5, 5, -5, 5, 0] : 0,
        y: isSneezing ? [0, -3, 3, -3, 3, 0] : 0,
        rotate: isSneezing ? [0, -2, 2, -2, 2, 0] : 0,
      }}
      transition={isSneezing ? { duration: 0.2, repeat: 2 } : {}}
      style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        width: size,
        height: towerHeight,
        backgroundColor: color,
        borderRadius: size * 0.1,
        left: '50%',
        top: '50%',
        x: wanderX,
        y: floatY,
        marginLeft: posX - (size / 2),
        marginTop: -(towerHeight / 2),
        rotateX: tiltX,
        rotateY: tiltY,
        perspective: 1500,
        zIndex: Math.floor(1000 / size),
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.2) 0%, transparent 20%, rgba(255,255,255,0.4) 30%, transparent 50%, rgba(0,0,0,0.3) 100%),
          radial-gradient(circle at 50% 20%, rgba(255,255,255,0.4) 0%, transparent 60%)
        `,
        boxShadow: `
          inset 0 -20px 30px rgba(0,0,0,0.2),
          inset 0 20px 30px rgba(255,255,255,0.3),
          0 15px 35px rgba(0,0,0,0.2),
          ${state === 'success' ? `0 0 ${size * 0.5}px ${color}88` : 'none'}
        `,
      }}
    >
      {/* Surface Shimmer */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 'inherit',
          background: 'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['200% 0%', '-200% 0%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      {/* Face Container */}
      <motion.div
        style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
        animate={{
          y: state === 'private' ? -12 : (state === 'curious' ? 12 : 0),
          scale: state === 'private' ? 0.75 : 1,
          opacity: state === 'private' ? 0.3 : 1,
        }}
        transition={{ type: 'spring', stiffness: 80, damping: 12 }}
      >
        {/* Eyes */}
        <div style={{ display: 'flex', gap: size * 0.12, marginBottom: size * 0.05, zIndex: 10, position: 'relative' }}>
          {/* Eye Wrinkles */}
          <motion.div
            style={{ position: 'absolute', left: -12, top: '50%', width: 12, height: 2, background: 'rgba(0,0,0,0.1)', borderRadius: 9999 }}
            animate={{
              opacity: (state === 'success' || state === 'confused') ? 0.4 : 0,
              rotate: state === 'success' ? -15 : 15,
              scale: (state === 'success' || state === 'confused') ? 1 : 0,
            }}
          />
          <motion.div
            style={{ position: 'absolute', right: -12, top: '50%', width: 12, height: 2, background: 'rgba(0,0,0,0.1)', borderRadius: 9999 }}
            animate={{
              opacity: (state === 'success' || state === 'confused') ? 0.4 : 0,
              rotate: state === 'success' ? 15 : -15,
              scale: (state === 'success' || state === 'confused') ? 1 : 0,
            }}
          />

          {[0, 1].map((i) => (
            <div key={i} style={{ position: 'relative' }}>
              {/* Eyelashes */}
              <motion.div
                style={{ position: 'absolute', top: '-65%', left: '50%', transform: 'translateX(-50%)', width: '100%', display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 20, padding: '0 2px' }}
                animate={{
                  opacity: state === 'private' ? 0 : 0.8,
                  scale: state === 'private' ? 0.5 : 1.1,
                  y: isBlinking ? (size * 0.08) : (state === 'idle' ? -size * 0.05 : 0),
                  rotate: state === 'confused' ? (i === 0 ? -15 : 15) : (state === 'idle' ? (i === 0 ? -10 : 10) : 0),
                  skewY: state === 'confused' ? (i === 0 ? -5 : 5) : 0,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <svg width={size * 0.18} height={size * 0.15} viewBox="0 0 40 30" style={{ overflow: 'visible' }}>
                  <defs>
                    <linearGradient id={`lashGrad-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#444" />
                      <stop offset="100%" stopColor="#000" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 5 25 Q 2 5 12 20 M 20 25 Q 18 0 28 20 M 35 25 Q 35 5 45 20"
                    stroke={`url(#lashGrad-${i})`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                    filter="drop-shadow(0.5px 0.5px 0.5px rgba(255,255,255,0.4))"
                    transform={i === 1 ? "scale(-1, 1) translate(-40, 0)" : ""}
                  />
                </svg>
              </motion.div>

              <motion.div
                style={{
                  width: size * 0.18, height: size * 0.18, backgroundColor: '#000', borderRadius: 9999,
                  position: 'relative', overflow: 'hidden',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
                  x: eyeX, y: eyeY,
                  backgroundImage: 'radial-gradient(circle at 40% 40%, #222, #000)',
                }}
                animate={{
                  scaleY: state === 'private' ? 0.1 : (isBlinking ? 0.1 : (state === 'confused' ? [1, 0.2, 1] : 1)),
                  height: (state === 'curious' || state === 'success') ? size * 0.22 : size * 0.18,
                }}
                transition={state === 'confused' ? { repeat: Infinity, duration: 1.8, delay: i * 0.2 } : {}}
              >
                <motion.div
                  style={{ position: 'absolute', top: '15%', left: '20%', width: '35%', height: '35%', background: '#fff', borderRadius: 9999, opacity: 0.9 }}
                  animate={{ x: dx * 4, y: dy * 4 }}
                />
              </motion.div>
            </div>
          ))}
        </div>

        {/* Cheeks & Dimples */}
        <div style={{ position: 'absolute', top: '48%', display: 'flex', justifyContent: 'space-between', width: '85%', padding: '0 4px', pointerEvents: 'none' }}>
          <div style={{ position: 'relative' }}>
            <motion.div
              style={{ width: 20, height: 20, borderRadius: 9999, background: 'rgba(0,0,0,0.03)', boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1), 0.5px 0.5px 1px rgba(255,255,255,0.15)' }}
              animate={{ opacity: state === 'success' ? 1 : 0, scale: state === 'success' ? 1 : 0.5, y: state === 'success' ? -2 : 0 }}
            />
            <motion.svg width="24" height="16" viewBox="0 0 24 16" style={{ position: 'absolute', top: -12, left: -12 }}
              animate={{ opacity: state === 'curious' ? 0.25 : 0, scale: state === 'curious' ? 1 : 0.8 }}>
              <path d="M 4 12 Q 10 4 18 12" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            </motion.svg>
          </div>
          <div style={{ position: 'relative' }}>
            <motion.div
              style={{ width: 20, height: 20, borderRadius: 9999, background: 'rgba(0,0,0,0.03)', boxShadow: 'inset -2px 2px 4px rgba(0,0,0,0.1), -0.5px 0.5px 1px rgba(255,255,255,0.15)' }}
              animate={{ opacity: state === 'success' ? 1 : 0, scale: state === 'success' ? 1 : 0.5, y: state === 'success' ? -2 : 0 }}
            />
            <motion.svg width="24" height="16" viewBox="0 0 24 16" style={{ position: 'absolute', top: -12, right: -12 }}
              animate={{ opacity: state === 'curious' ? 0.25 : 0, scale: state === 'curious' ? 1 : 0.8 }}>
              <path d="M 20 12 Q 14 4 6 12" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
            </motion.svg>
          </div>
        </div>

        {/* Mouth */}
        <div style={{ position: 'relative', marginTop: 8, zIndex: 10 }}>
          <svg width={size * 0.65} height={size * 0.35} viewBox="0 0 100 60"
            style={{ filter: 'drop-shadow(0 3px 3px rgba(0,0,0,0.3))' }}>
            <motion.path
              fill="none" stroke="black" strokeWidth="7" strokeLinecap="round"
              animate={{
                d: state === 'success'
                  ? "M 15 20 Q 50 75 85 20"
                  : state === 'confused'
                  ? "M 30 50 Q 50 40 70 50"
                  : state === 'curious'
                  ? "M 40 40 A 10 10 0 1 0 60 40 A 10 10 0 1 0 40 40"
                  : state === 'private'
                  ? "M 35 35 L 65 35"
                  : `M 15 ${40 - (Math.abs(dx) * 10)} Q 50 ${65 + (Math.abs(dy) * 10)} 85 ${40 - (Math.abs(dx) * 10)}`,
                strokeWidth: state === 'curious' ? 5 : 7,
              }}
              transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            />
          </svg>
          {state === 'success' && (
            <motion.div
              initial={{ scale: 0, y: -5 }}
              animate={{ scale: 1, y: 0 }}
              style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)', width: 16, height: 24, background: '#f472b6', borderRadius: '0 0 9999px 9999px', border: '2px solid black', zIndex: -1 }}
            />
          )}
        </div>

        {/* Sneeze Particles */}
        {isSneezing && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}>
            {particles.map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: Math.random() * 0.5 + 0.2,
                  x: (Math.random() - 0.5) * 120,
                  y: (Math.random() - 0.5) * 80 + 20,
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ position: 'absolute', left: '50%', top: '50%', width: 8, height: 8, background: 'rgba(255,255,255,0.6)', borderRadius: 9999, filter: 'blur(1px)' }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
