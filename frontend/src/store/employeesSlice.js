import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    employees: []
};

const getEmployees = createAsyncThunk('/employees/get', async () => {
    const response = await fetch('/EmployeesDashboard/employees.json');
    const result = await response.json();

    return result;
});

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        addEmployee(state, action) {
            state.employees.push(action.payload);
        },
        deleteEmployee(state, action) {
            state.employees = state.employees.filter(e => e.id !== action.payload);
        },
        editEmployee(state, action) {
            const index = state.employees.findIndex(e => e.id === action.payload.id);
            if (index !== -1) {
                state.employees[index] = action.payload;
            }
        }
    },
    extraReducers: builder => 
    builder
    .addCase(getEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
    })
});

export default employeesSlice.reducer;

export const { addEmployee, deleteEmployee, editEmployee } = employeesSlice.actions;

export { getEmployees };