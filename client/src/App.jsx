
import './App.css'

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserData from './Pages/usersData';
import HomePage from './Pages/HomePage';

function App() {
 

  return (
    <>
     <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/usersdata" element={<UserData />} />
        
      </Routes>
    </Router>
        
    </>
  )
}

export default App