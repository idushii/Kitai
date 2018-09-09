import connection from './connection'

export default {
  List: (req, res) => {
    console.log({query: 'Test.List'})
    //return res.json({rows: []})
    connection.query(`SELECT * FROM testings`, function(err, rows, fields) {
      if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err });
      return res.json(rows);
    });
  },
  ById: (req, res) => {
    console.log({query: 'Test.ById'})
    connection.query(`SELECT * FROM testings WHERE id="${req.params.id}"`, function(err, rows, fields) {
      if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err });
      return res.json(rows);
    });
  },
  ByIdItems: (req, res) => {
    console.log({query: 'Test.ByIdItems'})
    connection.query(`SELECT * FROM testings_item WHERE idTest="${req.params.id}"`, function(err, rows, fields) {
      if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err });
      return res.json(rows);
    });
  },
  SaveItem: (req, res) => {
    console.log({query: 'Test.SaveItem'})
    let collumns = ['OrderItem', 'Quest', 'Info', 'Variant_1', 'Variant_2', 'Variant_3', 'Variant_4', 'NumberTrue', 'Sound']
      .reduce( (result, collumn) => {result[collumn] = req.body[collumn]; return result}, {} )
  
    connection.query(`UPDATE testings_item SET ? WHERE id='${req.body.id}'`, collumns, function(err, rows, fields) {
      if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err }); 
      return res.json({result: true});
    });//*/    
  },
  SaveInfo: (req, res) => {
    console.log({query: 'Test.SaveInfo'})
    let collumns = ['idCategory', 'Title', 'Info', 'InfoFull']
      .reduce( (result, collumn) => {result[collumn] = req.body[collumn]; return result}, {} )
  
    connection.query(`UPDATE testings SET ? WHERE id='${req.body.id}'`, collumns, function(err, rows, fields) {
      if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err }); 
      return res.json({result: true});
    });//*/
  },
  Save: async (req, res) => {
    console.log({query: 'Test.Save'})
    let collumnsInfo = ['idCategory', 'Title', 'Info', 'InfoFull']
      .reduce( (result, collumn) => {result[collumn] = req.body[collumn]; return result}, {} )
  
    let Quests = {
      update: req.body.Items.filter( item => item.isHide == false && item.id !== null ),
      insert: req.body.Items.filter( item => item.isHide == false && item.id === null ),
      delete: req.body.Items.filter( item => item.isHide == true && item.id !== null ),
    }
  
    let PromiseInfo = new Promise((callTrue, callFalse) => {
      connection.query(`UPDATE testings SET ? WHERE id='${req.body.id}'`, collumnsInfo, function(err, rows, fields) { if (err) callFalse({ message: 'Ошибка запроса', info: err });  else callTrue(true); });//*/
    })
  
    let PromiseQuests = {
      update: [],
      insert: [],
      delete: [],
    }
  
    for(let i=0; i<Quests.update.length; i++) {
      PromiseQuests.update.push(
        new Promise((callTrue, callFalse) => {
          let collumns = ['id', 'OrderItem', 'Quest', 'Info', 'Variant_1', 'Variant_2', 'Variant_3', 'Variant_4', 'NumberTrue']
            .reduce( (result, collumn) => {result[collumn] = Quests.update[i][collumn]; return result}, {} )
  
          connection.query(`UPDATE testings_item SET ? WHERE id='${collumns.id}'`, collumns, function(err, rows, fields) {
            if (err) callFalse({ message: 'Ошибка запроса', info: err }); else callTrue({result: true, action: 'update query', payload: collumns});
          })
        })
      )
    }//*/
  
    for(let i=0; i<Quests.insert.length; i++) {
      PromiseQuests.insert.push(
        new Promise((callTrue, callFalse) => {
          let collumns = ['idTest', 'OrderItem', 'Quest', 'Info', 'Variant_1', 'Variant_2', 'Variant_3', 'Variant_4', 'NumberTrue', 'Sound']
            .reduce( (result, collumn) => {result[collumn] = Quests.insert[i][collumn]; return result}, {} )
          
          connection.query(`INSERT INTO testings_item SET ?`, collumns, function(err, rows, fields) {
            if (err) callFalse({ message: 'Ошибка запроса', info: err }); else callTrue({result: true, action: 'insert query', payload: collumns});
          })
        })
      )
    }//*/
  
    for(let i=0; i<Quests.delete.length; i++) {
      PromiseQuests.delete.push(
        new Promise((callTrue, callFalse) => {
          let collumns = {id: Quests.delete[i].id}
          
          connection.query(`DELETE FROM testings_item WHERE ?`, collumns, function(err, rows, fields) {
            if (err) callFalse({ message: 'Ошибка запроса', info: err }); else callTrue({result: true, action: 'delete query', payload: collumns});
          })
        })
      )
    }//*/
  
    let result = await Promise.all(
      [PromiseInfo]
        .concat(PromiseQuests.update)
        .concat(PromiseQuests.insert)
        .concat(PromiseQuests.delete)
      ).catch(err => res.status(500).json({err}))
    //console.log(result);
    res.json({result});
  },
  New: (req, res) => {
    console.log({query: 'Test.New'})
    let collumns = ['idCategory', 'Title', 'Info', 'InfoFull']
      .reduce( (result, collumn) => {result[collumn] = req.body[collumn]; return result}, {} )
    
    connection.query(`INSERT INTO testings SET ?`, collumns, function(err, rows, fields) {
      if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err }); 
      return res.json({result: true});
    })

  }
}