// pass hash
const bcrypt = require('bcrypt');
var BCRYPT_SALT_ROUNDS = 12;

//db connection
const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'xqxksffrpbzhst',
  host: 'ec2-54-243-228-140.compute-1.amazonaws.com',
  database: 'd8d8juq0t3283o',
  password: '62e9dbcff21a80e831ca7f2a50201524b954101f0d9ea6ad91c440b871a2646d',
  port: 5432,
  ssl: true
});
// webtoken
const jwt = require('jsonwebtoken');
var SECRET = 'planadosession';
var createToken = (details, secret) => {
  return jwt.sign({ userId: details.userId }, secret, {
    expiresIn: details.expire
  });
};


module.exports = {
  create: (req, res) => {
      var login = req.body.login;
      var password = req.body.password;
      bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
       .then(function(hashedPassword) {
           console.log(hashedPassword);
           pool.query('INSERT INTO users(user_name, password) values($1, $2)',
           [login, hashedPassword], (err, response) => {
               if (err) throw err;
               return res.json(response);
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
      pool.query('SELECT * FROM users;', (err, response) => {
        if (err) throw err;
        for (let row of response.rows) {
          result.push(JSON.stringify(row));
        }
        return res.json(result);
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
               var access_token = createToken({
                   userId:picked_user.id,
                   type: "access",
                   expire: "365d"
               },
                SECRET);
               req.session.access_token = access_token;
               req.session.name = picked_user.user_name;
               return res
                .status(201)
                .json({ status: "success", user_name: picked_user.user_name, access_token: access_token });
           } else {
               res.send('error log');
               console.log('not ok');
           };
       });
  }
};
