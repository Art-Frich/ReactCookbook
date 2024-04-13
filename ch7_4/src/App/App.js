import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Public from '../pages/Public';
import Private1 from '../pages/Private1';
import Private2 from '../pages/Private2';
import Home from '../pages/Home';
import SecurityProvider from '../Components/SecurityProvider';
import SecureRoute from '../Components/SecureRoute';

export default function App() {
  return (
    <div className="App">
      <SecurityProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/private1" element={<SecureRoute element={<Private1 />} />} />
            <Route path="/private2" element={<SecureRoute element={<Private2 />} />} />
            <Route path="/public" element={<Public />} />
          </Routes>
        </BrowserRouter>
      </SecurityProvider>
    </div>
  );
}
