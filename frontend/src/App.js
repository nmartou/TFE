import React from 'react';
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
import NavBar from './NavBar/NavBar';
import ListQuiz from './Quizz/ListQuiz';
import { Provider } from 'react-redux';
import store from './Slice/Store';
import Quiz from './Quizz/Quiz';

//Return all routes of the site
function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <NavBar />
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='quiz/create' element={<CreateQuizz />} />
            <Route path='games' element={<HomeGame />} />
            <Route path='games/FootballJumper' element={<FootballJumper />} />
            <Route path='signUp' element={<SignUp />} />
            <Route path='login' element={<Login />} />
            <Route path='quiz' element={<ListQuiz />} />
            <Route path='quiz/:id' element={<Quiz />} />
            <Route path='*' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  );
}

export default App;