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
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  // p: 2,
};

// const style3 = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '45%',
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   // p: 2,
// };

const style3 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '45%',
  bgcolor: 'white', // Change background color
  borderRadius: '8px', // Add border radius for rounded corners
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add a subtle box shadow
  // padding: '20px', // Add padding to the card

  // Update the card styles
  '& .cardContent': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  '& .userDetails': {
    margin: '10px 0',
    textAlign: 'center',
    '& label': {
      fontWeight: 'bold',
    },
  },

  '& .userImage': {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    '& img': {
      width: '150px',
      borderRadius: '50%', // Make the image circular
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Add a slight shadow
    },
  },

  '& .closeButton': {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
};


export default function ClippedDrawer() {

  const [getUsers,setGetUsers]=useState([])
  const [count,setCount]=useState(0)


  useEffect(()=>{
    axios.get('http://localhost:7000/api/registration/view')
    .then((res)=>{
      console.log(res.data);
      setGetUsers(res.data)
    }).catch((err)=>{
      alert(err);
    })
  },[count])
  console.log(getUsers,'getusers');

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
    axios.delete(`http://localhost:7000/api/registration/delete/${selected._id}`)
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
                  <StyledTableCell >
                    <img src={`http://localhost:7000/uploads/users/${row?.picture}`} alt="" style={{width:50,height:50,borderRadius:'15%'}}/>
                  </StyledTableCell>
                  <StyledTableCell style={{display:'flex',gap:'2%'}}>
                    {/* <Button variant='contained' color='primary'><EditIcon/></Button> */}
                    <Button variant='contained' color='success' onClick={()=>handleOpenView(row)}><VisibilityIcon/></Button>
                    <Button variant='contained' color='error' onClick={()=>handleOpenDel(row)}><DeleteIcon/></Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <div>
          {/* delete modal card */}
          <Modal
            open={open3}
            onClose={handleCloseDel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style2}>
            <Card>
              {/* <img width={'200px'} src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg" alt="" /> */}
                
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  do you want to delete {selected.userName} ?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  
                  <Button onClick={()=>Del(selected)} variant='contained' color='error' >Delete</Button>
                  <Button onClick={handleCloseDel} variant='contained' color='inherit'>Close</Button>
                </Typography>
              </CardContent>
              
            </Card>
            </Box>
          </Modal>

          {/* view modal card */}
          <Modal
            open={open2}
            onClose={handleCloseView}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style3}>
              <Card className="cardContent">
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    <b><u>VIEW USER DETAILS:</u></b>
                  </Typography>
                  <div className="userImage">
                    <img src={`http://localhost:7000/uploads/users/${selected?.picture}`} alt="no image found" />
                  </div>
                  <hr />
                  <div className="userDetails">
                    <h3>
                      <label style={{ fontSize: '23px' }}><b><u>User name:</u></b></label>
                      <span style={{ fontSize: '18px' }}> {selected.userName}</span>
                    </h3>
                    <h3>
                      <label style={{ fontSize: '23px' }}><b><u>Email:</u></b></label>
                      <span style={{ fontSize: '18px' }}> {selected.email}</span>
                    </h3>
                    <h3>
                      <label style={{ fontSize: '23px' }}><b><u>Phone:</u></b></label>
                      <span style={{ fontSize: '18px' }}> {selected.phone}</span>
                    </h3>
                  </div>
                  <div className="closeButton">
                    <Button onClick={handleCloseView} variant='contained' color='inherit'>Close</Button>
                  </div>
                </CardContent>
              </Card>
            </Box>
          </Modal>
        </div>
      </Box>
    </Box>
  );
}