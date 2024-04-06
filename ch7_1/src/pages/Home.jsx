import { Link } from 'react-router-dom'

const Home = () => (
  <div className="Public">
    <h1>Home</h1>
    <ul>
      <li>
        <Link to="/transactions">Transactions</Link>
      </li>
      <li>
        <Link to="/offers">Offers</Link>
      </li>
    </ul>
  </div>
)

export default Home