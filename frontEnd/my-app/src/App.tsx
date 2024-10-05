import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet /> {/* This will render the matched child route */}
      </main>
      <footer>
        <p>© 2024 Divhack</p>
      </footer>
    </div>
  );
}

export default App;