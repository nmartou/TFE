//import { compose } from 'redux';
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import quizSlice from "./QuizSlice";

const store = configureStore({
	reducer: {
		quiz: quizSlice.reducer
	},
	middleware: [
		...getDefaultMiddleware({immutableCheck: false, serializableCheck: false})
	]
})

//let composeEnhancers = compose;

//Sert à éviter le ralentissement des perfs de l'appli
/*if (__DEV__) {
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}*/

//const store = createStore(schedulerReducer, {}, composeEnhancers(applyMiddleware(thunk, multi)));

export default store;