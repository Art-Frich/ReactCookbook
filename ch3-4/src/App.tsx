import './App.css'
import SimpleTicker from './SimpleTicker.jsx'
import IntervalTicker from './IntervalTicker.jsx'
import Clocks from './Clocks.jsx'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/simple" element={<SimpleTicker />} />
          <Route path="/interval" element={<IntervalTicker />} />
          <Route path="/clocks" element={<Clocks />} />
        </Routes>

        <ul>
          <li>
            <Link to="/simple">Simple ticker</Link>
          </li>
          <li>
            <Link to="/interval">Interval ticker</Link>
          </li>
          <li>
            <Link to="/clocks">A collection of clocks</Link>
          </li>
        </ul>
      </BrowserRouter>
    </div >
  )
}

