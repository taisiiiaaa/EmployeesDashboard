import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authThunk } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Heading, Button, InputField, Form } from '../styled-components/components';
import { MouseFollower } from 'react-mouse-follower';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function LoginPage() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const username = useRef();
  const password = useRef();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const creds = {
      username: username.current.value,
      password: password.current.value,
    };

    if (!creds.username || !creds.password) return;

    try {
      await dispatch(authThunk(creds)).unwrap();
      localStorage.setItem('isAuth', 'true');
      nav('/home');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <>
      <MouseFollower />
      <Form onSubmit={handleSubmit}>
        <Heading>Sign in to your account</Heading>
        <InputField
            type='text'
            ref={username}
            name='username'
            placeholder='Username'
        />
        <div style={{ position: 'relative', width: '100%' }}>
          <InputField
            type={showPassword ? 'text' : 'password'}
            ref={password}
            name='password'
            placeholder='Password'
            style={{ paddingRight: '194px' }} 
          />
          <button
            type='button'
            onClick={() => setShowPassword(prev => !prev)}
            style={{
              position: 'absolute',
              top: '50%',
              right: '12px',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              lineHeight: 0
            }}
          >
            {showPassword ? (
              <VisibilityOffIcon sx={{ color: '#232528' }} />
            ) : (
              <RemoveRedEyeIcon sx={{ color: '#232528' }} />
            )}
          </button>
        </div>
        <Button type='submit'>Sign in</Button>
      </Form>
    </>
  );
}
