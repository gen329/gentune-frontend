import { useState } from 'react';
import { getSearchResults } from '../common/helper';

const Searchbar = ({ updateResultState }) => {
  const [searchQuery, updateSearchQuery] = useState('')
  const [errorFound, updateErrorFound] = useState({
    isError: false,
    errorCode: 0
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (updateResultState) {
      getSearchResults(searchQuery)
        .then((response) => {
          if (typeof response != "number") {
            updateResultState(response)
          } else {
            updateErrorFound({
              isError: true,
              errorCode: response
            })
          }
        })
    } else {
      console.error("Result state not valid")
    }
  }

  const handleTextChange = (event) => {
    updateSearchQuery(e.target.value)
  }

  return (
    <div className='searchbar'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleTextChange}
          placeholder='search'
          required />
          <input type='submit' value="🔎"/>
      </form>
      <br />
        {errorFound.isError ? (
          <>
          <div className='error'>
            <h1>An error has occured!</h1>
            <h2>Error Code: {errorFound.errorCode}</h2>
          </div>
          </>
        ): null}
    </div>
  );
}

export default Searchbar;