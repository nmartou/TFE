import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../utils';

const InitialState = {
    listQuiz: [],
}

const quizSlice = createSlice({
    name: 'quiz',
    initialState: InitialState,
    reducers: {
        setListQuiz: (state, action) => {
            state.listQuiz = action.payload;
        },
    },
    extraReducers: {
    },
});

export const quizMethods = {
    ...quizSlice.actions
}

export default quizSlice;