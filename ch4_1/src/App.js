import './App.css';
import ClockIn from './ClockIn';
import ErrorContainer from './ErrorContainer';

function App() {
  return (
    <div className="App">
      <ErrorContainer>
        <ClockIn />
      </ErrorContainer>
    </div>
  );
}

export default App;
