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
import { useEffect, useState } from 'react';
import axios from 'axios';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function SimplePaper() {
  const [getRequest, setGetRequest] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('UserToken'));
    axios
      .get('http://localhost:7000/api/request/view', { headers: { UserToken: user } })
      .then((res) => {
        const formattedData = res.data.map((item) => ({
          ...item,
          date: new Date(item.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
        }));
        setGetRequest(formattedData);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" align="center" sx={{ mb: 4 }}>
        MY REQUESTS
      </Typography>
      <div style={{display:'flex',justifyContent:'center'}}>
        {getRequest.length ==0 ? 
          <span ><h4>No request yet!!</h4></span>
          :
        (<Box sx={{ width: '80%' }}>
          <Paper elevation={3} sx={{  }}>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sl no.</StyledTableCell>
                    <StyledTableCell>Recipe</StyledTableCell>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                  {getRequest.map((row, index) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell>{row.request}</StyledTableCell>
                      <StyledTableCell>{row.date}</StyledTableCell>
                      <StyledTableCell>
                        {row.status === 'accepted' ? (
                          <Chip label="Accepted" color="success" />
                        ) : row.status === 'rejected' ? (
                          <Chip label="Rejected" color="error" />
                        ) : (
                          <Chip label="Pending" color="warning" />
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                  
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>)
        }
      </div>
    </Container>
  );
}
