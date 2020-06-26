const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var inputarray = [];

//Giving the input in the form of bounces and coordinates
app.post("/inputBallBounceCoordinate", (req, res) => {
  const input = req.body;

  const inputJson = JSON.stringify(input);
  inputarray.push(inputJson);
  fs.writeFileSync("data.json", "[");
  fs.appendFileSync("data.json", inputarray);
  fs.appendFileSync("data.json", "]");
  res.status(201).send(inputarray);
});

app.get("/getBallBounceCoordinate", (req, res) => {
  const dataBuffer = fs.readFileSync("data.json", "utf-8");
  const parseData = JSON.parse(dataBuffer);

  res.status(200).send(parseData[parseData.length - 1]);
});

app.get("/allpastcalculations", (req, res) => {
  const dataBuffer = fs.readFileSync("data.json", "utf-8");
  const parseData = JSON.parse(dataBuffer);
  res.status(200).send(parseData);
});

app.listen(port, () => {
  console.log(`Server started successfully on port ${port}`);
});
