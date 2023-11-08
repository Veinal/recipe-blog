import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';



export default function ImgMediaCard() {
  return (
    <div>
      <br />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div class="dropdown">
        <button
          class="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-mdb-toggle="dropdown"
          aria-expanded="false"
          style={{marginRight:'5px'}}
        >
          <i class="fas fa-filter fa-2x"></i>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div>

        <div class="input-group" style={{ maxWidth: '300px' }}>
          <div class="form-outline" style={{ flex: 1 }}>
            <input type="search" id="form1" class="form-control" style={{ padding: '0.375rem',border:'1px solid black' }} />
            <label class="form-label" for="form1">Search</label>
          </div>
          <button type="button" class="btn btn-primary">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>

      <br />

      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>

      <hr />

      <div>
      <h2><b>REQUEST FOR RECIPE:</b></h2>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          // justifyContent:'center',
          '& > :not(style)': {
            m: 1,
            width: 500,
            height: 200,
          },
        }}
      >
        <Paper style={{display:'flex',justifyContent:'center',alignItems:'center'}} elevation={3}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',alignItems:'center',gap:10}}> 
          <h5>Request:</h5><TextField style={{marginLeft:'-25%'}} size='small' id="filled-basic"  variant="outlined" />
          <h5>Remarks:</h5><TextField style={{marginLeft:'-25%'}} id="filled-basic"  variant="outlined" multiline />
        </div>
        {/* <span style={{display:'flex',justifyContent:'flex-end',marginRight:'50px'}}><Button variant='contained' color='success'>Submit</Button></span> */}
        
        </Paper> 
      </Box>
        
      </div>

    </div>
  );
}