import Box from '@mui/material/Box';
import * as React from 'react';
import Drawer from './Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


const drawerWidth = 200;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function ClippedDrawer() {

  const [getUsers,setGetUsers]=useState([])

  useEffect(()=>{
    axios.get('http://localhost:7000/api/registration/view')
    .then((res)=>{
      console.log(res.data);
      setGetUsers(res.data)
    }).catch((err)=>{
      alert(err);
    })
  },[])
  console.log(getUsers,'getusers');

  return (
    <Box sx={{ display: 'flex' }}>

      <Drawer/>
       
      {/* part that displays table */}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1%'}}>
          <Typography variant="h4" gutterBottom>
            Users List
          </Typography>
          {/* <Button onClick={handleOpen} variant='contained' color='inherit' ><AddIcon/>ADD RECIPE</Button> */}
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Sl no.</StyledTableCell>
                <StyledTableCell >User name</StyledTableCell>
                <StyledTableCell >Email</StyledTableCell>
                <StyledTableCell >Phone</StyledTableCell>
                <StyledTableCell >Picture</StyledTableCell>
                <StyledTableCell >Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getUsers.map((row,index) => (
                <StyledTableRow key={row.index}>
                  <StyledTableCell component="th" scope="row">{index+1}</StyledTableCell>
                  <StyledTableCell >{row.userName}</StyledTableCell>
                  <StyledTableCell >{row.email}</StyledTableCell>
                  <StyledTableCell >{row.phone}</StyledTableCell>
                  <StyledTableCell >{row.picture}</StyledTableCell>
                  <StyledTableCell style={{display:'flex',gap:'2%'}}>
                    <Button variant='contained' color='primary'><EditIcon/></Button>
                    <Button variant='contained' color='success'><VisibilityIcon/></Button>
                    <Button variant='contained' color='error'><DeleteIcon/></Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
      </Box>
    </Box>
  );
}