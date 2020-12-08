var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1111',
  database : 'captureme'
});
 
connection.connect();

id='rapa1130'
connection.query('SELECT detailSrc FROM test_image WHERE id=?',[id], function (error, results) {
  if (error) {
      console.log(error);
  }
  //배열로 row가 전달됨
  console.log(results[0].detailSrc);
});

connection.end();