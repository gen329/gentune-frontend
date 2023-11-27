import { useState, useEffect } from 'react';

const API = import.meta.env.VITE_API_URL;

export const getSearchResults = (query) => {
  const [resultState, updateResultState] = useState([]);
  const [errorFound, updateErrorFound] = useState({
    isError: false,
    errorCode: 0
  });

  useEffect(() => {
    fetch(`${API}/songs`)
      .then((res) => {
        let code = res.status;
        if (code === 200) {
          return res.json();
        } else {
          return code;
        }
      })
      .then((json) => {
        if (typeof json !== 'number') {
          updateResultState(json.items);
        } else {
          updateErrorFound({
            isError: true,
            errorCode: json
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [query]);

  return { resultState, errorFound };
};

export default getSearchResults;