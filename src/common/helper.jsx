const API = import.meta.env.VITE_API_URL

const getSong = () => {}

const getSearchResults = (query) => {
  return fetch(`${API}/songs`)
  .then(res => {
    let code = res.status
    if(code == 200){
      return res.json()
    } else {
      return code
    }
  })
  .then(json => {
    if(typeof json != "number") {
      return json.items
    } else {
      return json
    }
  })
  .catch(error => console.error(error))
}

export {
  getSong,
  getSearchResults
}