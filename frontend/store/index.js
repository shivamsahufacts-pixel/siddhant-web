import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slice/projectSlice';
import contactReducder from './slice/contactSlice';
import serviceReducer from './slice/serviceSlice';
export const store = configureStore({
  reducer: {
    // Add your reducers here
     projects: projectReducer,
      contact: contactReducder,
       service: serviceReducer, //

  },
});

export default store;