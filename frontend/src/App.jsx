import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage'
import EmployeesPage from './pages/EmployeesPage'
import DepartmentsPage from './pages/DepartmentsPage'
import HomePage from './pages/HomePage'

function App() {
  const isAuth = useSelector(state => state.auth.isAuth);

  return (
    <>
      <BrowserRouter basename='/EmployeesDashboard'>
        <Routes>
          <Route path='/home' element={isAuth ? <HomePage /> : <LoginPage />} />
          <Route path='/' element={isAuth ? <Navigate to='/home' /> : <LoginPage />} />

          <Route path='/employees' element={isAuth ? <EmployeesPage /> : <Navigate to='/' />} />
          <Route path='/departments' element={isAuth ? <DepartmentsPage /> : <Navigate to='/' />} />

          <Route path='*' element={isAuth ? <Navigate to='/home' /> : <Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
