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
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

const style3 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxHeight: '95vh', // Set a maximum height to allow scrolling
  overflowY: 'auto', // Enable vertical scrolling if the content exceeds the height
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

export default function ClippedDrawer() {
  const navigate=useNavigate()

  const [form,setForm]=useState()
  const [count,setCount]=useState(0)

  const [getCategory,setGetCategory]=useState([]) //for useeffect
  const [categState,setCategState]=useState()  //for onchange

  const Input=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
    console.log(form)
  }

  const InputImage=(e)=>{
    setForm({...form,[e.target.name]:e.target.files[0]})
    console.log(form)
  }

  const handleCategory=(e)=>{
    setCategState(e.target.value)
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
  },[count])
  console.log(getRecipes,1);

  useEffect(()=>{
    Axios.get('http://localhost:7000/api/categories/view')
    .then((res)=>{
      console.log(res.data)
      setGetCategory(res.data)
    }).catch((err)=>{
      alert(err)
    })
  },[])
console.log(getCategory,'ca')

  const [selected,setSelected]=useState('')

  //input recipe form 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    Axios.delete(`http://localhost:7000/api/recipes/delete/${selected._id}`)
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

  const handleSubmit=async(e)=>{
    e.preventDefault()

    const Data=new FormData();
    Data.append("recipeName",form.recipeName)
    Data.append("image",form.image)
    Data.append("ingredients",form.ingredients)
    Data.append("category",categState)
    Data.append("description",form.description)
    Data.append("instructions",form.instructions)
    Data.append("video",form.video)

    console.log(Data)
    Axios.post('http://localhost:7000/api/recipes/insert',Data)
    .then((result)=>{
      console.log(result.data);
      setCount((prev)=>!prev);
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

        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1%'}}>
          <Typography variant="h4" gutterBottom>
            Recipe List
          </Typography>
          <Button onClick={handleOpen} variant='contained' color='inherit' ><AddIcon/>ADD RECIPE</Button>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Sl no.</StyledTableCell>
                <StyledTableCell>Recipe name</StyledTableCell>
                <StyledTableCell>Image</StyledTableCell>
                {/* <StyledTableCell>Ingredients</StyledTableCell> */}
                <StyledTableCell>Category</StyledTableCell>
                {/* <StyledTableCell>Description</StyledTableCell> */}
                {/* <StyledTableCell>Instructions</StyledTableCell> */}
                {/* <StyledTableCell>Videos</StyledTableCell> */}
                <StyledTableCell >Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getRecipes?.map((row,index) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">{index+1}</StyledTableCell>
                  <StyledTableCell>{row.recipeName}</StyledTableCell>
                  <StyledTableCell>
                    <img src={`http://localhost:7000/uploads/recipe/${row?.image}`} alt="alt" style={{width:50,height:50,borderRadius:'15%'}} />
                  </StyledTableCell>
                  {/* <StyledTableCell>{row.ingredients}</StyledTableCell> */}
                  <StyledTableCell>{row.category_id?.name}</StyledTableCell>
                  {/* <StyledTableCell>{row.description}</StyledTableCell> */}
                  {/* <StyledTableCell>{row.instructions}</StyledTableCell> */}
                  {/* <StyledTableCell>{row.video}</StyledTableCell> */}
                  <StyledTableCell style={{display:'flex',gap:'2%'}}>
                    <Link to={`/editrecipelist/${row?._id}`}><Button variant='contained' color='primary'><EditIcon/></Button></Link>
                    <Button variant='contained' color='success' onClick={()=>handleOpenView(row)}><VisibilityIcon/></Button>
                    <Button variant='contained' color='error' onClick={()=>handleOpenDel(row)}><DeleteIcon/></Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <div>
          {/* enter recipe details */}
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
                    <label>Image:</label><TextField onChange={(e)=>InputImage(e)} type='file' name='image' id="outlined-basic" label="image" variant="outlined" />
                    <label>Ingredients:</label><TextField onChange={(e)=>Input(e)} name='ingredients' id="outlined-basic" label="ingredients" variant="outlined" multiline/>
                    {/* <label>Category:</label><TextField onChange={(e)=>Input(e)} name='category' id="outlined-basic" label="category" variant="outlined" /> */}
                    <label>Category:</label>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Category:</InputLabel>
                          <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={age}
                          name="category"
                          label="Category"
                          onChange={(e)=>handleCategory(e)}
                          >
                          {getCategory?.map((item)=>{
                              return(<MenuItem value={item._id}>{item.name}</MenuItem>)
                          })}                       
                          </Select>
                      </FormControl>
                    </Box>
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
                  do you want to delete {selected.recipeName} ?
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
            <Card>
              <CardContent>
              <Typography style={{display:'flex',justifyContent:'center'}} gutterBottom variant="h4" component="div">
                <b><u>VIEW RECIPE</u></b>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <span style={{display:'flex',justifyContent:'center'}}>
                  <img src={`http://localhost:7000/uploads/recipe/${selected?.image}`} alt="no image found" style={{width:'400px',height:'300px',objectFit:'cover',border:'2px solid black',padding:'1%'}} />
                </span>
                <hr />
                <h4><label><b>recipe name:</b></label> {selected.recipeName}</h4>
                <h4><label><b>description:</b></label> {selected.ingredients}</h4>
                <h4><label><b>category:</b></label> {selected.category_id?.name}</h4>
                <h4><label><b>ingredients:</b></label> {selected.category}</h4>
                <h4><label><b>instructions:</b></label> {selected.description}</h4>
                <h4><label><b>video:</b></label> {selected.video}</h4>
                <Button onClick={handleCloseView} variant='contained' color='inherit'>Close</Button>
              </Typography>
              </CardContent>
              
            </Card>
            </Box>
          </Modal>
        </div>

      </Box>
    </Box>
  );
}