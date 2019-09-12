const express = require("express");
const axios = require("axios");
const cors = require("cors"); 

const helpers = require("./helpers.js");

const app = express();
const port = 8080;



app.use(cors()); 

app.get("/stop/:stop/:line", (req, res) => {
    let stop = req.params.stop; 
    let line = req.params.line;

    if(stop && line) {
        let url = helpers.createDeparturesUrl(stop)

        axios.get(url.toString())
        .then(response => {
            let nextTime = helpers.getFirstTime(response, line); 
            console.log(nextTime);
            res.send({time: nextTime})
        })
        .catch(error => {
          console.log(error);
        }); 
    }
});


app.get("/lines/:stop", (req, res) => {
  let stop = req.params.stop; 

  if(stop) {
    let url = helpers.createLinesUrl(stop); 

    axios.get(url.toString())
    .then(response => {
      let lines = helpers.parseLines(helpers.getLines(response));
      console.log(lines);
      res.send({lines: lines}) 
    })
    .catch(err => {
      console.log(err); 
    })
  }
}); 


app.listen(port, () => console.log(`Ready to receive calls in port ${port}!`))