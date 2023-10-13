import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';

import { userReducer } from './reducers/userReducer';
import { bookReducer } from './reducers/bookReducer';
import { reviewReducer } from './reducers/reviewReducer';


const rootReducer = combineReducers({

    user:userReducer,
    book:bookReducer,
    review:reviewReducer

})

const store = configureStore({ reducer: rootReducer });

export default store;