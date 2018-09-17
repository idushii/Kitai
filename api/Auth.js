import connection from './connection'
import axios from 'axios'

let Token = {
  SetTokenVK(req, res, token, email = 'ivan43@mail.ru') {
    console.log({query: 'Token.SetTokenVK', payload: {token, email}})
    connection.query(`UPDATE users SET TokenVK= '${token}' WHERE Email = '${email}'`, function(err, rows, fields) {
      if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err });

      connection.query(`SELECT id, Login, FIO, Email FROM users WHERE Email = '${email}'`, function(err, rows, fields) {
        if (err) return res.status(500).json({ message: 'Ошибка запроса', info: err });
        res.json({message: 'Успешная авторизация', status: 'ok', user: rows[0]})
      })
    });
  },
}

let DataBase = {
  async CreateUser({Login, Email, Pass, FIO}) {
    console.log('User.DataBase.CreateUser', {Login, Email, Pass, FIO})
    return new Promise( (resolve, reject) => {
      let collumns = { Login, Email, Pass, FIO }
      
      connection.query(`INSERT INTO users SET ?`, collumns, function(err, rows, fields) {
        if (err) return reject({err})
        return resolve( LAST_INSERT_ID().then( id => {result: true, id}) )
      })
    })
  },
  async isHasUser({Login, Email}) {
    return new Promise( (resolve, reject) => {
      connection.query(`SELECT id, Login, FIO FROM users WHERE Login = "${Login}" OR Email = "${Email}"`, function(err, rows, fields) {
        if (err) return reject({err})
        if (rows.length == 0) return resolve(false)
        return resolve(rows[0])
      });
  
    } )
  }
}

export default {
  Token, 
  Login: (req, res) => {
    connection.query(`SELECT * FROM users WHERE Login = "${req.body.username}"`, function(err, rows, fields) {
      if (err) return res.status(401).json({ message: 'Ошибка запроса' }); 
      if (rows.length == 0) return res.status(401).json({ message: 'Такой пользователь не зарегистрирован' });
      if (rows[0].Pass != req.body.password) return res.status(401).json({ message: 'Пароль не верен' });
      req.session.authUser = { username: req.body.username }
      return res.json({ id: rows[0].id, Login: rows[0].Login, FIO: rows[0].FIO, Email: rows[0].Email,  })
    });
  },
  LoginVK: async (req, res) => {
    let app_id = 6047893
    //let host = 'http://localhost:8080'
    let host = 'http://ovz1.j693917.1qyn6.vps.myjino.ru'
    let client_secret = 'L9sQgC9lyj1zzVUqohEc'
    let code = req.body.code

    console.log({app_id, host, client_secret, code})

    console.log(`https://oauth.vk.com/access_token?client_id=${app_id}&client_secret=${client_secret}&redirect_uri=http://localhost:8080/auth-vk&code=${code}`)

    let Profile =  await axios.get(`https://oauth.vk.com/access_token?client_id=${app_id}&client_secret=${client_secret}&redirect_uri=${host}/auth-vk&code=${code}`).then(r => r.data);

    let {access_token, email} = Profile

    console.log(Profile)

    if (access_token) {
      console.log({access_token, email})
      let User = await DataBase.isHasUser({Email: email})
      if (User === false) {
        await DataBase.CreateUser( {Email: email, FIO: '', Login: email, Pass: 'sdfgdjdjfgsdjfaksjdf'} )
        Token.SetTokenVK(req, res, access_token, email)
      } else {
        Token.SetTokenVK(req, res, access_token, email)
      }
    } else {
      console.log({message: 'Ошибка авторизации'})
    }
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