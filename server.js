projectData = {}; //an empty object to act as end point
const express = require('express');
const app = express(); //setting up the server
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
app.use(express.static('website'));
const port = 3000;
const server = app.listen(port, listening);
 function listening(){
   console.log(`running on localhost: ${port}`); //testing if the server is working or not
  };
app.get('/all', sendData);  // get route to send the data
function sendData (request, response) {
  response.send(projectData);
};
app.post('/weather', addData); // post route to recieve data and set it to projectData
function addData (req,res){
    projectData.temp = req.body.temp;
    projectData.date = req.body.newDate;
    projectData.feeling = req.body.feeling;
};