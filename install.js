let mysql = require('mysql');
let fs = require('fs');

let mysqlCofig = {
  host     : 'localhost',
  user     : 'root',
  password : '', //Pass123_
  database: 'j693917_sayana',
  multipleStatements: true
}

var sql = fs.readFileSync('export.sql', 'utf8');

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

connection.end()