import './App.css';
import ContentFeed from './components/ContentFeed';
function App() {

  return (
<div className="App">
      <h1>Social Media Detox Helper</h1>
      <p>Your digital intervention starts here...</p>
      <ContentFeed />  {/* Use our component here */}
    </div>
  );
}

export default App;
