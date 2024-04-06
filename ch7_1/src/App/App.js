import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Transactions from '../components/Transactions/Transactions';
import Offers from '../pages/Offers/Offers';
import SecurityProvider from '../components/SecurityProvider';

export default function App() {
  return (
    <div className="App">
      <SecurityProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </SecurityProvider>
    </div>
  );
}
