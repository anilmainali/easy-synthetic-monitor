var fs = require("fs");
var jp = require('jsonpath');
var mysql = require('mysql');


var contents = fs.readFileSync("./mochawesome-report/mochawesome.json");
var jsonContent = JSON.parse(contents);

var testExecutionTime = jp.query(jsonContent, '$.results[*].suites[*].tests[*].duration').toString();
var testStartTime = jp.query(jsonContent, '$.stats.start').toString().replace('T', ' ').slice(0,-5);
var testEndTime = jp.query(jsonContent, '$.stats.end').toString().replace('T', ' ').slice(0,-5);
var testTitle = jp.query(jsonContent, '$.results[*].suites[*].tests[*].title').toString();
var isSkipped = jp.query(jsonContent, '$.results[*].suites[*].tests[*].skipped').toString();
var isPass = jp.query(jsonContent, '$.results[*].suites[*].tests[*].pass').toString();



// MySQL DataBase

var con = mysql.createConnection({
  host: "10.10.181.52",
  user: "root",
  password: "redhat",
  database: "db_eklavya"
});

var sql = "INSERT INTO tbl_mocha_eklavya_primary(executionTime, status, title, testStart, testEnd, skipped) VALUES ('"+testExecutionTime+"','"+ isPass+"','"+ testTitle+"','"+testStartTime+"','"+testEndTime+"','"+isSkipped+"')";
con.query(sql, function (err, result) {
if (err) throw err;
  console.log(result);
})
con.end();