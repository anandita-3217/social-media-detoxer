import { useState, useEffect } from 'react';
import './StatsTracker.css';
function StatsTracker() {
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalTimeSeconds: 0,
    currentStreak: 0,
    lastUsed: null,
    achievements: []
  });

  // Load stats from localStorage when component mounts
  useEffect(() => {
    const savedStats = localStorage.getItem('detoxStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Save stats to localStorage whenever stats change
  useEffect(() => {
    localStorage.setItem('detoxStats', JSON.stringify(stats));
  }, [stats]);

  // Function to add a completed session
  const addSession = (sessionTimeSeconds) => {
    const today = new Date().toDateString();
    
    setStats(prevStats => {
      const newStats = {
        ...prevStats,
        totalSessions: prevStats.totalSessions + 1,
        totalTimeSeconds: prevStats.totalTimeSeconds + sessionTimeSeconds,
        lastUsed: today
      };

      // Update streak
      if (prevStats.lastUsed !== today) {
        newStats.currentStreak = prevStats.currentStreak + 1;
      }

      // Check for new achievements
      newStats.achievements = checkAchievements(newStats);

      return newStats;
    });
  };

  // Check for achievements based on current stats
  const checkAchievements = (currentStats) => {
    const achievements = [...currentStats.achievements];
    const totalMinutes = Math.floor(currentStats.totalTimeSeconds / 60);

    const possibleAchievements = [
      { id: 'first_session', title: '🎯 First Step!', condition: currentStats.totalSessions >= 1, description: 'Completed your first detox session' },
      { id: 'five_sessions', title: '🔥 Getting Warmed Up', condition: currentStats.totalSessions >= 5, description: 'Completed 5 detox sessions' },
      { id: 'ten_minutes', title: '⏰ Time Saver', condition: totalMinutes >= 10, description: 'Saved 10 minutes from social media' },
      { id: 'one_hour', title: '🏆 Hour Hero', condition: totalMinutes >= 60, description: 'Saved a full hour!' },
      { id: 'three_day_streak', title: '📅 Streak Starter', condition: currentStats.currentStreak >= 3, description: '3 days in a row!' },
      { id: 'week_streak', title: '🌟 Week Warrior', condition: currentStats.currentStreak >= 7, description: 'One full week streak!' },
      { id: 'social_media_addict', title: '📱 Recovering Scroller', condition: totalMinutes >= 120, description: 'You\'ve saved 2+ hours. Your thumbs thank you.' }
    ];

    possibleAchievements.forEach(achievement => {
      if (achievement.condition && !achievements.find(a => a.id === achievement.id)) {
        achievements.push(achievement);
      }
    });

    return achievements;
  };

  // Format time display
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Get motivational message based on progress
  const getMotivationalMessage = () => {
    const totalMinutes = Math.floor(stats.totalTimeSeconds / 60);
    
    if (totalMinutes === 0) {
      return "🌱 Ready to start your digital detox journey?";
    } else if (totalMinutes < 30) {
      return "🚀 Great start! Every minute counts.";
    } else if (totalMinutes < 60) {
      return "💪 You're building a healthy habit!";
    } else {
      return "🏆 Look at you, conquering the digital world!";
    }
  };

  // Clear all data (for testing or fresh start)
  const resetAllStats = () => {
    const confirmReset = window.confirm('Are you sure you want to reset all your progress? This cannot be undone.');
    if (confirmReset) {
      setStats({
        totalSessions: 0,
        totalTimeSeconds: 0,
        currentStreak: 0,
        lastUsed: null,
        achievements: []
      });
    }
  };

  return (
    <div className="stats-container">
      <h2>Your Progress Dashboard 📊</h2>
      
      {/* Main stats */}
      <div className="main-stats">
        <div className="stat-card">
          <h3>{stats.totalSessions}</h3>
          <p>Total Sessions</p>
        </div>
        
        <div className="stat-card">
          <h3>{formatTime(stats.totalTimeSeconds)}</h3>
          <p>Time Saved</p>
        </div>
        
        <div className="stat-card">
          <h3>{stats.currentStreak}</h3>
          <p>Day Streak</p>
        </div>
      </div>

      {/* Motivational message */}
      <div className="motivation-message">
        <p>{getMotivationalMessage()}</p>
      </div>

      {/* Achievements */}
      {stats.achievements.length > 0 && (
        <div className="achievements">
          <h3>🏅 Achievements Unlocked</h3>
          <div className="achievement-list">
            {stats.achievements.map(achievement => (
              <div key={achievement.id} className="achievement">
                <span className="achievement-title">{achievement.title}</span>
                <span className="achievement-desc">{achievement.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Debug/Reset button */}
      <div className="debug-section">
        <button onClick={resetAllStats} className="reset-stats-btn">
          🔄 Reset All Progress
        </button>
        <button onClick={() => addSession(300)} className="debug-btn">
          🧪 Add Test Session (5 min)
        </button>
      </div>
    </div>
  );
}

export default StatsTracker;