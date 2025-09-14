import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getRandomDemoData } from './DemoData';
import happyTreeImage from '../assets/happy_tree.jpg';
import greenRoastLogo from '../assets/GreenRoastLogo.png';

const LandingPage = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    const value = e.target.value;
    setPrompt(value);
    
    // Show laughing animation when typing
    if (value.length > 0) {
      setIsTyping(true);
      
      // Clear existing timeout
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      
      // Set new timeout to stop laughing after user stops typing
      const newTimeout = setTimeout(() => {
        setIsTyping(false);
      }, 1000); // Stop laughing 1 second after user stops typing
      
      setTypingTimeout(newTimeout);
    } else {
      // If input is empty, stop laughing immediately
      setIsTyping(false);
      if (typingTimeout) {
        clearTimeout(typingTimeout);
        setTypingTimeout(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      setIsLoading(true);
      try {
        // Call the backend API
        const response = await fetch('/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: prompt.trim() }),
        });
        
        if (response.ok) {
          const data = await response.json();
          navigate('/results', { state: { analysisData: data } });
        } else {
          // For demo purposes, use demo data if API fails
          const demoData = getRandomDemoData();
          navigate('/results', { state: { analysisData: demoData } });
        }
      } catch (error) {
        console.error('Error calling API:', error);
        // Use demo data for demo
        const demoData = getRandomDemoData();
        navigate('/results', { state: { analysisData: demoData } });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-pattern">
      {/* Enhanced Navigation */}
      {/* <nav className="nav-modern px-6 py-4" style={{ 
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(229, 229, 229, 0.3)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <motion.div 
            style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)',
                overflow: 'hidden'
              }}
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img 
                src={greenRoastLogo} 
                alt="Green Roast Logo" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain'
                }}
              />
            </motion.div>
            <h1 className="title-font" style={{ 
              fontSize: '28px', 
              fontWeight: '800', 
              color: '#262626',
              background: 'linear-gradient(135deg, #16a34a, #22c55e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Green Roast</h1>
          </motion.div>
          
          <motion.button
            style={{ 
              color: '#737373', 
              fontSize: '14px', 
              fontWeight: '500', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#404040'}
            onMouseLeave={(e) => e.target.style.color = '#737373'}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            
          </motion.button>
        </div>
      </nav> */}

      {/* Enhanced Hero Section */}
      <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '100px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '896px', margin: '0 auto' }}>
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="title-font"
              style={{
                fontSize: '84px',
                fontWeight: '900',
                color: '#171717',
                marginBottom: '32px',
                letterSpacing: '-0.03em',
                lineHeight: '0.9',
                background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #16a34a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 4px 20px rgba(34, 197, 94, 0.2)'
              }}
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Green Roast
            </motion.h1>
            <motion.p 
              className="subtitle-font"
              style={{
                fontSize: '24px',
                color: '#525252',
                marginBottom: '56px',
                maxWidth: '600px',
                margin: '0 auto 56px auto',
                lineHeight: '1.7',
                fontWeight: '500'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              🌱 Discover the environmental impact of your AI prompts and get roasted for your carbon footprint! 
            </motion.p>
          </motion.div>

          {/* Enhanced Main Content with Straight Side-by-Side Layout */}
          <motion.div
            className="landing-layout"
            style={{ 
              maxWidth: '1200px', 
              margin: '0 auto',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '80px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              padding: '0 20px',
              marginTop: '-40px'
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            {/* Tree Mascot - Left Side */}
            <motion.div 
              className="tree-section"
              style={{ 
                flex: '0 0 auto',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '300px',
                height: '400px',
                paddingTop: '0px'
              }}
              initial={{ opacity: 0, scale: 0.8, x: -50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            >
              {/* Floating particles around tree */}
              <div style={{
                position: 'absolute',
                top: '-30px',
                left: '-30px',
                right: '-30px',
                bottom: '-30px',
                pointerEvents: 'none'
              }}>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: '6px',
                      height: '6px',
                      background: '#22c55e',
                      borderRadius: '50%',
                      left: `${15 + (i * 12)}%`,
                      top: `${20 + (i * 8)}%`,
                      opacity: 0.6
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.5, 1.2, 0.5]
                    }}
                    transition={{
                      duration: 4 + (i * 0.3),
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
              
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  scale: isTyping ? [1, 1.15, 1] : 1,
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: isTyping ? 0.6 : 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ 
                  filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15))',
                  transform: 'perspective(1000px)'
                }}
              >
                <motion.div
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                    borderRadius: '30px',
                    padding: '20px',
                    border: '3px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 20px 60px rgba(34, 197, 94, 0.2)'
                  }}
                  animate={{
                    boxShadow: [
                      '0 20px 60px rgba(34, 197, 94, 0.2)',
                      '0 25px 80px rgba(34, 197, 94, 0.3)',
                      '0 20px 60px rgba(34, 197, 94, 0.2)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <img 
                    src={happyTreeImage} 
                    alt="Happy Tree" 
                    style={{ 
                      width: '140px', 
                      height: '180px',
                      objectFit: 'contain',
                      borderRadius: '20px'
                    }}
                  />
                </motion.div>
              </motion.div>
              
              {/* Tree status indicator */}
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '-20px',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '700',
                  boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                {isTyping ? '🌱 Typing...' : '🌱 Ready!'}
              </motion.div>
            </motion.div>

            {/* Content Section - Right Side */}
            <motion.div
              className="content-section"
              style={{ 
                flex: '1',
                minWidth: '450px',
                maxWidth: '600px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                textAlign: 'center',
                paddingTop: '0px'
              }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            >
            <motion.h2 
              className="title-font"
              style={{
                fontSize: '56px',
                fontWeight: '800',
                color: '#171717',
                marginBottom: '32px',
                letterSpacing: '-0.03em',
                lineHeight: '1.1',
                background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Ask a Question 🤔
            </motion.h2>

            <motion.p 
              className="subtitle-font"
              style={{
                fontSize: '20px',
                color: '#525252',
                marginBottom: '56px',
                lineHeight: '1.7',
                fontWeight: '500'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              🌍 Paste your AI prompt below and let's see how much carbon footprint it's packing! 
            </motion.p>

            {/* Enhanced Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%', alignItems: 'center' }}>
              {/* Enhanced Input Field */}
              <motion.div
                style={{ position: 'relative', width: '100%', maxWidth: '500px' }}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.input
                  type="text"
                  value={prompt}
                  onChange={handleInputChange}
                  placeholder="🌱 Enter your AI prompt here..."
                  style={{ 
                    width: '100%',
                    border: '3px solid #e5e5e5',
                    borderRadius: '20px',
                    padding: '24px 28px',
                    fontSize: '20px',
                    fontWeight: '500',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                  disabled={isLoading}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#22c55e';
                    e.target.style.boxShadow = '0 0 0 4px rgba(34, 197, 94, 0.1), 0 12px 40px rgba(0, 0, 0, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e5e5';
                    e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                />
                
                {/* Input glow effect when typing */}
                {isTyping && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      left: '-2px',
                      right: '-2px',
                      bottom: '-2px',
                      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                      borderRadius: '22px',
                      zIndex: -1,
                      opacity: 0.3
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.div>

              {/* Enhanced Submit Button */}
              <motion.button
                type="submit"
                style={{
                  width: '100%',
                  maxWidth: '500px',
                  padding: '28px',
                  borderRadius: '20px',
                  fontSize: '22px',
                  fontWeight: '700',
                  border: 'none',
                  cursor: prompt.trim() && !isLoading ? 'pointer' : 'not-allowed',
                  background: prompt.trim() && !isLoading ? 'linear-gradient(135deg, #16a34a, #22c55e)' : '#e5e5e5',
                  color: prompt.trim() && !isLoading ? 'white' : '#a3a3a3',
                  transition: 'all 0.3s ease',
                  boxShadow: prompt.trim() && !isLoading ? '0 12px 40px rgba(34, 197, 94, 0.3)' : 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontFamily: 'Poppins, sans-serif',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  if (prompt.trim() && !isLoading) {
                    e.target.style.background = 'linear-gradient(135deg, #15803d, #16a34a)';
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 20px 60px rgba(34, 197, 94, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (prompt.trim() && !isLoading) {
                    e.target.style.background = 'linear-gradient(135deg, #16a34a, #22c55e)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 12px 40px rgba(34, 197, 94, 0.3)';
                  }
                }}
                whileHover={prompt.trim() && !isLoading ? { scale: 1.02 } : {}}
                whileTap={prompt.trim() && !isLoading ? { scale: 0.98 } : {}}
                disabled={!prompt.trim() || isLoading}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                {isLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                    <motion.div
                      style={{
                        width: '28px',
                        height: '28px',
                        border: '3px solid white',
                        borderTop: '3px solid transparent',
                        borderRadius: '50%'
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>🌱 Analyzing Your Carbon Footprint...</span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    <span>🌍</span>
                    <span>Analyze Carbon Footprint</span>
                    <span>🔥</span>
                  </div>
                )}
                
                {/* Button shimmer effect */}
                {prompt.trim() && !isLoading && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      borderRadius: '20px'
                    }}
                    animate={{ left: ['100%', '100%'] }}
                    transition={{ duration: 2, delay: 1.8, ease: "easeInOut" }}
                  />
                )}
              </motion.button>
            </form>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <motion.footer
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(250, 250, 250, 0.9), rgba(248, 250, 252, 0.9))',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(229, 229, 229, 0.3)',
          padding: '64px 0',
          marginTop: '80px'
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <motion.div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <span style={{ fontSize: '24px' }}>🌱</span>
            <span style={{ fontSize: '24px' }}>🌍</span>
            <span style={{ fontSize: '24px' }}>🔥</span>
          </motion.div>
          
          <motion.p 
            className="meme-text"
            style={{ 
              color: '#525252', 
              fontSize: '20px', 
              fontWeight: '600',
              margin: 0,
              lineHeight: '1.6'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            Making AI more sustainable, one prompt at a time! 🚀
          </motion.p>
          
          <motion.p 
            style={{ 
              color: '#737373', 
              fontSize: '14px', 
              fontWeight: '400',
              margin: '16px 0 0 0',
              opacity: 0.8
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            Built with ❤️ for a greener future
          </motion.p>
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;
