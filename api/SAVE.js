import connection from './connection'

export default {
  Word(req, res) {
    console.log({query: '/word/:id', action: 'save'})
    let collumns = ['idUser', 'Pinyin', 'Hieroglyph', 'Translate', 'Level', 'Categoris', 'Sound']
      .reduce( (result, collumn) => {result[collumn] = req.body[collumn]; return result}, {} )

    connection.query(`UPDATE words SET ? WHERE id='${req.body.id}'`, collumns, function(err, rows, fields) {
      if (err) return res.status(401).json({ message: 'Ошибка запроса', info: err }); 
      return res.json({result: true});
    });//*/
  },
}