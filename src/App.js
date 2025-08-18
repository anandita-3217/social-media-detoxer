import './App.css';
import ContentFeed from './components/ContentFeed/ContentFeed';
import RoastGenerator from './components/RoastGenerator/RoastGenerator';
import Timer from './components/Timer/Timer';
import MotivationalNag from './components/MotivationalNag/MotivationalNag';
import StatsTracker from './components/StatsTracker/StatsTracker';

import { useState } from 'react';
function App() {
  const [activeComponent,setActiveComponent] = useState('no');
  const [statsKey, setStatsKey] = useState(0);

  const handleSessionComplete = (sessionSeconds) => {
    setStatsKey(prev => prev + 1);
    console.log(`Session completed: ${sessionSeconds} seconds!`);
  };

  return (
    <div className='App'>
        <h1> My React Learning Sandbox</h1>
        <div className='component-switcher'>
            <button onClick={() => setActiveComponent('roastGenerator')} className={`switch-button ${activeComponent === 'roastGenerator' ? 'active' : ''}`}>
                Roast Generator
            </button>
            <button onClick={() => setActiveComponent('contentFeed')} className={`switch-button ${activeComponent === 'contentFeed' ? 'active' : ''}`}>
                Content Feed
            </button>
            <button onClick={() => setActiveComponent('timer')} className={`switch-button ${activeComponent === 'timer' ? 'active' : ''}`}>
                Timer
            </button>
            <button onClick={() => setActiveComponent('motivational-nag')} className={`switch-button ${activeComponent === 'motivational-nag' ? 'active' : ''}`}>
                Motivational Nag
            </button>
            <button onClick={() => setActiveComponent('stats-tracker')} className={`switch-button ${activeComponent === 'stats-tracker' ? 'active' : ''}`}>
                Stats Tracker
            </button>
        </div>
        <div className='component-display'>
            {activeComponent === 'roastGenerator' && <RoastGenerator/>}
            {activeComponent === 'contentFeed' && <ContentFeed/>}
            {activeComponent === 'timer' && <Timer onSessionComplete={handleSessionComplete}/>}
            {activeComponent === 'motivational-nag' && <MotivationalNag/>}
            {activeComponent === 'stats-tracker' && <StatsTracker key={statsKey}/>}
            
        </div>
        <div className='app-footer'>
            <p>React playground</p>
        </div>
    </div>
    );
}

export default App;