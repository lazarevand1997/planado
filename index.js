const express = require('express');
const app = express();
const api = require("./api");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require('path');
var {SECRET} = require("./config");

app.use(bodyParser.json());
//session use
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: SECRET,
    name: "sessionId",
    proxy: true,
    resave: true,
    saveUninitialized: true
  })
);

//uncomment before deploy
// app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/test',(req, res, next) => {
    res.json({ text:'hi' });
})

//api use
app.use("/api", api);

//uncomment before deploy
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// })

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Port ${PORT}`);
})
