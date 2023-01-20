var bodyParser = require('body-parser')
const express = require("express");
const app = express();
const reminder=require("./reminders")
const cors = require("cors");
app.use(bodyParser.json())
app.use(cors());
app.use("/reminder",reminder);

app.listen(process.env.PORT || 3000,()=>{
  console.log("backend is running");
})
