import { useState, useEffect } from 'react';
import './MotivationalNag.css'
function MotivationalNag() {
  const [currentNag, setCurrentNag] = useState('');
  const [timeOnApp, setTimeOnApp] = useState(0);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [nagLevel, setNagLevel] = useState('gentle'); // gentle, firm, intervention

  // Track how long user has been on the app
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnApp(prev => prev + 1);
      
      // Check if user has been idle
      const timeSinceActivity = Date.now() - lastActivity;
      if (timeSinceActivity > 30000) { // 30 seconds of no activity
        triggerIdleNag();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lastActivity]);

  // Update last activity when user interacts
  useEffect(() => {
    const handleActivity = () => {
      setLastActivity(Date.now());
    };

    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('scroll', handleActivity);

    return () => {
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, []);

  // Different levels of motivational messages
  const nagMessages = {
    gentle: [
      "🌟 Hey! You're doing great by being here instead of scrolling!",
      "💪 Small steps, but you're moving in the right direction!",
      "🧠 Your brain is thanking you for this quality time.",
      "✨ Look at you, choosing growth over mindless scrolling!",
      "🎯 Every minute here is a win against the algorithm.",
    ],
    firm: [
      "⏰ You've been here a while... maybe time for some real-world action?",
      "🤔 This app is great, but have you tried... going outside?",
      "📚 Reminder: The goal is to replace scrolling, not create a new addiction!",
      "🏃‍♂️ How about taking all this motivation and doing something with it?",
      "💡 Plot twist: The real social media detox was the productive things we could be doing along the way.",
    ],
    intervention: [
      "🚨 INTERVENTION TIME: You've been staring at this app longer than TikTok!",
      "😅 Okay, this is awkward... You're using a detox app like social media.",
      "🎭 The irony is strong with this one. Time to actually detox?",
      "⚠️ Breaking: Local person replaces Instagram addiction with anti-Instagram app addiction.",
      "🪞 Mirror check: This app isn't supposed to be your new scroll-hole!"
    ],
    idle: [
      "👀 Still there? Or did you get distracted by actual productivity?",
      "💤 If you're not using this, go do something useful! Shoo!",
      "🤖 *Checks for signs of life* Blink if you're still fighting the good fight!",
      "🕰️ Time check: Are you actually detoxing or just... existing here?",
      "📱 PSA: Staring at this screen counts as screen time too, genius."
    ],
    celebration: [
      "🎉 You chose facts over feeds! Your brain cells are literally celebrating!",
      "🏆 Achievement unlocked: Human being with actual attention span!",
      "🚀 You're basically a digital wellness guru now. Teach us your ways!",
      "⭐ Plot twist: You're actually enjoying learning stuff. Who knew?",
      "🌟 Your future self just sent a thank-you note from the year 2030."
    ]
  };

  // Determine what level of nagging is needed
  const calculateNagLevel = () => {
    const minutes = Math.floor(timeOnApp / 60);
    
    if (minutes < 2) return 'gentle';
    if (minutes < 5) return 'firm';
    return 'intervention';
  };

  // Trigger different types of nags
  const triggerRandomNag = () => {
    const level = calculateNagLevel();
    const messages = nagMessages[level];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    setCurrentNag(randomMessage);
    setNagLevel(level);
  };

  const triggerIdleNag = () => {
    const idleMessages = nagMessages.idle;
    const randomMessage = idleMessages[Math.floor(Math.random() * idleMessages.length)];
    setCurrentNag(randomMessage);
    setNagLevel('idle');
  };

  const triggerCelebration = () => {
    const celebrationMessages = nagMessages.celebration;
    const randomMessage = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
    setCurrentNag(randomMessage);
    setNagLevel('celebration');
  };

  // Get nag style based on level
  const getNagStyle = () => {
    const baseStyle = {
      padding: '15px',
      borderRadius: '10px',
      margin: '15px 0',
      textAlign: 'center',
      transition: 'all 0.3s ease'
    };

    switch (nagLevel) {
      case 'gentle':
        return { ...baseStyle, backgroundColor: '#e8f5e8', border: '2px solid #4CAF50', color: '#2e7d2e' };
      case 'firm':
        return { ...baseStyle, backgroundColor: '#fff3cd', border: '2px solid #ffc107', color: '#856404' };
      case 'intervention':
        return { ...baseStyle, backgroundColor: '#f8d7da', border: '2px solid #dc3545', color: '#721c24' };
      case 'idle':
        return { ...baseStyle, backgroundColor: '#d1ecf1', border: '2px solid #17a2b8', color: '#0c5460' };
      case 'celebration':
        return { ...baseStyle, backgroundColor: '#f0e6ff', border: '2px solid #6f42c1', color: '#4a2c7a' };
      default:
        return baseStyle;
    }
  };

  // Format time spent on app
  const formatTimeOnApp = () => {
    const minutes = Math.floor(timeOnApp / 60);
    const seconds = timeOnApp % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="motivational-nag-container">
      <div className="nag-header">
        <h3>🤖 Your Digital Wellness Coach</h3>
        <p>Time on this app: {formatTimeOnApp()}</p>
      </div>

      {/* Current nag message */}
      {currentNag && (
        <div style={getNagStyle()}>
          <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.4' }}>
            {currentNag}
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="nag-buttons">
        <button 
          onClick={triggerRandomNag}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '5px'
          }}
        >
          Give Me Some Motivation! 💪
        </button>
        
        <button 
          onClick={triggerCelebration}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '5px'
          }}
        >
          Celebrate My Progress! 🎉
        </button>
        
        <button 
          onClick={() => setCurrentNag('')}
          style={{
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '5px'
          }}
        >
          Okay, I Get It 🙄
        </button>
      </div>

      {/* Time-based automatic suggestions */}
      {timeOnApp > 300 && ( // After 5 minutes
        <div className="time-suggestion">
          <p style={{ 
            fontSize: '14px', 
            color: '#666', 
            fontStyle: 'italic',
            marginTop: '15px'
          }}>
            💡 You've been here for {Math.floor(timeOnApp / 60)} minutes. Maybe time to put this energy into something offline?
          </p>
        </div>
      )}
    </div>
  );
}

export default MotivationalNag;