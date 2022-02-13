// server/index.js

const path = require('path');
const express = require("express");
const pg = require('pg');

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

async function simpleQuery() {
  const retorno = await pgClient.query('SELECT * FROM FUNCIONARIO');
  //console.log(retorno);
  return retorno;
}


async function getBebidas() {
  let bebida = "Bebida"
  let query = "SELECT * FROM PRODUTO P JOIN CATEGORIA C ON P.id_categoria=C.id_categoria WHERE C.nome_categoria='"+bebida+"'";
  const retorno = await pgClient.query(query);
  //console.log(retorno);
  return retorno;
}

async function getSalgados() {
  let salgado = "Salgado"
  let query = "SELECT * FROM PRODUTO P JOIN CATEGORIA C ON P.id_categoria=C.id_categoria WHERE C.nome_categoria='"+salgado+"'";
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


async function connectToPG() {
  if (!isConnected) {
    isConnected = true;
    console.log('connect');
    await pgClient.connect();
  }
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