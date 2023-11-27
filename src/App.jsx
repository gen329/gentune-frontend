import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './common/Navbar';
import Home from './Pages/Home'; 
import Index from './Pages/Index'; 
import New from './Pages/New'; 
import Show from './Pages/Show'; 
import Edit from './Pages/Edit'; 
import FourOFour from './Pages/FourOFour'; 
import Searchbar from './Components/Searchbar'; 

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <main className='w-screen'>
          <Searchbar /> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/songs" element={<Index />} />
            <Route path="/songs/new" element={<New />} />
            <Route path="/songs/:id" element={<Show />} />
            <Route path="/songs/:id/edit" element={<Edit />} />
            <Route path="*" element={<FourOFour />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
