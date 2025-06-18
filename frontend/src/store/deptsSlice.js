import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    departments: []
}

const getDepts = createAsyncThunk('/departments/get', async () => {
    const response = await fetch('/EmployeesDashboard/departments.json');
    const result = await response.json();

    return result;
});

const deptsSlice = createSlice({
    name: 'depts',
    initialState,
    reducers: {
        addDepartment(state, action) {
            state.departments.push(action.payload);
        },
        deleteDepartment(state, action) {
            state.departments = state.departments.filter(d => d.id !== action.payload);
        },
        editDepartment(state, action) {
            const index = state.departments.findIndex(d => d.id === action.payload.id);
            if (index !== -1) {
                state.departments[index] = action.payload;
            }
        }
    },
    extraReducers: builder => 
    builder
    .addCase(getDepts.fulfilled, (state, action) => {
        state.departments = action.payload;
    })
    .addCase(getDepts.rejected, (state, action) => {
        console.error('Failed to fetch departments:', action.error);
    })
});

export default deptsSlice.reducer;

export const { addDepartment, deleteDepartment, editDepartment } = deptsSlice.actions;

export { getDepts };
