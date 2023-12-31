import React, {Suspense} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Index from './pages/Index';



function App() {
  return (
    <Router basename={process.env.PUBLIC_URL} >
      <Routes>
        <Route path='/' element={<><Index/></>}/>
      </Routes>
    </Router>
  )
}

export default App;
