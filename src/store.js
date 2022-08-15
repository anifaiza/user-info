import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Slices';

export default configureStore({
  reducer: rootReducer,
});
