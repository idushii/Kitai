import mysql from 'mysql'

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

export default connection;