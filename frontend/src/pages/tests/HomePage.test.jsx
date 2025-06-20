import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import HomePage from '../HomePage'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import store from '../../store/store'

describe('HomePage component', () => {
    test('The heading Welcome to Employees Dashboard is rendered', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <HomePage />
                </BrowserRouter>
            </Provider>
        );
        const heading = screen.getByText('Welcome to Employees Dashboard');
        expect(heading).toBeInTheDocument();
    });
    test('HomePage includes Header component', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <HomePage />
                </BrowserRouter>
            </Provider>
        );

        const logoutButton = screen.getByRole('button', { name: /logout/i });
        expect(logoutButton).toBeInTheDocument();
    });
});
