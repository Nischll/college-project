import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartReducer';

const store = configureStore({reducer: cartReducer});

export default store;