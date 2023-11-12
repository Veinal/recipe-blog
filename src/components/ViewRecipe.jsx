import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function ActionAreaCard() {
  return (
    <div>
      <Grid container spacing={2}>
        {/* Large Card */}
        <Grid item xs={12} md={8}>
          <Card sx={{ maxWidth: 900, maxHeight: '100%',marginLeft:'3%' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="400"
                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
  
        {/* Related Images */}
        <Grid item xs={12} md={4} >
          <div style={{marginLeft:'5%'}}><h3 ><b>Related Recipes:</b></h3></div>
          {/* Replace the loop with your data */}
          {[1, 2, 3].map((index) => (
            <Card key={index} sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt={`green iguana ${index}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard {index}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
