import React, { useEffect, useRef, useState } from 'react'
import './DepartmentsPage.css'
import Header from '../components/Header'
import { Button, ButtonSecondary, Heading, InputField, StyledSelect, Text } from '../styled-components/components'
import { useDispatch, useSelector } from 'react-redux'
import { addDepartment, deleteDepartment, editDepartment, getDepts } from '../store/deptsSlice'

import Table from 'react-bootstrap/Table';
import { Form } from '../styled-components/components'

export default function DepartmentsPage() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [deptToEdit, setDeptToEdit] = useState(null);
  const [sortOrder, setSortOrder] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [errors, setErrors] = useState({});

  const name = useRef();
  const manager = useRef();
  const city = useRef();
  const location = useRef();
  const employees = useRef();

  const dispatch = useDispatch();
  const depts = useSelector(state => state.depts.departments);

  useEffect(() => {
    dispatch(getDepts());
  }, [dispatch]);

  const handleEdit = id => {
    const dept = depts.find(d => d.id === id);
    if (dept) {
      setDeptToEdit(dept);
      setIsFormVisible(true);
    }
  }

  const handleFormVisibility = () => {
    setIsFormVisible(prev => !prev);
    setDeptToEdit(null);
  }

  useEffect(() => {
    if (deptToEdit) {
      name.current.value = deptToEdit.name;
      manager.current.value = deptToEdit.manager;
      city.current.value = deptToEdit.city;
      location.current.value = deptToEdit.location;
      employees.current.value = deptToEdit.num_of_employees;
    }
  }, [deptToEdit]);

  const handleAdd = () => {
    const newDept = {
      id: deptToEdit ? deptToEdit.id : Date.now(),
      name: name.current.value,
      manager: manager.current.value,
      city: city.current.value,
      location: location.current.value,
      num_of_employees: employees.current.value
    }

    const newErrors = {};
    Object.entries(newDept).forEach(([key, value]) => {
      if (key !== 'id' && !value) {
        newErrors[key] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    if (deptToEdit) {
      dispatch(editDepartment(newDept));
    } else {
      dispatch(addDepartment(newDept));
    }

    setDeptToEdit(null);
    setIsFormVisible(false);
  }

  const filteredDepts = depts.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedDepts = [...filteredDepts].sort((a, b) => {
    if (sortOrder === 'Ascending') {
      return a.num_of_employees - b.num_of_employees;
    } else if (sortOrder === 'Descending') {
      return b.num_of_employees - a.num_of_employees;
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
          <InputField type='text' name='search' placeholder='Search for department' value={searchQuery} onChange={event => setSearchQuery(event.target.value)} />
          <Text>Sort</Text>
          <StyledSelect name='employees' value={sortOrder} onChange={event => setSortOrder(event.target.value)}>
            <option value=''>By the number of employees</option>
            <option value='Ascending'>Ascending</option>
            <option value='Descending'>Descending</option>
          </StyledSelect>        
        </div>
        <Button type='button' onClick={handleFormVisibility}>{isFormVisible ? 'Close form' : 'Add department'}</Button>
      </div>
      {isFormVisible && 
        <Form name='add-dept'>
          <Heading>{deptToEdit ? 'Edit department' : 'Add new department'}</Heading>
          <InputField type='text' placeholder='Department name' ref={name} className={errors.name ? 'input-error' : ''} />
          <InputField type='text' placeholder='Manager' ref={manager} className={errors.manager ? 'input-error' : ''} />
          <InputField type='text' placeholder='City' ref={city} className={errors.city ? 'input-error' : ''} />
          <InputField type='text' placeholder='Location' ref={location} className={errors.location ? 'input-error' : ''} />
          <InputField type='number' placeholder='Number of employees' min='1' ref={employees} className={errors.num_of_employees ? 'input-error' : ''} />
          <Button type='button' onClick={handleAdd}>{deptToEdit ? 'Save' : 'Add'}</Button>
        </Form>
      }
      {depts.length === 0 &&
        <Text>No any departments were added lately</Text>
      }
      {depts.length > 0 &&    
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>Name</th>
              <th>Manager</th>
              <th>City</th>
              <th>Location</th>
              <th>Number of employees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedDepts.map(d => ( 
              <tr key={d.id}>
                <th>{d.name}</th>
                <th>{d.manager}</th>
                <th>{d.city}</th>
                <th>{d.location}</th>
                <th>{d.num_of_employees}</th>
                <th className='actions'>
                  <ButtonSecondary type='button' id='edit-btn' onClick={() => handleEdit(d.id)}>Edit</ButtonSecondary>
                  <ButtonSecondary type='button' id='delete-btn' onClick={() => dispatch(deleteDepartment(d.id))}>Delete</ButtonSecondary>
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      }
    </>
  )
}


