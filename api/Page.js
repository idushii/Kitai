import connection from './connection'

export default {
  Pages: (req, res) => {
    console.log({query: '/pages'})
    connection.query(`SELECT * FROM Pages`, function(err, rows, fields) {
      if (err) return res.status(401).json({ message: 'Ошибка запроса', info: err }); 
      return res.json(rows)
    });
  },
  PageByPath: (req, res) => {
    //var connection = mysql.createConnection(mysqlCofig);
    //connection.connect();
    connection.query(`SELECT * FROM Pages WHERE Path='${req.params.Path}'`, function(err, rows, fields) {
      if (err) return res.status(401).json({ message: 'Ошибка запроса', info: err }); 
      return res.json(rows.length == 1 ? rows.pop() : rows);
    });
  },
  SavePageByPath: (req, res) => {
    //var connection = mysql.createConnection(mysqlCofig);
    //connection.connect();
    connection.query(`UPDATE Pages SET Title = '${req.body.Title}', Text = '${req.body.Text.replace(/\'/g, "\\'")}', ShowItem = '${req.body.ShowItem}' WHERE Path='${req.params.Path}'`, function(err, rows, fields) {
      if (err) return res.status(401).json({ message: 'Ошибка запроса', info: err }); 
      return res.json({result: true});
    });
  },
}