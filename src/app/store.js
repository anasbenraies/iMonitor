import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../features/User'; // Import your root reducer

const store = configureStore({
    reducer:{
        variables:rootReducer
    }
});

export default store;