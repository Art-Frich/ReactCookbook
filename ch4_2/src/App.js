import { useState } from 'react';
import logo from './logo.svg';
import HelpSequence from './HelpSequence';
import './App.css';

function App() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
      <button onClick={() => setShowHelp(true)}>Show help</button>
      <HelpSequence
        sequence={[
          {
            forElement: 'p',
            text: 'Надеюсь, ты умеешь с английского',
          },
          {
            forElement: '.App-link',
            text: 'Здесь тебе покажут, глубока ли кроличья нора',
          },
          {
            forElement: 'img',
            text: 'Это мог быть Альберт Эйнштейн, но ему досталась только mc^2.',
            placement: 'right',
          },
        ]}
        open={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </div>
  );
}

export default App;
