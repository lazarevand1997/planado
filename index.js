const express = require('express');
const app = express();

app.get('/api',(req, res, next) => {
    res.json({ text:'hi' });
})
// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Port ${PORT}`);
})
