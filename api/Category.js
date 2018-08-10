import connection from './connection'

export default {
  List: (req, res) => {
    console.log({query: 'Category.List'})
    connection.query(`SELECT * FROM categoris`, function(err, rows, fields) {
      if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err });
      return res.json(rows);
    });
  },
  ListWithRecords: (req, res) => {
    console.log({query: 'Category.ListWithRecords'})
    let PromiseCategoris = new Promise( function(resolve, reject) {
      return connection.query(`SELECT * FROM categoris`, function(err, rows, fields) {
        if (err) return reject({message: 'Ошибка запроса', info: err})
        return resolve(rows)
      });
    }).catch(err => { res.status(500).json(err); console.log(err); })

    let PromiseRecords = new Promise( function(resolve, reject) {
      return connection.query(`SELECT * FROM records`, function(err, rows, fields) {
        if (err) return reject({message: 'Ошибка запроса', info: err})
        return resolve(rows)
      });
    }).catch(err => { res.status(500).json(err); console.log(err); })

    return Promise.all([PromiseCategoris, PromiseRecords])
      .then(result => {
        let data = []
        for (let Cat of result[0]) data.push({...Cat, Records: result[1].filter(record => record.idCategory == Cat.id)})
        return res.json(data)
      })
  },
  SaveCategory: (req, res) => {
    connection.query(`UPDATE Categoris SET Title = '${req.body.Title}', Info = '${req.body.Info.replace(/\'/g, "\\'")}' WHERE id='${req.params.id}'`, function(err, rows, fields) {
      if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err }); 
      return res.json({result: true});
    });
  },
  SaveRecord: (req, res) => {
    connection.query(`UPDATE Records SET Title = '${req.body.Title}', Text = '${req.body.Text.replace(/\'/g, "\\'")}', Info = '${req.body.Info.replace(/\'/g, "\\'")}' WHERE id='${req.params.id}'`, function(err, rows, fields) {
      if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err }); 
      return res.json({result: true});
    });
  },
}