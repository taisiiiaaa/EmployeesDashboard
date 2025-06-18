import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'

import authReducer from './store/authSlice.js'
import employeesReducer from './store/employeesSlice.js'
import deptsReducer from './store/deptsSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeesReducer,
    depts: deptsReducer
  }
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
