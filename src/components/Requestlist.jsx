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
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import Chip from '@mui/material/Chip';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';


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

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  // p: 2,
};

export default function ClippedDrawer() {

  const [getRequests,setGetRequests]=useState([])
  const [count,setCount]=useState(0)

  useEffect(()=>{
    axios.get('http://localhost:7000/api/request/viewbyadmin')
    // .then((res)=>{
    //   console.log(res.data);
    //   setGetRequests(res.data)
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
      setGetRequests(formattedData);
    }).catch((err)=>{
      alert(err)
    })
  },[count])
  console.log(getRequests,282)

  const [selected,setSelected]=useState('')

  //view form
  const [open2, setOpen2] = React.useState(false);
  const handleOpenView = (i) => {
    setOpen2(true);
    setSelected(i)
  }

  const handleCloseView = () => setOpen2(false);

  //delete form
  const [open3, setOpen3] = React.useState(false);
  const handleOpenDel = (i) => {
    setOpen3(true);
    setSelected(i)
  }

  const handleCloseDel = () => setOpen3(false);

  const Del=async(item)=>{
    axios.delete(`http://localhost:7000/api/request/delete/${selected._id}`)
    .then((res)=>{
      console.log('res',res.data);
      setCount((prev)=>!prev);
      // await handleClose2
    })
    .catch((err)=>{
      console.log(err);
    })
    await handleCloseDel()
  }

  const HandleStatusUpdate=(requestId,status)=>{
    axios.put(`http://localhost:7000/api/request/update/${requestId}`,{status})
    .then((res)=>{
      console.log(res.data)
      setCount((prev)=>!prev)
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
    <Box sx={{ display: 'flex' }}>

      <Drawer/>
       
      {/* part that displays table */}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1%'}}>
          <Typography variant="h4" gutterBottom>
            Request List
          </Typography>
          {/* <Button onClick={handleOpen} variant='contained' color='inherit' ><AddIcon/>ADD RECIPE</Button> */}
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Sl no.</StyledTableCell>
                <StyledTableCell>User Name</StyledTableCell>
                <StyledTableCell>Requests</StyledTableCell>
                <StyledTableCell>Remarks</StyledTableCell>
                <StyledTableCell>Date & Time</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getRequests.map((row,index) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">{index+1}</StyledTableCell>
                  <StyledTableCell>{row.user_id?.userName}</StyledTableCell>
                  <StyledTableCell>{row.request}</StyledTableCell>
                  <StyledTableCell>{row.remarks}</StyledTableCell>
                  <StyledTableCell>{row.date}</StyledTableCell>
                  <StyledTableCell style={{display:'flex',gap:'2%'}}>
                  {row.status === 'accepted' ? (
                      <Chip label="Accepted" color="success" />
                    ) : row.status === 'rejected' ? (
                      <Chip label="Rejected" color="error" />
                    ) : (
                      <>
                        <Button variant='contained' color='success' onClick={() => HandleStatusUpdate(row._id, 'accepted')}>accept</Button>
                        <Button variant='contained' color='error' onClick={() => HandleStatusUpdate(row._id, 'rejected')}>reject</Button>
                      </>
                    )}
                    {/* <Button variant='contained' color='success' onClick={()=>HandleStatusUpdate(row._id,'accepted')}>accept</Button>
                    <Button variant='contained' color='error' onClick={()=>HandleStatusUpdate(row._id,'rejected')}>reject</Button> */}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <div>
          {/* delete modal card */}
          {/* <Modal
            open={open3}
            onClose={handleCloseDel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style2}>
            <Card>
                
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  do you want to delete {selected.recipeName} ?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  
                  <Button onClick={()=>Del(selected)} variant='contained' color='error' >Delete</Button>
                  <Button onClick={handleCloseDel} variant='contained' color='inherit'>Close</Button>
                </Typography>
              </CardContent>
              
            </Card>
            </Box>
          </Modal> */}

          {/* view modal card */}
          {/* <Modal
            open={open2}
            onClose={handleCloseView}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style2}>
            <Card>
              <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                <b><u>VIEW REQUEST:</u></b>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <br />
                <h4><label><b><u>Request:</u></b></label>{selected.request}</h4>
                <h4><label><b><u>Remarks:</u></b></label>{selected.remarks}</h4>
                <span style={{display:'flex',justifyContent:'center'}}><Button onClick={handleCloseView} variant='contained' color='inherit'>Close</Button></span>
              </Typography>
              </CardContent>
              
            </Card>
            </Box>
          </Modal> */}
        </div>
      </Box>
    </Box>
  );
}