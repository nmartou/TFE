import React from 'react';
//import { ToastContainer } from 'react-toastify';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from './Home/Home';
import CreateQuizz from './Quizz/CreateQuiz';
import HomeGame from './Game/HomeGame';
import FootballJumper from './Game/FootballJumper';
import SignUp from "./Auth/SignUp";

//Return all routes of the site
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='quiz/create' element={<CreateQuizz />} />
        <Route path='games' element={<HomeGame />} />
        <Route path='games/FootballJumper' element={<FootballJumper />} />
        <Route path='signUp' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;