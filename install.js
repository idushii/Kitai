var type = process.argv[2];
var level = process.argv[3];

let mysql = require('mysql');
let fs = require('fs');

let mysqlCofig = {
  host     : 'localhost',
  user     : 'root',
  password : 'Pass123_',
  database: 'j693917_sayana',
  multipleStatements: true
}

var sql = ''
if (type == undefined) {
  sql = fs.readFileSync('export.sql', 'utf8');
  var connection = mysql.createConnection(mysqlCofig);
  connection.connect();
  
  let PromiseDelete = new Promise( function(resolve, reject) {
    return connection.query('DROP DATABASE IF EXISTS `j693917_sayana`', err => {
      if (err) return reject({message: 'Ошибка удаления БД', info: err})
      return resolve({message: 'Успешное удаление БД'})
    })
  }).catch(console.warn)
  
  let PromiseCreate = new Promise( function(resolve, reject) {
    return connection.query(sql, function(err, rows, fields) {
      if (err) return reject({message: 'Ошибка создания БД.', info: err})
      return resolve({message: 'БД подготовлена'})
    });
  }).catch(console.warn)
  
  PromiseDelete.then(console.log)
    .then(PromiseCreate.then(console.log))
  
  connection.end()}
else if(type == 'words') {
  if (level == 1) sql = fs.readFileSync('words-level-1.sql', 'utf8');
  if (level == 2) sql = fs.readFileSync('words-level-2.sql', 'utf8');
  if (level == 3) sql = fs.readFileSync('words-level-3.sql', 'utf8');
  if (level == 4) sql = fs.readFileSync('words-level-4.sql', 'utf8');
  if (level == 5) sql = fs.readFileSync('words-level-5.sql', 'utf8');
  if (level == 6) sql = fs.readFileSync('words-level-6.sql', 'utf8');

  var connection = mysql.createConnection(mysqlCofig);
  connection.connect();
  
  let PromiseInsertWords = new Promise( function(resolve, reject) {
    return connection.query(sql, function(err, rows, fields) {
      if (err) return reject({message: 'Ошибка обновления БД.', info: err})
      return resolve({message: 'БД обновлена'})
    });
  }).catch(console.warn)
  
  PromiseInsertWords.then(console.log)
  
  connection.end()
}

