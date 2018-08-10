import connection from './connection'

export default {
  List: (req, res) => {
    console.log({query: 'Page.List'})
    let PromisePages = new Promise( function(resolve, reject) {
      return connection.query(`SELECT * FROM pages`, function(err, rows, fields) {
        if (err) return reject({message: 'Ошибка удаления БД', info: err})
        return resolve(rows)
      })
    }).catch(console.warn)
    
    let PromiseCategoris = new Promise( function(resolve, reject) {
      return connection.query(`SELECT * FROM categoris`, function(err, rows, fields) {
        if (err) return reject({message: 'Ошибка удаления БД', info: err})
        return resolve(rows)
      });
    }).catch(console.warn)

    let PromiseRecords = new Promise( function(resolve, reject) {
      return connection.query(`SELECT * FROM records`, function(err, rows, fields) {
        if (err) return reject({message: 'Ошибка удаления БД', info: err})
        return resolve(rows)
      });
    }).catch(console.warn)

    return Promise.all([PromisePages, PromiseCategoris, PromiseRecords])
      .then(result => {
        let Pages = []
        for(let Page of result[0]) {
          let Categoris = []
          for (let Cat of result[1]) {
            Cat.Records = result[2].filter( Record => Record.idCategory == Cat.id )
            if (Page.id == Cat.idPage) Categoris.push(Cat)
          }
          if (Categoris.length) Page.Categoris = Categoris;
          Pages.push(Page)
        }
        res.json(Pages)
      })
    
  },
  ByPath: (req, res) => {
    console.log({query: 'Page.ByPath'})
    connection.query(`SELECT * FROM pages WHERE Path='${req.params.Path}'`, function(err, rows, fields) {
      if (err) return res.status(401).json({ message: 'Ошибка запроса', info: err }); 
      return res.json(rows.length == 1 ? rows.pop() : rows);
    });
  },
  SaveByPath: (req, res) => {
    console.log({query: 'Page.SaveByPath'})
    connection.query(`UPDATE pages SET Title = '${req.body.Title}', Text = '${req.body.Text.replace(/\'/g, "\\'")}', ShowItem = '${req.body.ShowItem}' WHERE Path='${req.params.Path}'`, function(err, rows, fields) {
      if (err) return res.status(401).json({ message: 'Ошибка запроса', info: err }); 
      return res.json({result: true});
    });
  },
}