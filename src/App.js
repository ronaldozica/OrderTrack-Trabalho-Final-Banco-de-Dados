import React from 'react';
import styled from 'styled-components';
import logo from './logo.jpg';
import './App.css';

function connectToSQL(){
    // https://docs.microsoft.com/pt-br/sql/connect/node-js/step-3-proof-of-concept-connecting-to-sql-using-node-js?view=sql-server-ver15
    console.log('teste');
}

function App() {
  const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
        <p>
          Sistema raptor lanches.
        </p>
        <Button
          onClick = {connectToSQL}
        >
          Conectar ao banco de dados
        </Button>
      </header>
    </div>
  );
}

export default App;
