// server/index.js

const path = require('path');
const express = require("express");
const oracledb = require('oracledb');

const PORT = process.env.PORT || 3001;

const app = express();

function selectFromDB(){
    var Connection = require('tedious').Connection;  
    var config = {  
        server: 'ECLBDIT101@//adb.sa-saopaulo-1.oraclecloud.com:1522/f55grwkwpyhckzx_bdengcomp_high.adb.oraclecloud.com',
        authentication: {
            type: 'default',
            options: {
                userName: 'ECLBDIT101',
                password: 'Teste12345678910'
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: 'ECLBDIT101'
        }
    }; 
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.  
        console.log("Connected");  
        executeStatement();  
    });  
    
    connection.connect();
  
    var Request = require('tedious').Request;  
    var TYPES = require('tedious').TYPES;  
  
    function executeStatement() {  
        let request = new Request("SELECT * from FUNCIONARIO;", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        var result = "";  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                result+= column.value + " ";  
              }  
            });  
            console.log(result);  
            result ="";  
        });  
  
        request.on('done', function(rowCount, more) {  
        console.log(rowCount + ' rows returned');  
        });  
        
        // Close the connection after the final event emitted by the request, after the callback passes
        request.on("requestCompleted", function (rowCount, more) {
            connection.close();
        });
        connection.execSql(request);  
    }

    return 'ta show não pai';
}

function connectToSQL(){
    let errorConnecting = false;

    var Connection = require('tedious').Connection;  
      var config = {  
          server: 'ECLBDIT101@//adb.sa-saopaulo-1.oraclecloud.com:1522/f55grwkwpyhckzx_bdengcomp_high.adb.oraclecloud.com',  //update me
          authentication: {
              type: 'default',
              options: {
                  userName: 'ECLBDIT101',
                  password: 'Teste12345678910'
              }
          },
          options: {
              // If you are on Microsoft Azure, you need encryption:
              encrypt: true,
              database: 'ECLBDIT101'
          }
      };  
      var connection = new Connection(config); 

      connection.on('connect', function(err) {  
          // If no error, then good to proceed.  
          errorConnecting = true;
      });
      
      connection.connect();

      if(errorConnecting)
        return false;
      else
        return connection;
}

async function newConnection(){
    

    var connection = await oracledb.getConnection({
        user : 'ECLBDIT101',
        password : 'Teste12345678910',
        connectString : 'ECLBDIT101@//adb.sa-saopaulo-1.oraclecloud.com:1522/f55grwkwpyhckzx_bdengcomp_high.adb.oraclecloud.com'
    });

    
    await connection.connect();
    var result = await connection.query("SELECT * From funcionario");
    console.log(result);
}

app.get("/api", (req, res) => {
    newConnection();
    res.json({ message: 'deu ruim' });
  });

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});