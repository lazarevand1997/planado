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



module.exports = {
  create: (req, res) => {
      var id = req.session.userid;
      var year = req.body.year;
      var month = req.body.month;
      var cold = req.body.cold;
      var hot = req.body.hot;
      pool.query('SELECT * FROM public.water_counter WHERE master = $1 AND year = $2 AND month = $3;', ([id, year, month]), (error, results) => {
          if (error) {
            throw error;
          };
          var water_data = results.rows;
          var picked = water_data.find(o => o.master === id);
          if ( typeof picked !== 'undefined' && picked ){
              return res.json({status: "already use"});
          } else {
              pool.query('INSERT INTO public.water_counter(hotwater, coldwater, year, month, master) values($1, $2, $3, $4, $5)',
              [hot, cold, year, month, id], (err, response) => {
                  if (err) throw err;
                  return res.json({response:response, status:"success"});
              });
          }
      });
  },

  read: (req, res) => {
      res.json('read');
  },

  delete: (req, res) => {
      res.json('delete');
  },

  update: (req, res) => {
      res.json('update');
  }
};
