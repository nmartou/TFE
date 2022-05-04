import React from 'react';
//import { ToastContainer } from 'react-toastify';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthProvider } from './Auth/AuthContext';
import Home from './Home/Home';
import CreateQuizz from './Quizz/CreateQuiz';
import HomeGame from './Game/HomeGame';
import FootballJumper from './Game/FootballJumper';
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";

//Return all routes of the site
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='quiz/create' element={<CreateQuizz />} />
          <Route path='games' element={<HomeGame />} />
          <Route path='games/FootballJumper' element={<FootballJumper />} />
          <Route path='signUp' element={<SignUp />} />
          <Route path='login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;