import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { authThunk } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Heading } from '../styled-components/components';
import { Button } from '../styled-components/components';
import { MouseFollower } from 'react-mouse-follower'
import { InputField } from '../styled-components/components';
import { Form } from '../styled-components/components';

export default function LoginPage() {
    const dispatch = useDispatch();

    const username = useRef();
    const password = useRef();

    const nav = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const creds = {
            username: username.current.value,
            password: password.current.value
        }

        if (!creds.username || !creds.password) {
            return;
        }

        try {
            await dispatch(authThunk(creds)).unwrap();
            localStorage.setItem('isAuth', 'true');
            nav('/home');
        } catch (err) {
            alert('Login failed');
        }
    }

    return (
        <>
            <MouseFollower />
            <Form onSubmit={handleSubmit}>
                <Heading>Sign in to your account</Heading>
                <InputField type='text' ref={username} name='username' placeholder='Username' />
                <InputField type='password' ref={password} name='password' placeholder='Password' />
                <Button type='submit'>Sign in</Button>
            </Form>
        </>
        
    )
}










