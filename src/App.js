import React, { useEffect, useState } from 'react';
import './App.css';
import {
    TextField,
    Grid,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button, Avatar
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import imageToBase64 from 'image-to-base64/browser';
import OutlinedDiv from "./OutlinedDiv";


function App() {

    // Styles settings
    const useStyles = makeStyles((theme) => ({
       root: {
         flexGrow: 1,
       },
       menuButton: {
         marginRight: theme.spacing(2),
       },
       title: {
         flexGrow: 1,
       },
     }));
    const classes = useStyles();

    // Params
    const [picUrl, setPicUrl] = useState("");
    const [picCategory, setPicCategory] = useState("");

    // Functions
    const convertImageToBase64 =(picUrl) => {
        console.log('Picture URL :', picUrl)
        imageToBase64(picUrl) // Image URL
    .then(
        (response) => {
            console.log('Image in Base64 :', response)
            // TO DROP when we have the API
            const categoriesArray = ['profile',
                'office'];
            const randomNumber = Math.floor(Math.random() * categoriesArray.length);
            const picCategory = categoriesArray[randomNumber];
            console.log('Random category :', picCategory);
            setPicCategory(picCategory);
        }
    )
    .catch(
        (error) => {
            console.log(error)
        }
    )
    }

    //var AWS = require('aws-sdk');

    //var sageMakerRuntime = new AWS.SageMakerRuntime({region: 'us-west-2',});

    //var params = {
    //  Body: new Buffer('{"instances": [1.0,2.0,5.0]}'),
    //  EndpointName: 'half-plus-three'
    //};

    //sageMakerRuntime.invokeEndpoint(params, function(err, data) {
    //  responseData = JSON.parse(Buffer.from(data.Body).toString('utf8'))
    //  console.log(responseData);
    //});


  return (

     <>
       <AppBar position="static">
        <Toolbar className='myToolbar'>
          <Typography variant="h6" className={classes.title}>
            Demo - Image Categorization Model
          </Typography>
        </Toolbar>
      </AppBar>

         <Grid container style={{height:"90vh", padding:50}} justify="center">

      <Grid item xs={12} style={{display:"flex",alignItems:"center", flexDirection:"column"}}>
      <TextField
          id="standard-read-only-input"
          label="Enter the picture's url here"
          onChange={(e)=> setPicUrl(e.target.value)}
          defaultValue=""
          value={picUrl}
          variant="outlined"
          style={{width:"100vh"}}
        />
        <br/>
        <br/>
        {picUrl !== "" ?
        <OutlinedDiv label="Your picture">
        <img
            src={picUrl}
        />
        </OutlinedDiv>
      : <></>}

      </Grid>

      <Grid item xs ={3} style={{display:"flex", alignItems:"center", flexDirection:'column'}}>
          {picUrl !== "" ?
              <div>
                  <br />
                  <br />
                  <Button style={{width:"20vh", height:"5vh"}} variant= "outlined" onClick={()=>convertImageToBase64(picUrl)}>Detect category</Button>
              </div>
      : <></>}
      <br/>

      </Grid>

      <Grid item xs ={3} style={{display:"flex", alignItems:"center", flexDirection:'column'}}>
          {picCategory !== "" ?
              <div>
                  <br />
                  <br />
                  <Button style={{width:"20vh", height:"5vh", background:"#16a085", color:"#FFFFFF"}} variant= "outlined">{picCategory}</Button>
              </div>
      : <></>}
      <br/>

      </Grid>


         </Grid>

     </>

  );
}


export default App;