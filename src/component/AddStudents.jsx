import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Alert, Button, Stack } from '@mui/material';
import Input from './UI/Input';
function AddStudents({onStudentAdd,onClose,initialData={},isEditMode=false}) {
   
    const[formData,setFormData] = useState({
        name: '',
            parentNo: '',
            std: '',
            address: '',
            admissionDate: ''
    }) 
    useEffect(() => {
      if (initialData && isEditMode) {
        setFormData((prev) => {
          const newAdmissionDate = initialData.admissionDate
            ? new Date(initialData.admissionDate).toISOString().split('T')[0]
            : '';
          
          // Prevent state update if values are same
          if (
            prev.name === initialData.name &&
            prev.parentNo === initialData.parentNo &&
            prev.std === initialData.std &&
            prev.address === initialData.address &&
            prev.admissionDate === newAdmissionDate
          ) {
            return prev; // no update
          }
    
          return {
            name: initialData.name || '',
            parentNo: initialData.parentNo || '',
            std: initialData.std || '',
            address: initialData.address || '',
            admissionDate: newAdmissionDate,
          };
        });
      }
    }, [initialData, isEditMode]);
    
    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]: e.target.value})
    }
   const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token');
    const url = isEditMode
      ? `http://localhost:9090/student/update/${initialData.id}`
      : 'http://localhost:9090/student/create';

    const method = isEditMode ? 'put' : 'post';

    const res = await axios[method](url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert(res.data.message);
    onStudentAdd();
    onClose();
  } catch (error) {
    alert(error.response?.data?.error || 'Something went wrong');
  }
};

  return (
   <form onSubmit={handleSubmit}>
    <Stack spacing={2}>
    <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
    <Input label="Parent No" name="parentNo" value={formData.parentNo} onChange={handleChange} />
    <Input label="Standard" name="std" value={formData.std} onChange={handleChange} />
    <Input label="Address" name="address" value={formData.address} onChange={handleChange} />
    <Input label="Admission Date" name="admissionDate" type="date" value={formData.admissionDate} onChange={handleChange} />
    <Button type='submit' variant='contained' sx={{borderRadius:'8px'}}>{isEditMode?'Save Student':'Add Student'}</Button>
    </Stack>
   </form>
  )
}

export default AddStudents