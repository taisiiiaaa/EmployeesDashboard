import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import employeesReducer from './employeesSlice'
import deptsReducer from './deptsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeesReducer,
    depts: deptsReducer,
  },
})

export default store