import Box from '@mui/material/Box';
import * as React from 'react';
import Drawer from './Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

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
import Axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const drawerWidth = 200;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
  const [categories,setCategories]=useState()
  const [getCategories,setGetCategories]=useState([])

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const HandleChange=(e)=>{
    setCategories({...categories,[e.target.name]:e.target.value})
  }

  useEffect(()=>{
    Axios.get('http://localhost:7000/api/categories/view')
    .then((res)=>{
      console.log('res',res.data);
      setGetCategories(res.data)
    }).catch((err)=>{
      alert(err)
    })
  },[])
  console.log(getCategories,22);

  const handleSubmit=(e)=>{
    e.preventDefault()

    Axios.post('http://localhost:7000/api/categories/insert',categories)
    .then((res)=>{
      console.log(res.data);
      setCategories(res.data)
    }).catch((err)=>{
      console.log(err);
    })

    handleClose()
  }

  return (
    <Box sx={{ display: 'flex' }}>

      <Drawer/>
       
      {/* part that displays table */}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1%'}}>
          <Typography variant="h4" gutterBottom>
            Category List
          </Typography>
          <Button onClick={handleOpen} variant='contained' color='inherit' ><AddIcon/>ADD CATEGORY</Button>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>sl no.</StyledTableCell>
                <StyledTableCell>Category name</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getCategories.map((row,index) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">{index+1}</StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>
                    {(row.status)===0? 'not available': 'available  '}
                    </StyledTableCell>
                  <StyledTableCell>
                    <div style={{display:'flex',gap:'1%'}}>
                    <Button variant='contained' color='primary'><EditIcon/></Button>
                    <Button variant='contained' color='success'><VisibilityIcon/></Button>
                    <Button variant='contained' color='error'><DeleteIcon/></Button>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h2 id="modal-modal-title"><b>Enter Category Details</b></h2>
            
            {/* Category Name */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',alignItems:'center'}}>
              Category name
              <TextField
                name='name'
                fullWidth
                label="Category Name"
                variant="outlined"
                margin="normal"
                onChange={(e)=>HandleChange(e)}
              />
  
              {/* Status */}
              status
              <Select
                fullWidth
                name='status'
                // label="Status"
                variant="outlined"
                margin="normal"
                onChange={(e)=>HandleChange(e)}
              >
                <MenuItem value="available">available</MenuItem>
                <MenuItem value="notAvailable">not available</MenuItem>
              </Select>
            </div>

            {/* Submit Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              sx={{ mt: 2 }}
            >
              Save
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}