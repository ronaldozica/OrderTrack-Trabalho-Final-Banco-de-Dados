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
  console.log(retorno);
  return retorno;
}

async function connectToPG() {
  if (!isConnected) {
    isConnected = true;
    console.log('connect');
    await pgClient.connect();
  }
}

app.get("/query", (req, res) => {
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