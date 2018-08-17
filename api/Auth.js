import connection from './connection'

export default {
  Login: (req, res) => {
    connection.query(`SELECT * FROM users WHERE Login = "${req.body.username}"`, function(err, rows, fields) {
      if (err) return res.status(401).json({ message: 'Ошибка запроса' }); 
      if (rows.length == 0) return res.status(401).json({ message: 'Такой пользователь не зарегистрирован' });
      if (rows[0].Pass != req.body.password) return res.status(401).json({ message: 'Пароль не верен' });
      req.session.authUser = { username: req.body.username }
      return res.json({ id: rows[0].id, Login: rows[0].Login, FIO: rows[0].FIO, Email: rows[0].Email,  })
    });
  },
  LogOut: (req, res) => { delete req.session.authUser; res.json({ ok: true }) },
  TestMySQL: (req, res) => { connection.connect(); res.json({ ok: true }); connection.end(); },
  Reg: async (req, res) => {
    console.log({query: 'Auth.Reg'})
    connection.query(`SELECT * FROM users WHERE Login = '${req.body.Login}' or Email = '${req.body.Email}'`, function(err, rows, fields) {
      if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err });
      if (rows.length) return res.status(500).json({message: 'Такие login или email уже используются на сайте'})

      let collumns = ['Login', 'Pass', 'FIO', 'Email']
        .reduce( (result, collumn) => {result[collumn] = req.body[collumn]; return result}, {} )
      
      connection.query(`INSERT INTO users SET ?`, collumns, function(err, rows, fields) {
        if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err }); 
        return LAST_INSERT_ID().then( id => res.json({result: true, id}))
      })
    })
  },
  UpdateProfile: (req, res) => {
    console.log({query: 'Auth.UpdateProfile'})
    let collumns = ['Login', 'FIO', 'Email'].reduce( (result, collumn) => {result[collumn] = req.body[collumn]; return result}, {} )

    connection.query(`UPDATE users SET ? WHERE id='${req.body.id}'`, collumns, function(err, rows, fields) {
      if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err }); 
      return res.json({result: true});
    });

  }
}

function LAST_INSERT_ID() {
  return new Promise( (rTrue, rFalse) => {
    connection.query(`SELECT LAST_INSERT_ID()`, function(err, rows, fields) {
      if (err) return rFalse({ message: 'Ошибка запроса', info: err });
      return rTrue(rows[0]['LAST_INSERT_ID()'])
    });
  } )
}