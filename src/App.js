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
    const [picCategoryProba, setPicCategoryProba] = useState("");

    // Functions
    const convertImageToBase64 =(picUrl) => {
        console.log('Picture URL :', picUrl)
        imageToBase64(picUrl) // Image URL
    .then(
        (response) => {
            console.log('Image in Base64 :', response)
            // API test
            requestSagemakerAPI(response)
        }
    )
    .catch(
        (error) => {
            console.log(error)
        }
    )
    }

    const requestSagemakerAPI =(base64) => {
        const sagemaker_url = "https://cors-anywhere.herokuapp.com/https://363xyhbjri.execute-api.eu-central-1.amazonaws.com/dev/predict";
        const xhr = new XMLHttpRequest();
        xhr.open("POST", sagemaker_url);
        xhr.setRequestHeader("Content-Type", "text/plain");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
        xhr.setRequestHeader("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                console.log('Request API status :', xhr.status);
                console.log('Results API :', xhr.responseText);
                const results = JSON.parse(xhr.responseText);
                const picCategory = Object.keys(results)[0];
                const picCategoryProba = Object.values(results)[0];
                console.log('Predicted Category :', picCategory);
                console.log('Predicted Category Probability:', picCategoryProba);
                setPicCategory(picCategory);
                setPicCategoryProba(picCategoryProba);
            }};
        xhr.send(base64);
    }


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
                  <Button style={{width:"20vh", height:"5vh", background:"#4051b5", color:"#FFFFFF"}} variant= "outlined">{picCategory} </Button>
              </div>
      : <></>}
      <br/>

      </Grid>

      <Grid item xs ={12} style={{display:"flex", alignItems:"center", flexDirection:'column'}}>
          {picCategory !== "" ?
              <div>
                  <br />
                  <br />
                  <Typography style={{color:"#4051b5", fontStyle: "italic", fontWeight: "bold"}} > Confidence in the prediction : {Math.round(picCategoryProba*100) + "%"} </Typography>
              </div>
      : <></>}
      <br/>

      </Grid>


         </Grid>

     </>

  );
}


export default App;