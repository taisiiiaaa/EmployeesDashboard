import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import DepartmentsPage from '../DepartmentsPage'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import store from '../../store/store'

describe('DepartmentsPage component', () => {
    test('Number of employees field accepts only numbers', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <DepartmentsPage />
                </BrowserRouter>
            </Provider>
        );

        const addDeptButton = screen.getByText(/add department/i); 
        fireEvent.click(addDeptButton);

        const numInput = screen.getByPlaceholderText('Number of employees');

        fireEvent.change(numInput, { target: { value: 'fourty nine' } });
        expect(numInput.value).toBe('');

        fireEvent.change(numInput, { target: { value: '10' } });
        expect(numInput.value).toBe('10');
    })
})