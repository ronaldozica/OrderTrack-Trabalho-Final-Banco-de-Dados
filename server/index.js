// server/index.js

const path = require('path');
const express = require("express");
var bodyParser = require('body-parser')
const pg = require('pg');
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

const pgClient = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'test',
  port: '5432'
});

let isConnected = false;
let hasAdded = false;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

async function individualOrders(func, it) {
  const itemId = Math.round(Math.random() * 1000000);

  console.log('insert into item values (1, ' + it.id + ', ' + itemId + ');');
  console.log('insert into pedido values (5, 2, 1234567866, \'' + func + '\', ' + itemId + ');');

  await pgClient.query('insert into item values (1, ' + it.id + ', ' + itemId + ');');
  const retorno = await pgClient.query('insert into pedido values (5, 2, 1234567866, \'' + func + '\', ' + itemId + ');');
  return retorno;
}

async function insertOrder(func, items) {
  retorno = "";
  items.forEach(it => {
    retorno.concat(individualOrders(func, it));
  });
  //console.log(retorno);
  return retorno;
}

async function simpleQuery() {
  const retorno = await pgClient.query('SELECT * FROM FUNCIONARIO');
  //console.log(retorno);
  return retorno;
}

async function query(number) {
  let retorno;

  if (!hasAdded) {
    await pgClient.query('insert into item values (3, 11, 3);');
    await pgClient.query('insert into item values (4, 10, 4);');
    await pgClient.query('insert into item values (2, 13, 15);');
    await pgClient.query('insert into item values (1, 13, 6);');

    hasAdded = true;
  }

  switch (number) {
    case 1:
      retorno = await pgClient.query('select P.Descricao, I.Quantidade from Produto P join Item I on P.id_Produto=I.ID_PRODUTO;');
      break;
    case 2:
      retorno = await pgClient.query('select * from categoria c left join produto p on p.id_categoria=c.id_categoria;');
      break;
    case 3:
      retorno = await pgClient.query('select P.Descricao,sum(I.Quantidade) as QuantidadeTotal from Produto P join Item I on P.id_Produto=I.ID_PRODUTO GROUP BY P.Descricao;');
      break;
    case 4:
      retorno = await pgClient.query('select P.Descricao,sum(I.Quantidade) as QuantidadeTotal from Produto P join Item I on P.id_Produto=I.ID_PRODUTO GROUP BY P.Descricao HAVING sum(I.Quantidade)>3;');
      break;
    case 5:
      retorno = await pgClient.query('');
      break;
    default:
      retorno = await pgClient.query('SELECT * FROM FUNCIONARIO');
      break;
  }

  return retorno;
}

async function getBebidas() {
  let bebida = "Bebida"
  let query = "SELECT * FROM PRODUTO P JOIN CATEGORIA C ON P.id_categoria=C.id_categoria WHERE C.nome_categoria='" + bebida + "'";
  const retorno = await pgClient.query(query);
  //console.log(retorno);
  return retorno;
}

async function getSalgados() {
  let salgado = "Salgado"
  let query = "SELECT * FROM PRODUTO P JOIN CATEGORIA C ON P.id_categoria=C.id_categoria WHERE C.nome_categoria='" + salgado + "'";
  const retorno = await pgClient.query(query);
  //console.log(retorno);
  return retorno;
}

async function getProdutos() {
  let query = "SELECT * FROM PRODUTO P JOIN CATEGORIA C ON P.id_categoria=C.id_categoria";
  const retorno = await pgClient.query(query);
  //console.log(retorno);
  return retorno;
}

async function populateDB(data) {
  return await pgClient.query(data);
}

async function connectToPG() {
  if (!isConnected) {
    isConnected = true;
    console.log('connect');
    await pgClient.connect();
  }

  fs.readFile('./pg.sql', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    // console.log(data)
    return populateDB(data);
  });
}

app.get("/produtos", (req, res) => {
  let funcs;
  connectToPG();
  getProdutos().then(result => {
    funcs = result
    res.json({
      message: (funcs)
    });
  });
});

app.get("/bebidas", (req, res) => {
  let funcs;
  connectToPG();
  getBebidas().then(result => {
    funcs = result
    res.json({
      message: (funcs)
    });
  });
});

app.get("/salgados", (req, res) => {
  let funcs;
  connectToPG();
  getSalgados().then(result => {
    funcs = result
    res.json({
      message: (funcs)
    });
  });
});

app.get("/funcionarios", (req, res) => {
  let funcs;
  connectToPG();
  simpleQuery().then(result => {
    funcs = result
    res.json({
      message: (funcs)
    });
  });
});

app.get("/query1", (req, res) => {
  let funcs;
  connectToPG();
  query(1).then(result => {
    funcs = result
    res.json({
      message: (funcs)
    });
  });
});

app.get("/query2", (req, res) => {
  let funcs;
  connectToPG();
  query(2).then(result => {
    funcs = result
    res.json({
      message: (funcs)
    });
  });
});

app.get("/query3", (req, res) => {
  let funcs;
  connectToPG();
  query(3).then(result => {
    funcs = result
    res.json({
      message: (funcs)
    });
  });
});

app.get("/query4", (req, res) => {
  let funcs;
  connectToPG();
  query(4).then(result => {
    funcs = result
    res.json({
      message: (funcs)
    });
  });
});

app.get("/query5", (req, res) => {
  let funcs;
  connectToPG();
  query(5).then(result => {
    funcs = result
    res.json({
      message: (funcs)
    });
  });
});

app.get("/api", (req, res) => {
  let funcs;
  connectToPG();
  simpleQuery().then(result => {
    funcs = result
    res.json({
      message: (funcs)
    });
  });
});

app.get("/readFile", (req, res) => {
  fs.readFile('./pg.sql', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(data)
  });
});

app.post('/createOrder', function (req, res) {
  var func = req.body.func;
  var items = req.body.items;
  console.log(func, items);

  insertOrder(func, items).then(result => {
    returnedValueFromDB = result
    res.json({
      message: (returnedValueFromDB)
    });
  });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  let funcs;
  connectToPG();
  simpleQuery().then(result => {
    funcs = result
    res.json({
      message: (funcs)
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});