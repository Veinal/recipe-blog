import Box from '@mui/material/Box';
import { useState,useEffect } from 'react';

import Axios from 'axios';
import * as React from 'react';
import Drawer from './Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {TextField} from '@mui/material';
import { useNavigate } from 'react-router-dom';


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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
  overflowY: 'auto',
  height: '100vh'
};


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

export default function ClippedDrawer() {
  const navigate=useNavigate()

  const [form,setForm]=useState()

  const Input=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
    console.log(form)
  }

  const [getRecipes,setGetRecipes]=useState([])

  useEffect(()=>{
    Axios.get('http://localhost:7000/api/recipes/view')
    .then((res)=>{
      console.log(res.data,'res');
      setGetRecipes(res.data)
    })
    .catch((err)=>{
      alert(err)
    })
  },[])
  console.log(getRecipes,1);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleSubmit=async(e)=>{
    e.preventDefault()

    Axios.post('http://localhost:7000/api/recipes/insert',form)
    .then((result)=>{
      console.log(result.data);
      
    })
    .catch((err)=>{
      console.log(err);
    })

    setOpen(false)
    navigate('/recipelist')
  }

  return (
    <Box sx={{ display: 'flex' }}>

      <Drawer/>
       
      {/* part that displays table */}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <div style={{display:'flex',justifyContent:'end',marginBottom:'1%'}}>
          <Button onClick={handleOpen} variant='contained' color='inherit'><AddIcon/>ADD RECIPE</Button>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Sl no.</StyledTableCell>
                <StyledTableCell>Recipe name</StyledTableCell>
                <StyledTableCell>Image</StyledTableCell>
                <StyledTableCell>Ingredients</StyledTableCell>
                <StyledTableCell>Category</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Instructions</StyledTableCell>
                <StyledTableCell>Videos</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getRecipes?.map((row,index) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">{index+1}</StyledTableCell>
                  <StyledTableCell>{row.recipeName}</StyledTableCell>
                  <StyledTableCell>{row.image}</StyledTableCell>
                  <StyledTableCell>{row.ingredients}</StyledTableCell>
                  <StyledTableCell>{row.category}</StyledTableCell>
                  <StyledTableCell>{row.description}</StyledTableCell>
                  <StyledTableCell>{row.instructions}</StyledTableCell>
                  <StyledTableCell>{row.video}</StyledTableCell>
                  <StyledTableCell>
                    <Button>edit</Button>
                    <Button>view</Button>
                    <Button>delete</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div>
              <Card variant='outlined' sx={{ minWidth: 275 }}>
                <CardContent>
                  <h2 style={{marginLeft:'20%'}}><b>ENTER RECIPE DETAILS:</b></h2> 
                  <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'1%'}}>
                    <label>Recipe name:</label><TextField onChange={(e)=>Input(e)} name='recipeName' id="outlined-basic" label="recipe name" variant="outlined" />
                    <label>Image:</label><TextField onChange={(e)=>Input(e)} type='file' name='image' id="outlined-basic" label="image" variant="outlined" />
                    <label>Ingredients:</label><TextField onChange={(e)=>Input(e)} name='ingredients' id="outlined-basic" label="ingredients" variant="outlined" multiline/>
                    <label>Category:</label><TextField onChange={(e)=>Input(e)} name='category' id="outlined-basic" label="category" variant="outlined" />
                    <label>Description:</label><TextField onChange={(e)=>Input(e)} name='description' id="outlined-basic" label="description" variant="outlined" multiline/>
                    <label>Instructions:</label><TextField onChange={(e)=>Input(e)} name='instructions' id="outlined-basic" label="instructions" variant="outlined" multiline />
                    <label>Video:</label><TextField onChange={(e)=>Input(e)} name='video' id="outlined-basic" label="video" variant="outlined" />
                  </div>
                </CardContent>
                <CardActions>
                  <Button onClick={handleSubmit} style={{marginLeft:'45%',marginTop:'2%'}} variant='contained'>ADD</Button>
                </CardActions>
              </Card>
              </div>
              
            </Box>
          </Modal>
        </div>
      </Box>
    </Box>
  );
}