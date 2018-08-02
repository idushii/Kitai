import connection from './connection'

export default {
  Words(req, res) {
    console.log({query: '/words'})
    connection.query(`SELECT * FROM Words`, function(err, rows, fields) {
      if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err });
      return res.json(rows);
    });
  },
  WordsCategoris(req, res) {
    console.log({query: '/words'})
    connection.query(`SELECT * FROM Words_categoris`, function(err, rows, fields) {
      if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err });
      return res.json(rows);
    });
  },
}