import Sidebar from '../components/Sidebar';
import './Home.css';
import { useState } from 'react';

function Search() {

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/companies?query=${query}`); // add the api for the database here
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="home-container">
      <Sidebar />
      <div className="search-container">
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for companies..."
          />
          <button onClick={handleSearch}>Search</button>
          <ul>
            {results.map((company) => (
              <li key={company.id}>{company.name}</li>
            ))}
          </ul>
        </div> 

    </div>
  );
}

export default Search;