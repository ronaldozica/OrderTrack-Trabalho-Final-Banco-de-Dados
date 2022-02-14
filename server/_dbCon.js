const oracledb = require('oracledb');

connection = await oracledb.getConnection({
    user : 'ECLBDIT101',
    password : 'Teste12345678910',
    connectString : 'ECLBDIT101@//adb.sa-saopaulo-1.oraclecloud.com:1522/f55grwkwpyhckzx_bdengcomp_high.adb.oraclecloud.com'
});

module.exports = connection;