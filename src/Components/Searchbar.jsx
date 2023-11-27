import React, { useState, useEffect } from 'react';
import getSearchResults from '../common/helper';

const Searchbar = ({ updateResultState }) => {
  const [searchQuery, updateSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultState, setResultState] = useState([]);
  const [errorFound, setErrorFound] = useState({
    isError: false,
    errorCode: 0
  });

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      setLoading(true);
      getSearchResults(searchQuery)
        .then((response) => {
          if (typeof response !== 'number') {
            setResultState(response);
            setLoading(false);
          } else {
            setErrorFound({
              isError: true,
              errorCode: response
            });
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setResultState([]); 
    }
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleTextChange = (e) => {
    updateSearchQuery(e.target.value);
  };

  return (
    <div className='searchbar-container'>
      <form onSubmit={handleSubmit} className='search-form'>
        <input
          type="text"
          value={searchQuery}
          onChange={handleTextChange}
          placeholder='search'
          required
          className='search-input'
        />
        <input type='submit' value="🔎" className='search-submit'/>
      </form>
      <br />
      {loading ? (
        <div className='loading'>Loading...</div>
      ) : errorFound.isError ? (
        <div className='error'>
          <h1>An error has occurred!</h1>
          <h2>Error Code: {errorFound.errorCode}</h2>
        </div>
      ) : Array.isArray(resultState) && resultState.length > 0 ? (
        <div className='search-results'>
          <ul>
            {resultState.map((result, index) => (
              <li key={index}>{result}</li>
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
