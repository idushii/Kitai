import connection from './connection'

export default {
  List(req, res) {
    console.log({query: 'Word.List'})
    connection.query(`SELECT * FROM Words`, function(err, rows, fields) {
      if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err });
      return res.json(rows);
    });
  },
  Categoris(req, res) {
    console.log({query: 'Word.Categoris'})
    connection.query(`SELECT * FROM Words_categoris`, function(err, rows, fields) {
      if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err });
      return res.json(rows);
    });
  },
  Save(req, res) {
    console.log({query: 'Word.Save'})
    let collumns = ['idUser', 'Pinyin', 'Hieroglyph', 'Translate', 'Level', 'Categoris', 'Sound']
      .reduce( (result, collumn) => {result[collumn] = req.body[collumn]; return result}, {} )

    connection.query(`UPDATE words SET ? WHERE id='${req.body.id}'`, collumns, function(err, rows, fields) {
      if (err) return res.status(401).json({ message: 'Ошибка запроса', info: err }); 
      return res.json({result: true});
    });//*/
  },
}