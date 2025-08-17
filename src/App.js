// App.js
import './App.css';
import ContentFeed from './components/ContentFeed/ContentFeed';
import RoastGenerator from './components/RoastGenerator/RoastGenerator';
import Timer from './components/Timer/Timer';
import { useState } from 'react';
function App() {
  const [activeComponent,setActiveComponent] = useState('no');
  return (
    <div className='app-container'>
        <h1 className='main-title'> My React Learning Sandbox</h1>
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
        </div>
        <div className='component-display'>
            {activeComponent === 'roastGenerator' && <RoastGenerator/>}
            {activeComponent === 'contentFeed' && <ContentFeed/>}
            {activeComponent === 'timer' && <Timer/>}
            
        </div>
        <div className='app-footer'>
            <p>React playground</p>
        </div>
    </div>
    );
}


export default App;
