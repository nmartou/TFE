import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../utils';

const InitialState = {
    listQuiz: [],
}

export const GetListQuiz = createAsyncThunk(
    'quiz/GetListQuiz', 
    async () => { 
        const response = await axios.get(API_URL + '/quiz/all');
        return response.data;
    }
);

const quizSlice = createSlice({
    name: 'quiz',
    initialState: InitialState,
    reducers: {
        setListQuiz: (state, action) => {
            state.listQuiz = action.payload;
        },
    },
    extraReducers: {
        [GetListQuiz.fulfilled]: (state, action) => {
            let tempArray = action.payload;
            tempArray.forEach(element => {
                element.content = JSON.parse(element.content);
            });
            state.listQuiz = tempArray;
        },
        [GetListQuiz.rejected]: (state, action) => {
            console.log(action.error);
        },
    },
});

export const quizMethods = {
    ...quizSlice.actions,
    GetListQuiz,
}

export default quizSlice;