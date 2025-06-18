import React from 'react'
import './Header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '../styled-components/components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';

export default function Header() {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isAuth');
        dispatch(logout());       
        nav('/login');
    }

    return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
        <Navbar.Brand as={NavLink} to="/home">Employees Dashboard</Navbar.Brand>
        <Nav className="me-auto nav">
            <div className='nav-bar'>
            <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/employees">Employees</Nav.Link>
            <Nav.Link as={NavLink} to="/departments">Departments</Nav.Link>
            </div>
            <Button id='logout' type='button' onClick={handleLogout}>Logout</Button>
        </Nav>
        </Container>
    </Navbar>
    );
}
