import connection from './connection'

export default {
  List: (req, res) => {
    console.log({query: 'Category.List'})
    connection.query(`SELECT * FROM categoris`, function(err, rows, fields) {
      if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err });
      return res.json(rows);
    });
  },
}