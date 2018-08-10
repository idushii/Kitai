import mysql from 'mysql'

let mysqlCofig = {
  host     : 'localhost',
  user     : 'root',
  password : 'Pass123_',
  database: 'j693917_sayana'
}

var connection = mysql.createConnection(mysqlCofig);
connection.connect();

export default connection;