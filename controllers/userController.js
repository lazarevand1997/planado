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
var {SECRET} = require("../config");
var createToken = (details, secret) => {
  return jwt.sign({ userId: details.userId }, secret, {
    expiresIn: details.expire
  });
};


module.exports = {
  create: (req, res) => {
      var login = req.body.login;
      var firstname = req.body.firstname;
      var lastname = req.body.lastname;
      var address = req.body.address;
      var password = firstname + lastname;
      bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
       .then(function(hashedPassword) {
           console.log(hashedPassword);
           pool.query('INSERT INTO users(user_name, password, first_name, second_name, address) values($1, $2, $3, $4, $5)',
           [login, hashedPassword, firstname, lastname, address], (err, response) => {
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

  changePassword: (req, res) => {
      var userid = req.session.userid;
      var new_password  = req.body.new_password;
      bcrypt.hash(new_password, BCRYPT_SALT_ROUNDS)
       .then(function(hashedPassword) {
           console.log(hashedPassword);
           pool.query('UPDATE users SET password = $1, pass_changed = TRUE  WHERE id = $2',
           [hashedPassword, userid], (err, response) => {
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

  check: (req, res) => {
      return res.send({ username: req.session.name, isadmin: req.session.isadmin });
  },

  gettop: (req, res) => {
           var watertype = req.body.watertype;
           pool.query('SELECT distinct master FROM public.water_counter;', (error, results) => {
               if (error) {
                 throw error;
               };
               var users_data = results.rows;
               pool.query('SELECT * FROM public.water_counter;', (error, resu) => {
                   if (error) {
                     throw error;
                   };
                   var water_data = resu.rows;
                   var top_users = [];
                   users_data.forEach(function(element){
                       var new_total = {
                           userid: element.master,
                           count: 0
                       };
                       water_data.forEach(function(e){
                           if(element.master === e.master){
                               if(watertype === 'hot'){
                                   new_total.count += e.hotwater;
                               } else {
                                   new_total.count += e.coldwater;
                               }
                           }
                       });
                       top_users.push(new_total);
                   });
                    pool.query('SELECT * FROM public.users;', (error, result) => {
                        if (error) {
                          throw error;
                        };
                        var usersinfo = result.rows;
                        var tosend = [];
                        top_users.forEach(function(el){
                            usersinfo.forEach(function(ele){
                                if(el.userid === ele.id){
                                    var new_tosend_data = {
                                        userinfo: ele,
                                        watercount: el.count
                                    }
                                    tosend.push(new_tosend_data);
                                }
                            });
                        });
                        return res.send(tosend);
                    });
               });
           });
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
                   req.session.isadmin = picked_user.is_admin;
                   req.session.userid = picked_user.id;
                   if(picked_user.pass_changed){
                       return res
                        .status(201)
                        .json({ status: "success", user_name: picked_user.user_name, access_token: access_token, need_pass: false});
                    } else {
                        return res.json({ status: "success", user_name: picked_user.user_name, access_token: access_token, need_pass: true})
                    }
           } else {
               res.send('error log');
               console.log('not ok');
           };
       });
  }
};
