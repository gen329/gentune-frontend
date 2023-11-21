import { useState, useEffect } from 'react';
import Searchbar from "../Components/Searchbar";

function Home() {
  const [resultState, updateResultState] = useState([]);

  useEffect(() => {
    console.log("state updated:", resultState)
  }, [resultState])

  return (
    <div className="Home">
      <h2>Welcome</h2>
      <Searchbar updateResultState={updateResultState}/>
    </div>
  );
}

export default Home;