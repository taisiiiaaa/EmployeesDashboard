import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import EmployeesPage from '../EmployeesPage'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../store/store'

describe('EmployeesPage component', () => {
    test('The fields do not accept empty values', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <EmployeesPage />
                </BrowserRouter>
            </Provider>
        )

        const addEmployeeButton = screen.getByText(/add employee/i);
        fireEvent.click(addEmployeeButton);

        const fullNameInput = screen.getByPlaceholderText('Full name');
        const emailInput = screen.getByPlaceholderText('Email');
        const positionInput = screen.getByPlaceholderText('Position');
        const departmentSelect = screen.getByDisplayValue('Choose department');

        fireEvent.change(fullNameInput, { target: { value: '' } });
        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(positionInput, { target: { value: '' } });
        fireEvent.change(departmentSelect, { target: { value: '' } });

        const addBtn = screen.getByRole('button', { name: /add/i });
        fireEvent.click(addBtn);

        expect(fullNameInput).toHaveClass('input-error');
        expect(emailInput).toHaveClass('input-error');
        expect(positionInput).toHaveClass('input-error');
        expect(departmentSelect).toHaveClass('input-error');
    })
})
