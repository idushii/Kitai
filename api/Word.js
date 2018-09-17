import connection from './connection'

export default {
  List(req, res) {
    console.log({query: 'Word.List'})
    connection.query(`SELECT * FROM words limit 50`, function(err, rows, fields) {
      if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err });
      return res.json(rows);
    });
  },
  ListByUser(req, res) {
    console.log({query: 'Word.ListByUser'})
    connection.query(`SELECT * FROM words WHERE idUser = ${req.params.idUser} limit 50`, function(err, rows, fields) {
      if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err });
      return res.json(rows);
    });
  },
  Word(req, res) {
    console.log({query: 'Word.Word'})
    connection.query(`SELECT * FROM words Where Translate = '${req.params.Translate}'`, function(err, rows, fields) {
      if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err });
      return res.json(rows[0]);
    });
  },
  Search(req, res) {
    console.log({query: 'Word.Search'})
    connection.query(`SELECT * FROM words WHERE 
                        Pinyin LIKE "%${req.body.Text}%" OR 
                        Translate LIKE "%${req.body.Text}%" OR 
                        Hieroglyph LIKE "%${req.body.Text}%" OR 
                        Sample LIKE "%${req.body.Text}%"
                        Limit 50
                      `, function(err, rows, fields) {
      if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err });
      return res.json(rows);
    });
  },
  SearchByUser(req, res) {
    console.log({query: 'Word.SearchByUser'}, req.params, req.body)
    let sql = `SELECT * FROM words WHERE 
      (Pinyin LIKE "%${req.body.Text}%" OR 
      Translate LIKE "%${req.body.Text}%" OR 
      Hieroglyph LIKE "%${req.body.Text}%" OR 
      Sample LIKE "%${req.body.Text}%")
      AND idUser = "${req.params.id}"
      Limit 50`
    connection.query(sql, function(err, rows, fields) {
      if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err });
      return res.json(rows);
    });
  },
  Categoris(req, res) {
    console.log({query: 'Word.Categoris'})
    connection.query(`SELECT * FROM words_categoris`, function(err, rows, fields) {
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
  New(req, res) {
    console.log({query: 'Word.New'})
    let fields = ['idUser', 'Pinyin', 'Hieroglyph', 'Translate', 'Level', 'Categoris', 'Sound']
    let collumns = fields.reduce( (result, collumn) => {result[collumn] = req.body[collumn] || ''; return result}, {} )

    connection.query(`INSERT INTO words SET ?`, collumns, function(err, rows, fields) {
      if (err) return res.status(401).json({ message: 'Ошибка запроса', info: err }); 
      return LAST_INSERT_ID().then( id => res.json({result: true, id}) );
    });//*/
  },
}

function LAST_INSERT_ID() {
  return new Promise( (rTrue, rFalse) => {
    connection.query(`SELECT LAST_INSERT_ID()`, function(err, rows, fields) {
      if (err) return rFalse({ message: 'Ошибка запроса', info: err });
      return rTrue(rows[0]['LAST_INSERT_ID()'])
    });
  } )
}