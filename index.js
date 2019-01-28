const express = require('express');
const app = express();
const { Client } = require('pg');

var dbstring = "postgres://xqxksffrpbzhst:62e9dbcff21a80e831ca7f2a50201524b954101f0d9ea6ad91c440b871a2646d@ec2-54-243-228-140.compute-1.amazonaws.com:5432/d8d8juq0t3283o";
const client = new Client({
  connectionString: dbstring,
  ssl: true,
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

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
