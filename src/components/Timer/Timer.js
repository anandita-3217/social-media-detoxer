import { useState, useEffect } from 'react';
import './Timer.css';
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [totalTimeSaved, setTotalTimeSaved] = useState(0);

  // This runs every second when timer is active
  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  // Start the detox session
  const startTimer = () => {
    setIsActive(true);
    setSeconds(0);
  };

  // End the session and add to total time saved
  const stopTimer = () => {
    setIsActive(false);
    setTotalTimeSaved(prev => prev + seconds);
  };

  // Reset everything
  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  // Convert seconds to readable format
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Fun time conversions
  const getTimeConversions = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    
    const conversions = [
      `${Math.floor(minutes / 3)} TikTok videos you didn't watch`,
      `${Math.floor(minutes / 2)} Instagram stories you avoided`,
      `${Math.floor(minutes * 0.1)} pages you could've read instead`,
      `${Math.floor(minutes / 5)} times you could've meditated`,
      `${minutes * 10} pushups you could do with this time`
    ];
    
    return conversions.filter(conversion => !conversion.includes('0 '));
  };

  return (
    <div className="timer-container">
      <h2 className='timer-title'>Detox Session Timer ⏰</h2>
      <div className="timer-input-section">
        <h3 className='timer-subtitle'>Current Session: {formatTime(seconds)}</h3>
        
        <div className="timer-buttons">
          {!isActive ? (
            <button onClick={startTimer} className="start-btn">
              Start Detox Session 🚀
            </button>
          ) : (
            <button onClick={stopTimer} className="stop-btn">
              End Session 🛑
            </button>
          )}
          
          <button onClick={resetTimer} className="reset-btn">
            Reset ↻
          </button>
        </div>
      </div>

      {/* Total time saved display */}
      {totalTimeSaved > 0 && (
        <div className="total-saved">
          <h3>🎉 Total Time Saved: {formatTime(totalTimeSaved)}</h3>
          
          <div className="conversions">
            <h4>Instead of scrolling, you could have:</h4>
            <ul>
              {getTimeConversions(totalTimeSaved).map((conversion, index) => (
                <li key={index}>{conversion}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Motivational message while timer is running */}
      {isActive && (
        <div className="motivation">
          <p>🌟 Keep going! Every second here is better than mindless scrolling!</p>
        </div>
      )}
    </div>
  );
}

export default Timer;