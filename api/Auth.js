import connection from './connection'

export default {
  Login: (req, res) => {
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
  },
  LogOut: (req, res) => { delete req.session.authUser; res.json({ ok: true }) },
  TestMySQL: (req, res) => { connection.connect(); res.json({ ok: true }); connection.end(); },
}