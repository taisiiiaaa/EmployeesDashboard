import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { addEmployee, deleteEmployee, editEmployee, getEmployees } from '../store/employeesSlice';
import { Button, ButtonSecondary, Form, Heading, InputField, StyledSelect, Text } from '../styled-components/components';
import { getDepts } from '../store/deptsSlice';
import Table from 'react-bootstrap/Table';

export default function EmployeesPage() {
  const dispatch = useDispatch();
  const [empToEdit, setEmpToEdit] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [errors, setErrors] = useState({});

  const depts = useSelector(state => state.depts.departments);

  useEffect(() => {
    dispatch(getDepts());    
  }, [dispatch]);

  const employees = useSelector(state => state.employees.employees);

  const fullName = useRef();
  const email = useRef();
  const [selectedDept, setSelectedDept] = useState('');
  const position = useRef();

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const handleFormVisibility = () => {
    setIsFormVisible(prev => !prev);
    setEmpToEdit(null);
  }

  useEffect(() => {
    if (empToEdit) {
      fullName.current.value = empToEdit.full_name,
      email.current.value = empToEdit.email,
      setSelectedDept(empToEdit.department),
      position.current.value = empToEdit.position
    }
  }, [empToEdit]);

  const handleAdd = () => {
    const empToAdd = {
      id: empToEdit ? empToEdit.id : Date.now(),
      full_name: fullName.current.value,
      email: email.current.value,
      department: selectedDept,
      position: position.current.value
    }

    const newErrors = {};
    Object.entries(empToAdd).forEach(([key, value]) => {
      if (key !== 'id' && !value) {
        newErrors[key] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    if (empToEdit) {
      dispatch(editEmployee(empToAdd));
    } else {
      dispatch(addEmployee(empToAdd));
    }

    setEmpToEdit(null);
    setIsFormVisible(false);
  }

  const handleEdit = id => {
    const emp = employees.find(e => e.id === id);
    if (emp) {
      setEmpToEdit(emp);
      setIsFormVisible(true);
    }
  }

  const filteredAndSortedEmployees = [...employees]
  .filter(e =>
    e.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .sort((a, b) => {
    if (sortOrder === 'A-Z') {
      return a.full_name.localeCompare(b.full_name);
    } else if (sortOrder === 'Z-A') {
      return b.full_name.localeCompare(a.full_name);
    } else {
      return 0;
    }
  });

  return (
    <>
      <Header />
      <div className='second-navbar'>
        <div className='filter-sort'>
          <Text>Filter</Text>
          <InputField type='text' name='search' placeholder='Search for employee' value={searchQuery} onChange={event => setSearchQuery(event.target.value)} />
          <Text>Sort</Text>
          <StyledSelect name='employees' value={sortOrder} onChange={event => setSortOrder(event.target.value)}>
            <option value=''>By the employee name</option>
            <option value='A-Z'>From A to Z</option>
            <option value='Z-A'>From Z to A</option>
          </StyledSelect>        
        </div>
        <Button type='button' onClick={handleFormVisibility}>{isFormVisible ? 'Close form' : 'Add employee'}</Button>
      </div>
      {isFormVisible && 
        <Form name='add-emp'>
          <Heading>{empToEdit ? 'Edit employee' : 'Add new employee'}</Heading>
          <InputField type='text' placeholder='Full name' ref={fullName} className={errors.full_name ? 'input-error' : ''} />
          <InputField type='email' placeholder='Email' ref={email} className={errors.email ? 'input-error' : ''} />
          <StyledSelect name='depts' value={selectedDept} onChange={event => setSelectedDept(event.target.value)} className={errors.department ? 'input-error' : ''}>
            <option value=''>Choose department</option>
            {depts.map(d => (
              <option value={d.name} key={d.id}>{d.name}</option>
            ))}
          </StyledSelect>
          <InputField type='text' placeholder='Position' ref={position} className={errors.position ? 'input-error' : ''} />
          <Button type='button' onClick={handleAdd}>{empToEdit ? 'Save' : 'Add'}</Button>
        </Form>
      }
      {employees.length === 0 &&
        <Text>No any employees were added lately</Text>
      }
      {employees.length > 0 &&    
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>Full name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedEmployees.map(e => ( 
              <tr key={e.id}>
                <th>{e.full_name}</th>
                <th>{e.email}</th>
                <th>{e.department}</th>
                <th>{e.position}</th>
                <th className='actions'>
                  <ButtonSecondary type='button' id='edit-btn' onClick={() => handleEdit(e.id)}>Edit</ButtonSecondary>
                  <ButtonSecondary type='button' id='delete-btn' onClick={() => dispatch(deleteEmployee(e.id))}>Delete</ButtonSecondary>
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      }
    </>
  )
}
