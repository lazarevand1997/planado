const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/api',(req, res, next) => {
    res.json({ text:'hi' });
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Port ${PORT}`);
})
