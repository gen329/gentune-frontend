import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
const API = import.meta.env.VITE_API_URL;

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultState, setResultState] = useState(null);
  const [errorFound, setErrorFound] = useState({ isError: false, errorCode: 0 });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
 const fetchData = async () => {
      if (searchQuery.trim() === '') {
        setResultState(null);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${API}/songs/search?query=${searchQuery}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch data');
        }

        setResultState(data);
        setErrorFound({ isError: false, errorCode: 0 });
      } catch (error) {
        console.error(error);
        setErrorFound({ isError: true, errorCode: error.message || 'Unknown Error' });
        setResultState([]);
      } finally {
        setLoading(false);
      }
    };

	fetchData();
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
	navigate(`${API}/song/${id}`)
  };

  const handleTextChange = (e) => {
    setSearchQuery(e.target.value);
  };


  return (
    <div className='searchbar-container'>
      <form onSubmit={handleSubmit} className='search-form'>
        <input
          type="text"
          value={searchQuery}
          onChange={handleTextChange}
          placeholder='Search'
          required
          className='search-input'
        />
        <button type='submit' className='search-submit'>🔎</button>
      </form>
      <br />
      {loading ? (
        <div className='loading'>Loading...</div>
      ) : errorFound.isError ? (
        <div className='error'>
          <h1>An error has occurred!</h1>
          <h2>Error Code: {errorFound.errorCode}</h2>
        </div>
      ) : resultState === null ? (
        <div className='no-results'></div>
      ) : resultState.length > 0 ? (
        <div className='search-results'>
          <ul>
            {resultState.map((result, id) => (
              <li key={id} onClick={() => navigate(song.id)}>
                {song.title}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className='no-results'>No results found</div>
      )}
    </div>
  );
};

export default Searchbar;
