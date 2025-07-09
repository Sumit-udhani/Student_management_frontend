import { Typography,Box, Button } from '@mui/material'
import React from 'react'
import useLogout from '../hooks/useLogout'

function Dashboard({ setLoggedIn }) {
    const logout = useLogout(setLoggedIn)
  return (
    <>
    <Button variant='contained' onClick={logout} style={{backgroundColor:'red'}} >Logout</Button>
    <Box sx={{display:'flex' , justifyContent:'center',alignItems:'center',height:'90vh'}}>
    <Typography color='primary' variant='h5' sx={{textAlign:'center'}}>Welcome on Student management application</Typography>
    </Box>
    </>
    )
}

export default Dashboard