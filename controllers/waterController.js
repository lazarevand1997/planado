module.exports = {
  create: (req, res) => {
      res.json('create')
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
