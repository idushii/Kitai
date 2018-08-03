import connection from './connection'

export default {
  List: (req, res) => {
    console.log({query: 'Page.List'})
    connection.query(`SELECT * FROM Pages`, function(err, rows, fields) {
      if (err) return res.status(401).json({ message: 'Ошибка запроса', info: err }); 
      return res.json(rows)
    });
  },
  ByPath: (req, res) => {
    console.log({query: 'Page.ByPath'})
    connection.query(`SELECT * FROM Pages WHERE Path='${req.params.Path}'`, function(err, rows, fields) {
      if (err) return res.status(401).json({ message: 'Ошибка запроса', info: err }); 
      return res.json(rows.length == 1 ? rows.pop() : rows);
    });
  },
  SaveByPath: (req, res) => {
    console.log({query: 'Page.SaveByPath'})
    connection.query(`UPDATE Pages SET Title = '${req.body.Title}', Text = '${req.body.Text.replace(/\'/g, "\\'")}', ShowItem = '${req.body.ShowItem}' WHERE Path='${req.params.Path}'`, function(err, rows, fields) {
      if (err) return res.status(401).json({ message: 'Ошибка запроса', info: err }); 
      return res.json({result: true});
    });
  },
}