import './App.css';
import Search from './Search';
import store from '../Redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Search />
      </div>
    </Provider>
  );
}

export default App;
