const { Client } = require('pg');
// pass hash
const bcrypt = require('bcrypt');
var BCRYPT_SALT_ROUNDS = 12;
//db connection
var dbstring = "postgres://xqxksffrpbzhst:62e9dbcff21a80e831ca7f2a50201524b954101f0d9ea6ad91c440b871a2646d@ec2-54-243-228-140.compute-1.amazonaws.com:5432/d8d8juq0t3283o";
const client = new Client({
  connectionString: dbstring,
  ssl: true,
});

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'xqxksffrpbzhst',
  host: 'ec2-54-243-228-140.compute-1.amazonaws.com',
  database: 'd8d8juq0t3283o',
  password: '62e9dbcff21a80e831ca7f2a50201524b954101f0d9ea6ad91c440b871a2646d',
  port: 5432,
  ssl: true
});


module.exports = {
  create: (req, res) => {
      var login = req.body.login;
      var password = req.body.password;
      bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS)
       .then(function(hashedPassword) {
           console.log(hashedPassword);
           client.connect();
           client.query('INSERT INTO users(user_name, password) values($1, $2)',
           [login, hashedPassword], (err, response) => {
               if (err) throw err;
               return res.json(response);
               client.end();
           });

       })
       .catch(function(error){
           console.log("Error saving user: ");
           console.log(error);
           return res.send('error pass');
       });
  },

  read: (req, res) => {
      var result = [];
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
      var login = req.body.login;
      var password = req.body.password;
      pool.query('SELECT * FROM public.users WHERE user_name = $1;', ([login]), (error, results) => {
           if (error) {
             throw error;
           };
           var user_data = results.rows;
           var picked_user = user_data.find(o => o.user_name === login);
           if(bcrypt.compareSync(password, picked_user.password)){
               res.send('loged');
               console.log('ok');
           } else {
               res.send('error log');
               console.log('not ok');
           };
       });
  }
};
