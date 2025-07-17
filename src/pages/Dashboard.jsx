import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Divider,
  Typography,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useLogout from "../hooks/useLogout";
// import axios from "axios";
import Header from "../component/UI/Header";
import ReusableModal from "../component/UI/ReusableModal";
import AddStudents from "../component/AddStudents";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Input from "../component/UI/Input";
import Pagination from '@mui/material/Pagination';
import axiosInstance from "../utils/axiosInterceptor";
import useAxiosWithAuth from "../utils/axiosInterceptor";
function Dashboard({ setLoggedIn }) {
  const logout = useLogout(setLoggedIn);
  const [students, setStudent] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage,setCurrentPage] = useState(1)
  const [totalPages,setTotalPages] = useState(1)
  
  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get(
        `/student/all?search=${search}&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudent(res.data.students);
      setTotalPages(res.data.totalPages)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const debounceDelay = setTimeout(() => {
      fetchStudents();
      return () => clearTimeout(delayDebounce);
    }, 300);
  }, [search,currentPage]);
  const handleEdit = (student) => {
    setSelectedStudent(student);
    setEditOpen(true);
  };
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const confirm = window.confirm("Are u sure u want to delete student??");
      if (!confirm) {
        return;
      }
      const res = await axiosInstance.delete(
        `/student/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        alert("Student deleted successfully");
        fetchStudents(); // Refresh the student list after deletion
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      alert(error.response?.data?.error || "Failed to delete student");
    }
  };
  return (
    <Box sx={{ p: 6 }}>
      <Header title="Welcome to the Jai Sai Accademy" onLogout={logout} />

      {/* Ensure the button is visible and spaced properly */}
      <Stack direction="column" alignItems="flex-end" spacing={1} sx={{ mt: 3, mb: 2 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Student
        </Button>
     
      <Input
        type="text"
        label="search by Name"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          height:'50px',
          width: '19px', 
          borderRadius: '50px',
          color:'black',
          borderColor:'1px solid black'
        }}
      />
      </Stack>
      <ReusableModal
        open={open}
        onClose={() => setOpen(false)}
        title="Add New Student"
      >
        <AddStudents
          onClose={() => setOpen(false)}
          onStudentAdd={fetchStudents}
        />
      </ReusableModal>
      <ReusableModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Student"
      >
        <AddStudents
          onClose={() => setEditOpen(false)}
          onStudentAdd={fetchStudents}
          initialData={selectedStudent}
          isEditMode
        />
      </ReusableModal>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#1E293B",
          border: "1px solid #334155",
        }}
      >
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#334155" }}>
              <TableCell sx={{ color: "#F8FAFC", fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell sx={{ color: "#F8FAFC", fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "#F8FAFC", fontWeight: "bold" }}>
                Parent No
              </TableCell>
              <TableCell sx={{ color: "#F8FAFC", fontWeight: "bold" }}>
                Standard
              </TableCell>
              <TableCell sx={{ color: "#F8FAFC", fontWeight: "bold" }}>
                Address
              </TableCell>
              <TableCell sx={{ color: "#F8FAFC", fontWeight: "bold" }}>
                Admission Date
              </TableCell>
              <TableCell sx={{ color: "#F8FAFC", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ color: "#CBD5E1" }}>
                  No student data found.
                </TableCell>
              </TableRow>
            ) : (
              students.map((student) => (
                <TableRow
                  key={student.id}
                  sx={{ "&:hover": { backgroundColor: "#334155" } }}
                >
                  <TableCell sx={{ color: "#CBD5E1" }}>{student.id}</TableCell>
                  <TableCell sx={{ color: "#CBD5E1" }}>
                    {student.name}
                  </TableCell>
                  <TableCell sx={{ color: "#CBD5E1" }}>
                    {student.parentNo}
                  </TableCell>
                  <TableCell sx={{ color: "#CBD5E1" }}>{student.std}</TableCell>
                  <TableCell sx={{ color: "#CBD5E1" }}>
                    {student.address}
                  </TableCell>
                  <TableCell sx={{ color: "#CBD5E1" }}>
                    {student.admissionDate &&
                      new Date(student.admissionDate)
                        .toISOString()
                        .split("T")[0]}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(student)}
                    >
                      <EditOutlinedIcon color="primary" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(student.id)}
                    >
                      <DeleteOutlineOutlinedIcon color="error" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedStudent(student);
                        setViewModalOpen(true);
                      }}
                    >
                      <VisibilityOutlinedIcon color="info" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Stack direction="row" justifyContent="center" sx={{mt:3}}>
      <Pagination
      count={totalPages}
      page={currentPage}
      onChange={(e,page)=> setCurrentPage(page)}
      color="primary"
      size="large"
      
      sx={{
        '& .MuiPaginationItem-root': {
          color: 'white', // changes number and arrows color
          borderColor: 'white', 
          width:'70px'
        },
        '& .Mui-selected': {
          backgroundColor: '#1E40AF', // optional: selected button background
          color: 'red',
        },
      }}
      />
      </Stack>
      <ReusableModal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="Student Details"
      >
        <Divider sx={{ my: 1, borderColor: "#3b82f6" }} />
        {selectedStudent ? (
          <Box elevation={0} sx={{ p: 2, width: "100%" }}>
            <Box
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
              gap={2}
              sx={{ width: "100%" }}
            >
              <Box>
                <Typography variant="caption" color="white">
                  Student Id:
                </Typography>
                <Typography color="white">{selectedStudent.id}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="white">
                  Name:
                </Typography>
                <Typography
                  color="white"
                  noWrap
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {selectedStudent.name}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="white">
                  Parent No:
                </Typography>
                <Typography color="white">
                  {selectedStudent.parentNo}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="white">
                  Std:
                </Typography>
                <Typography color="white">{selectedStudent.std}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="white">
                  Address:
                </Typography>
                <Typography color="white">{selectedStudent.address}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="white">
                  AdmissionDate:
                </Typography>
                <Typography color="white">
                  {selectedStudent.admissionDate &&
                    new Date(selectedStudent.admissionDate)
                      .toISOString()
                      .split("T")[0]}
                </Typography>
              </Box>
              {/* Add more fields here if needed */}
            </Box>
          </Box>
        ) : (
          <Typography>No data available.</Typography>
        )}
      </ReusableModal>
    </Box>
  );
}

export default Dashboard;
