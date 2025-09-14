import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import happyTreeImage from '../assets/happy_tree.jpg';
import smileTreeImage from '../assets/smile_tree.jpg';
import sadTreeImage from '../assets/sad_tree.jpg';
import greenRoastLogo from '../assets/GreenRoastLogo.png';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const analysisData = location.state?.analysisData;
  
  const [currentRoastIndex, setCurrentRoastIndex] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [songLoading, setSongLoading] = useState(false);
  const [song, setSong] = useState(null);

  // Mock multiple roasts for demonstration
  const roasts = analysisData?.roast ? [analysisData.roast] : [
    "Bro, you're choking the planet with that prompt!",
    "That's enough CO₂ to power a small country!",
    "Your prompt is more toxic than a coal plant!",
    "Even trees are crying looking at this carbon footprint!"
  ];

  // Get the appropriate tree image based on carbon footprint level (in grams)
  const getTreeImage = (carbonCost) => {
    if (carbonCost < 0.1) return happyTreeImage;      // Efficient - happy tree
    if (carbonCost < 0.5) return smileTreeImage;    // Moderate - smile tree  
    return sadTreeImage;                          // Wasteful - sad tree
  };

  const treeImage = getTreeImage(analysisData?.carbon_cost || 0);
  
  // Get appropriate alt text for the tree
  const getTreeAltText = (carbonCost) => {
    if (carbonCost < 0.1) return "Happy Tree - Efficient";
    if (carbonCost < 0.5) return "Smile Tree - Moderate";
    return "Sad Tree - Wasteful";
  };

  // Get meme-friendly messages based on carbon footprint
  const getMemeMessage = (carbonCost) => {
    if (carbonCost < 0.1) return "🌱 This tree is THRIVING! Your prompt is basically plant food!";
    if (carbonCost < 0.5) return "😊 This tree is vibing! Not too shabby, not too crazy!";
    return "😢 This tree is NOT having it! Your prompt is giving it climate anxiety!";
  };

  // Get fun impact emoji
  const getImpactEmoji = (carbonCost) => {
    if (carbonCost < 0.1) return "🌱";
    if (carbonCost < 0.5) return "😊";
    return "😢";
  };

  // Calculate progress bar color and width
  const getProgressColor = (carbonCost) => {
    if (carbonCost < 0.1) return "#22c55e, #16a34a";
    if (carbonCost < 0.5) return "#eab308, #ca8a04";
    return "#ef4444, #dc2626";
  };

  const getProgressWidth = (carbonCost) => {
    // Position based on impact level ranges - fill the appropriate section
    if (carbonCost < 0.1) {
      // Efficient: Fill most of the efficient section (0-25%)
      return 8; // Fill most of the efficient section
    } else if (carbonCost < 0.5) {
      // Moderate: Fill the moderate section (33-66%)
      return 50; // Always fill to the end of moderate section
    } else {
      // Wasteful: Fill the wasteful section (66-100%)
      return 100; // Always fill to the end of wasteful section
    }
  };

  const getImpactLevel = (carbonCost) => {
    if (carbonCost < 0.1) return { level: "Efficient", color: "#16a34a", bg: "#f0fdf4" };
    if (carbonCost < 0.5) return { level: "Moderate", color: "#ca8a04", bg: "#fefce8" };
    return { level: "Wasteful", color: "#dc2626", bg: "#fef2f2" };
  };

  useEffect(() => {
    // Animate progress bar
    const timer = setTimeout(() => {
      setProgressWidth(getProgressWidth(analysisData?.carbon_cost || 0));
    }, 500);
    return () => clearTimeout(timer);
  }, [analysisData?.carbon_cost]);

  const handleNextRoast = () => {
    setCurrentRoastIndex((prev) => (prev + 1) % roasts.length);
  };

  const handleNewPrompt = () => {
    navigate('/');
  };

  const generateSong = async () => {
    if (!analysisData) return;
    
    setSongLoading(true);
    setSong(null);
    
    try {
      const response = await fetch('/song', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: analysisData.prompt,
          roast: analysisData.roast,
          style: 'kendrick'
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate song');
      }
      
      const songData = await response.json();
      setSong(songData);
    } catch (error) {
      console.error('Error generating song:', error);
      // You could add a toast notification here
    } finally {
      setSongLoading(false);
    }
  };

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 flex items-center justify-center p-4">
        <motion.div 
          className="bg-white rounded-3xl shadow-large p-8 text-center max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">No Analysis Data</h2>
          <p className="text-neutral-600 mb-6">It looks like there's no analysis data to display.</p>
          <button 
            onClick={handleNewPrompt}
            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3 rounded-2xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-medium hover:shadow-large transform hover:-translate-y-0.5"
          >
            Start New Analysis
          </button>
        </motion.div>
      </div>
    );
  }

  const impactLevel = getImpactLevel(analysisData.carbon_cost);

  return (
    <div className="min-h-screen bg-pattern">
      {/* Navigation */}
      <nav className="nav-modern px-6 py-4">
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <motion.div 
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <img 
                src={greenRoastLogo} 
                alt="Green Roast Logo" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain'
                }}
              />
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#262626' }}>Green Roast</h1>
          </motion.div>
          
          <motion.button
            onClick={handleNewPrompt}
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
            New Analysis
          </motion.button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px' }}>
        <motion.div 
          className="card-modern"
          style={{ 
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255,255,255,0.1)'
          }}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Header */}
          <div style={{ 
            background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #16a34a 100%)', 
            padding: '40px 32px', 
            textAlign: 'left',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Animated background elements */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              animation: 'spin 20s linear infinite'
            }}></div>
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '16px'
                }}
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span style={{ fontSize: '48px' }}>{getImpactEmoji(analysisData?.carbon_cost || 0)}</span>
                <h1
                  style={{
                    color: 'white',
                    fontSize: '42px',
                    fontWeight: 'bold',
                    margin: 0,
                    letterSpacing: '-0.025em',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  Analysis Results
                </h1>
                <span style={{ fontSize: '48px' }}>{getImpactEmoji(analysisData?.carbon_cost || 0)}</span>
              </motion.div>
              
              <motion.p
                style={{
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontSize: '20px',
                  fontWeight: '500',
                  margin: 0,
                  textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {getMemeMessage(analysisData?.carbon_cost || 0)}
              </motion.p>
            </motion.div>
          </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          {/* Results Section */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '32px', marginBottom: '32px' }}>
            {/* Tree Mascot */}
            <motion.div 
              style={{ 
                flexShrink: 0,
                position: 'relative'
              }}
              key={treeImage}
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Floating particles around tree */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '-20px',
                right: '-20px',
                bottom: '-20px',
                pointerEvents: 'none'
              }}>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: '4px',
                      height: '4px',
                      background: analysisData?.carbon_cost < 0.1 ? '#22c55e' : analysisData?.carbon_cost < 0.5 ? '#eab308' : '#ef4444',
                      borderRadius: '50%',
                      left: `${20 + (i * 15)}%`,
                      top: `${30 + (i * 10)}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 3 + (i * 0.5),
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
              
              <motion.div
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.15))',
                  transform: 'perspective(1000px)'
                }}
              >
                <img 
                  src={treeImage} 
                  alt={getTreeAltText(analysisData?.carbon_cost || 0)} 
                  style={{ 
                    width: '120px',
                    height: '140px',
                    objectFit: 'contain',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                    padding: '8px',
                    border: '2px solid rgba(255,255,255,0.2)'
                  }}
                />
              </motion.div>
              
              {/* Tree status badge */}
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: '-10px',
                  right: '-10px',
                  background: analysisData?.carbon_cost < 0.1 ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 
                             analysisData?.carbon_cost < 0.5 ? 'linear-gradient(135deg, #eab308, #ca8a04)' : 
                             'linear-gradient(135deg, #ef4444, #dc2626)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                {analysisData?.carbon_cost < 0.1 ? '🌱' : analysisData?.carbon_cost < 0.5 ? '😊' : '😢'}
              </motion.div>
            </motion.div>

            {/* Results Info */}
            <div style={{ flex: 1 }}>
              <motion.h2 
                style={{ 
                  fontSize: '36px', 
                  fontWeight: 'bold', 
                  color: '#262626', 
                  marginBottom: '24px',
                  letterSpacing: '-0.025em'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Analysis Results
              </motion.h2>
              
              {/* Stats Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '24px', 
                marginBottom: '32px' 
              }}>
                {/* Original Length Card */}
                <motion.div 
                  style={{
                    background: 'linear-gradient(135deg, #fafafa, white)',
                    border: '1px solid #e5e5e5',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 2px 15px -3px rgba(0, 0, 0, 0.07)'
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <p style={{ 
                      color: '#525252', 
                      fontSize: '12px', 
                      fontWeight: '500', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.05em' 
                    }}>
                      Tokens used:
                    </p>
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      background: '#dcfce7', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      <span style={{ color: '#16a34a', fontSize: '14px', fontWeight: 'bold' }}>📝</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#262626', margin: 0 }}>
                    {analysisData.tokens.toLocaleString()}
                  </p>
                  <p style={{ color: '#737373', fontSize: '14px', margin: '4px 0 0 0' }}>tokens</p>
                </motion.div>

                {/* Carbon Footprint Card */}
                <motion.div 
                  style={{
                    background: `linear-gradient(135deg, ${impactLevel.bg}, white)`,
                    border: '1px solid #e5e5e5',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 2px 15px -3px rgba(0, 0, 0, 0.07)'
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <p style={{ 
                      color: '#525252', 
                      fontSize: '12px', 
                      fontWeight: '500', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.05em' 
                    }}>
                      Carbon Footprint
                    </p>
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      background: impactLevel.bg,
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      <span style={{ fontSize: '14px' }}>🌍</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#262626', margin: 0 }}>
                    {analysisData.carbon_cost}
                  </p>
                  <p style={{ color: '#737373', fontSize: '14px', margin: '4px 0 8px 0' }}>g CO₂</p>
                  <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    fontWeight: '600',
                    background: impactLevel.bg,
                    color: impactLevel.color
                  }}>
                    {impactLevel.level} Impact
                  </div>
                </motion.div>

                {/* Efficiency Score Card */}
                <motion.div 
                  style={{
                    background: 'linear-gradient(135deg, #f0f9ff, white)',
                    border: '1px solid #e5e5e5',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 2px 15px -3px rgba(0, 0, 0, 0.07)'
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <p style={{ 
                      color: '#525252', 
                      fontSize: '12px', 
                      fontWeight: '500', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.05em' 
                    }}>
                      Efficiency Score:
                    </p>
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      background: '#dbeafe', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      <span style={{ color: '#2563eb', fontSize: '14px', fontWeight: 'bold' }}>⚡</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#262626', margin: 0 }}>
                    {Math.round(analysisData.efficiency_score || 0)}/100
                  </p>
                  <p style={{ color: '#737373', fontSize: '14px', margin: '4px 0 0 0' }}>points</p>
                </motion.div>
              </div>

              {/* Progress Bar Section */}
              <motion.div 
                style={{ 
                  marginBottom: '32px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(248,250,252,0.8))',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '20px',
                  padding: '24px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.5)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {/* Animated background pattern */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `radial-gradient(circle at 20% 20%, ${impactLevel.bg}20 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${impactLevel.bg}15 0%, transparent 50%)`,
                  opacity: 0.3
                }}></div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  marginBottom: '16px',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <motion.span 
                    style={{ 
                      color: '#404040', 
                      fontWeight: '700', 
                      fontSize: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                  >
                    🌍 Environmental Impact Scale
                  </motion.span>
                  <motion.span 
                    style={{ 
                      color: '#737373', 
                      fontSize: '14px',
                      background: 'rgba(255,255,255,0.7)',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontWeight: '500'
                    }}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.4 }}
                  >
                    0 - 2.0 g CO₂
                  </motion.span>
                </div>
                
                {/* Enhanced Progress Bar */}
                <div style={{ 
                  width: '100%', 
                  background: 'linear-gradient(90deg, #f3f4f6, #e5e7eb)', 
                  borderRadius: '20px', 
                  height: '28px', 
                  overflow: 'hidden',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <motion.div 
                    style={{
                      height: '100%',
                      borderRadius: '20px',
                      background: `linear-gradient(90deg, ${getProgressColor(analysisData.carbon_cost)})`,
                      boxShadow: `0 0 20px ${impactLevel.color}40, 0 2px 8px rgba(0,0,0,0.2)`,
                      position: 'relative'
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressWidth}%` }}
                    transition={{ duration: 2, delay: 1.2, ease: "easeOut" }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                        borderRadius: '20px'
                      }}
                      animate={{ left: ['100%', '100%'] }}
                      transition={{ duration: 2, delay: 2.5, ease: "easeInOut" }}
                    />
                  </motion.div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '13px', 
                  color: '#737373', 
                  marginTop: '12px',
                  fontWeight: '600',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <span>🌱 Efficient</span>
                  <span>😊 Moderate</span>
                  <span>😢 Wasteful</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Roast Section */}
          <motion.div 
            style={{
              background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 50%, #fff7ed 100%)',
              border: '2px solid #fed7aa',
              borderRadius: '24px',
              padding: '36px',
              marginBottom: '32px',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.5)',
              position: 'relative',
              overflow: 'hidden'
            }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {/* Animated fire background */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(251, 146, 60, 0.2) 0%, transparent 70%)',
              borderRadius: '50%',
              animation: 'spin 8s linear infinite'
            }}></div>
            
            <motion.div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '16px', 
                marginBottom: '20px',
                position: 'relative',
                zIndex: 1
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <motion.div 
                style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: 'linear-gradient(135deg, #fed7aa, #fdba74)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(251, 146, 60, 0.3)'
                }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span style={{ color: '#ea580c', fontSize: '24px' }}>🔥</span>
              </motion.div>
              <h3 style={{ 
                color: '#9a3412', 
                fontSize: '22px', 
                fontWeight: '700', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em',
                margin: 0,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                The Roast 🔥
              </h3>
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRoastIndex}
                style={{ position: 'relative', zIndex: 1 }}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <motion.p 
                  style={{ 
                    fontSize: '26px', 
                    fontWeight: 'bold', 
                    color: '#7c2d12', 
                    lineHeight: '1.6',
                    margin: 0,
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    background: 'linear-gradient(135deg, #7c2d12, #9a3412)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {roasts[currentRoastIndex]}
                </motion.p>
              </motion.div>
            </AnimatePresence>
            
            {roasts.length > 1 && (
              <motion.div
                style={{ marginTop: '24px', position: 'relative', zIndex: 1 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.4 }}
              >
                <motion.button 
                  onClick={handleNextRoast}
                  style={{ 
                    background: 'linear-gradient(135deg, #ea580c, #dc2626)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '16px 32px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(234, 88, 12, 0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 12px 35px rgba(234, 88, 12, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      '0 8px 25px rgba(234, 88, 12, 0.3)',
                      '0 12px 35px rgba(234, 88, 12, 0.4)',
                      '0 8px 25px rgba(234, 88, 12, 0.3)'
                    ]
                  }}
                  transition={{
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    Next Roast 🔥
                  </span>
                  {/* Button shimmer effect */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      borderRadius: '16px'
                    }}
                    animate={{ left: ['100%', '100%'] }}
                    transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
                  />
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* Roast Song Section */}
          <motion.div 
            style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fef3c7 100%)',
              border: '2px solid #fde68a',
              borderRadius: '24px',
              padding: '36px',
              marginBottom: '32px',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.5)',
              position: 'relative',
              overflow: 'hidden'
            }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {/* Animated music background */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%)',
              borderRadius: '50%',
              animation: 'spin 10s linear infinite'
            }}></div>
            
            <motion.div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '16px', 
                marginBottom: '20px',
                position: 'relative',
                zIndex: 1
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <motion.div 
                style={{ 
                  width: '48px', 
                  height: '48px', 
                  background: 'linear-gradient(135deg, #fde68a, #f59e0b)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span style={{ color: '#d97706', fontSize: '24px' }}>🎵</span>
              </motion.div>
              <h3 style={{ 
                color: '#92400e', 
                fontSize: '22px', 
                fontWeight: '700', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em',
                margin: 0,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                Roast Song 🎤
              </h3>
            </motion.div>

            <motion.div
              style={{ position: 'relative', zIndex: 1 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <motion.button 
                onClick={generateSong}
                disabled={songLoading}
                style={{ 
                  background: songLoading ? 'linear-gradient(135deg, #9ca3af, #6b7280)' : 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '16px 32px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: songLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: songLoading ? '0 4px 15px rgba(156, 163, 175, 0.3)' : '0 8px 25px rgba(245, 158, 11, 0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: song ? '24px' : '0'
                }}
                whileHover={songLoading ? {} : { 
                  scale: 1.05,
                  boxShadow: '0 12px 35px rgba(245, 158, 11, 0.4)'
                }}
                whileTap={songLoading ? {} : { scale: 0.95 }}
                animate={songLoading ? {} : {
                  boxShadow: [
                    '0 8px 25px rgba(245, 158, 11, 0.3)',
                    '0 12px 35px rgba(245, 158, 11, 0.4)',
                    '0 8px 25px rgba(245, 158, 11, 0.3)'
                  ]
                }}
                transition={songLoading ? {} : {
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                {songLoading ? (
                  <>
                    <motion.div
                      style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%'
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Generating Song...</span>
                  </>
                ) : (
                  <>
                    <span>🎤 Generate Roast Song</span>
                    {/* Button shimmer effect */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        borderRadius: '16px'
                      }}
                      animate={{ left: ['100%', '100%'] }}
                      transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
                    />
                  </>
                )}
              </motion.button>

              {song && song.audio_url && (
                <motion.div
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(254, 243, 199, 0.9))',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    borderRadius: '20px',
                    padding: '24px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Song cover image */}
                  {song.image_url && (
                    <motion.div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '20px'
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <img 
                        src={song.image_url} 
                        alt="Song cover" 
                        style={{
                          maxWidth: '200px',
                          borderRadius: '16px',
                          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                        }}
                      />
                    </motion.div>
                  )}

                  {/* Song title */}
                  <motion.h4
                    style={{
                      color: '#92400e',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      margin: '0 0 16px 0',
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {song.title || 'Green Roast Diss Track'}
                  </motion.h4>

                  {/* Audio player */}
                  <motion.div
                    style={{
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    <audio 
                      controls 
                      src={song.audio_url}
                      style={{
                        width: '100%',
                        maxWidth: '400px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </motion.div>

                  {/* Song status */}
                  {song.status && (
                    <motion.div
                      style={{
                        textAlign: 'center',
                        marginTop: '12px',
                        color: '#92400e',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    >
                      Status: {song.status === 'streaming' ? '🎵 Streaming...' : '✅ Complete'}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Suggested Rewrite Section */}
          {analysisData.rewrite && (
            <motion.div 
              style={{
                background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                border: '1px solid #bbf7d0',
                borderRadius: '16px',
                padding: '32px',
                marginBottom: '32px',
                boxShadow: '0 2px 15px -3px rgba(0, 0, 0, 0.07)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  background: '#dcfce7', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <span style={{ color: '#16a34a', fontSize: '18px' }}>🌱</span>
                </div>
                <h3 style={{ 
                  color: '#166534', 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em' 
                }}>
                  Greener Alternative
                </h3>
              </div>
              
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(240,253,244,0.8))',
                border: '1px solid rgba(187, 247, 208, 0.5)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '16px'
              }}>
                <p style={{ 
                  fontSize: '18px', 
                  fontWeight: '500', 
                  color: '#14532d', 
                  lineHeight: '1.6',
                  margin: '0 0 16px 0'
                }}>
                  {analysisData.rewrite}
                </p>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  padding: '8px 16px', 
                  background: '#dcfce7', 
                  borderRadius: '20px',
                  border: '1px solid #bbf7d0'
                }}>
                  <span style={{ color: '#15803d', fontSize: '14px', fontWeight: '500' }}>✨ More sustainable approach</span>
                </div>
                
                {analysisData.token_savings > 0 && (
                  <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    padding: '8px 16px', 
                    background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', 
                    borderRadius: '20px',
                    border: '1px solid #93c5fd'
                  }}>
                    <span style={{ color: '#1e40af', fontSize: '14px', fontWeight: '600' }}>
                      💾 Saves {analysisData.token_savings} tokens ({analysisData.carbon_savings}g CO₂)
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div 
            style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <motion.button 
              onClick={handleNewPrompt}
              className="btn-primary"
              style={{
                padding: '16px 32px',
                fontSize: '18px'
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Analyze Another Prompt
            </motion.button>
          </motion.div>
        </div>

        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer 
        style={{
          background: 'rgba(250, 250, 250, 0.8)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(229, 229, 229, 0.5)',
          padding: '48px 0'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', textAlign: 'left' }}>
          <p style={{ color: '#525252', fontSize: '18px', fontWeight: '500' }}>
            Making AI more sustainable, one prompt at a time
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default ResultsPage;
