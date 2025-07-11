import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import useLogout from '../hooks/useLogout';
import axios from 'axios';
import Header from '../component/UI/Header';

function Dashboard({ setLoggedIn }) {
  const logout = useLogout(setLoggedIn);
  const [students, setStudent] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:9090/student/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudent(res.data.students);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Header title="Welcome to the Jai Sai Accademy" onLogout={logout} />

        <TableContainer
          component={Paper}
          sx={{
            marginTop: '80px',
            backgroundColor: '#1E293B',
            border: '1px solid #334155',
          }}
        >
          <Table sx={{ minWidth: 900 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#334155' }}>
                <TableCell sx={{ color: '#F8FAFC', fontWeight: 'bold', border: '1px solid #334155' }}>ID</TableCell>
                <TableCell sx={{ color: '#F8FAFC', fontWeight: 'bold', border: '1px solid #334155' }}>Name</TableCell>
                <TableCell sx={{ color: '#F8FAFC', fontWeight: 'bold', border: '1px solid #334155' }}>Parent No</TableCell>
                <TableCell sx={{ color: '#F8FAFC', fontWeight: 'bold', border: '1px solid #334155' }}>Standard</TableCell>
                <TableCell sx={{ color: '#F8FAFC', fontWeight: 'bold', border: '1px solid #334155' }}>Address</TableCell>
                <TableCell sx={{ color: '#F8FAFC', fontWeight: 'bold', border: '1px solid #334155' }}>Admission Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ color: '#CBD5E1' }}>
                    No student data found.
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow
                    key={student.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#334155',
                      },
                    }}
                  >
                    <TableCell sx={{ color: '#CBD5E1', border: '1px solid #334155' }}>{student.id}</TableCell>
                    <TableCell sx={{ color: '#CBD5E1', border: '1px solid #334155' }}>{student.name}</TableCell>
                    <TableCell sx={{ color: '#CBD5E1', border: '1px solid #334155' }}>{student.parentNo}</TableCell>
                    <TableCell sx={{ color: '#CBD5E1', border: '1px solid #334155' }}>{student.std}</TableCell>
                    <TableCell sx={{ color: '#CBD5E1', border: '1px solid #334155' }}>{student.address}</TableCell>
                    <TableCell sx={{ color: '#CBD5E1', border: '1px solid #334155' }}>{student.admissionDate}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default Dashboard;
