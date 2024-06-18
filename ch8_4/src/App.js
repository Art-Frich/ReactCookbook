import './App.css';
import logo from './logo.svg';
import useOnline from './useOnline';

function App() {
  const isOnline = useOnline();

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
        <h2>{!isOnline ? 'you are currently offline' : 'You are online'}</h2>
        {/* {isOnline ? null : <h2>you are currently offline</h2>} */}
      </header>
    </div>
  );
}

export default App;
