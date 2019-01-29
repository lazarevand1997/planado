const express = require('express');
const app = express();
const api = require("./api");

const path = require('path');
app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/test',(req, res, next) => {
    res.json({ text:'hi' });
})

//api use
app.use("/api", api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Port ${PORT}`);
})
