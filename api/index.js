import express from 'express'
import mysql from 'mysql'

// Create express router
const router = express.Router()

let mysqlCofig = {
  host     : 'mysql.j693917.myjino.ru',
  user     : 'j693917',
  password : '7654321',
  database: 'j693917_sayana'
}

mysqlCofig = {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database: 'j693917_sayana'
}

var connection = mysql.createConnection(mysqlCofig);
connection.connect();

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
var app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// Add POST - /api/login
router.post('/login', (req, res) => {
  //var connection = mysql.createConnection(mysqlCofig);
  //connection.connect();

  connection.query(`SELECT * FROM users WHERE Login = "${req.body.username}"`, function(err, rows, fields) {
    if (err) return res.status(401).json({ message: 'Ошибка запроса' }); 
    if (rows.length == 0) return res.status(401).json({ message: 'Такой пользователь не зарегистрирован' });
    if (rows[0].Pass != req.body.password) return res.status(401).json({ message: 'Пароль не верен' });
    req.session.authUser = { username: req.body.username }
    return res.json({ username: req.body.username })
  });

  //connection.end();

  /*if (req.body.username === 'demo' && req.body.password === 'demo') {
    req.session.authUser = { username: 'demo' }
    return res.json({ username: 'demo' })
  }
  res.status(401).json({ message: 'Bad credentials' })*/
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})

router.post('/mysql', (req, res) => {
  connection.connect();
  res.json({ ok: true })
  connection.end();
})

router.get('/pages', (req, res) => {
  console.log({query: '/pages'})
  connection.query(`SELECT * FROM Pages`, function(err, rows, fields) {
    if (err) return res.status(401).json({ message: 'Ошибка запроса', info: err }); 
    return res.json(rows)
  });
})

router.get('/page/:Path', (req, res) => {
  //var connection = mysql.createConnection(mysqlCofig);
  //connection.connect();
  connection.query(`SELECT * FROM Pages WHERE Path='${req.params.Path}'`, function(err, rows, fields) {
    if (err) return res.status(401).json({ message: 'Ошибка запроса', info: err }); 
    return res.json(rows.length == 1 ? rows.pop() : rows);
  });
})

router.get('/categoris', (req, res) => {
  console.log({query: '/categoris'})
  SELECT('categoris')
    .then( ({rows}, err) => {
      if (err) return res.status(401).json({ message: 'Ошибка запроса', info: err })
      return res.json(rows.length == 1 ? rows.pop() : rows)
     })
     .catch(err => res.status(401).json({ message: 'Ошибка запроса', info: err }))
})

router.get('/TestList', (req, res) => {
  console.log({query: '/TestList'})
  //return res.json({rows: []})
  return SELECT('testings')
    .then( ({rows}, err) => {
      if (err) return res.status(401).json({ message: 'Ошибка запроса', info: err })
      return res.json(rows)
     })
     .catch(err => res.status(401).json({ message: 'Ошибка запроса', info: err }))
})

router.get('/Test/:id', (req, res) => {
  console.log({query: '/Test/:id'})
  SELECT('testings', `WHERE id="${req.params.id}"`)
    .then( ({rows}, err) => {
      if (err) return res.status(401).json({ message: 'Ошибка запроса', info: err })
      return res.json(rows)
     })
     .catch(err => res.status(401).json({ message: 'Ошибка запроса', info: err }))

})

router.get('/Test/:id/Items', (req, res) => {
  console.log({query: '/Test/:id/Items'})
  SELECT('testings_item', `WHERE idTest="${req.params.id}"`)
    .then( ({rows}, err) => {
      if (err) return res.status(401).json({ message: 'Ошибка запроса', info: err })
      return res.json(rows)
     })
     .catch(err => res.status(401).json({ message: 'Ошибка запроса', info: err }))

})

router.post('/save/page/:Path', (req, res) => {
  //var connection = mysql.createConnection(mysqlCofig);
  //connection.connect();
  connection.query(`UPDATE Pages SET Title = '${req.body.Title}', Text = '${req.body.Text}', ShowItem = '${req.body.ShowItem}' WHERE Path='${req.params.Path}'`, function(err, rows, fields) {
    if (err) return res.status(401).json({ message: 'Ошибка запроса', info: err }); 
    return res.json({result: true});
  });
})

router.post('/Save/TestItem/', (req, res) => {
  let collumns = ['OrderItem', 'Quest', 'Info', 'Variant_1', 'Variant_2', 'Variant_3', 'Variant_4', 'NumberTrue']
    .reduce( (result, collumn) => {result[collumn] = req.body[collumn]; return result}, {} )

  connection.query(`UPDATE testings_item SET ? WHERE id='${req.body.id}'`, collumns, function(err, rows, fields) {
    if (err) return res.status(401).json({ message: 'Ошибка запроса', info: err }); 
    return res.json({result: true});
  });//*/
})

router.post('/Save/TestInfo/', (req, res) => {
  let collumns = ['idCategory', 'Title', 'Info', 'InfoFull']
    .reduce( (result, collumn) => {result[collumn] = req.body[collumn]; return result}, {} )

  connection.query(`UPDATE testings SET ? WHERE id='${req.body.id}'`, collumns, function(err, rows, fields) {
    if (err) return res.status(401).json({ message: 'Ошибка запроса', info: err }); 
    return res.json({result: true});
  });//*/
})

router.post('/Save/Test/', async (req, res) => {
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
        let collumns = ['idTest', 'OrderItem', 'Quest', 'Info', 'Variant_1', 'Variant_2', 'Variant_3', 'Variant_4', 'NumberTrue']
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
})

// Export the server middleware
export default {
  path: '/api',
  handler: router
}


function SELECT(TABLE = 'pages', WHERE = '') {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${TABLE} ${WHERE}`, function(err, rows, fields) {
      //console.log({err, rows})
      if (err) reject(err)
      resolve({err, rows, fields})
      /*if (err) return res.status(401).json({ message: 'Ошибка запроса', info: err }); 
      return res.json(rows.length == 1 ? rows.pop() : rows);//*/
    });
  })
}