const { Client } = require('pg');


module.exports = {
  create: (req, res) => {
      res.json({ text:'create' })
  },

  read: (req, res) => {
      var result = [];
      var dbstring = "postgres://xqxksffrpbzhst:62e9dbcff21a80e831ca7f2a50201524b954101f0d9ea6ad91c440b871a2646d@ec2-54-243-228-140.compute-1.amazonaws.com:5432/d8d8juq0t3283o";
      const client = new Client({
        connectionString: dbstring,
        ssl: true,
      });
      client.connect();
      client.query('SELECT * FROM users;', (err, response) => {
        if (err) throw err;
        for (let row of response.rows) {
          result.push(JSON.stringify(row));
        }
        return res.json(result);
        client.end();
      });

  },

  delete: (req, res) => {
      res.json('delete');
  },

  update: (req, res) => {
     res.json({ text:'update' });
  },

  login: (req, res) => {
      res.json({ text:'login' });
  }
};
