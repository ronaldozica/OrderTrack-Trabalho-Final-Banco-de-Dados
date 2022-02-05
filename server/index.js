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

async function connectToPG() {
  if (!isConnected){
    isConnected = true;
    console.log('connect');
    await pgClient.connect();
  }

  const retorno = await pgClient.query('SELECT * FROM FUNCIONARIO');
  console.log(retorno);
}

app.get("/api", (req, res) => {
  connectToPG();
  res.json({ message: 'deu bom' });
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