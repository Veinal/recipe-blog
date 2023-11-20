import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Chip from '@mui/material/Chip';

// import Paper from '@mui/material/Paper';

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function SimplePaper() {
    const [getRequest,setGetRequest]=useState([])

    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("UserToken"))
        axios.get('http://localhost:7000/api/request/view',{headers:{"UserToken":user}})
        // .then((res)=>{
        //     console.log(res.data)
        //     setGetRequest(res.data)
        .then((res) => {
            // Assuming 'date' is a string representing the date from the API response
            const formattedData = res.data.map((item) => ({
              ...item,
              // Format 'date' to a more readable format (assuming 'date' is a string)
              date: new Date(item.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }),
            }));
            setGetRequest(formattedData);
        }).catch((err)=>{
            alert(err)
        })
    },[])

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 700,
              height: 500,
            },
          }}
        >
        <Paper elevation={3}>
            <h1 style={{display:'flex',justifyContent:'center',marginTop:'1%'}}><b>MY REQUESTS:</b></h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Sl no.</StyledTableCell>
                        <StyledTableCell>Recipe</StyledTableCell>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {getRequest.map((row,index) => (
                        <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">{index+1}</StyledTableCell>
                        <StyledTableCell>{row.request}</StyledTableCell>
                        <StyledTableCell>{row.date}</StyledTableCell>
                        <StyledTableCell>
                          {(row.status)==='accepted' ? 
                            <Chip label="Accepted" color="success" /> 
                            :
                            (row.status)==='rejected' ?
                              <Chip label="Rejected" color="error" />
                            :
                            <Chip label="Pending" color="warning" />
                          }
                        </StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        </Paper> 
        </Box>
    </div>
  );
}