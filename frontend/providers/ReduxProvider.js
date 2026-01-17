'use client';

import { Provider } from 'react-redux';
import store from '../store';
// import { store } from './store'; // path apne structure ke hisaab se

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
