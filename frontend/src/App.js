import React from 'react';
import { render } from "react-dom";
//import { ToastContainer } from 'react-toastify';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from './Home/Home';
import CreateQuizz from './Quizz/CreateQuizz';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='create' element={<CreateQuizz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;