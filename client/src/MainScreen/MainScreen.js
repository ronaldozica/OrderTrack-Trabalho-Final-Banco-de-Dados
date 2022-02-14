import React from 'react';
import logo from '../logo.jpg';
import '../App.css';
import MyContext from '../contexts/myContext'
import { useContext } from 'react';

const MainScreen = () => {
  const { setShowLoginMenu } = useContext(MyContext);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
        <p>
          Sistema raptor lanches.
        </p>
        <button
          onClick={() => setShowLoginMenu(true)}
          style={{
            backgroundColor: 'black',
            color: 'white',
            fontSize: '20px',
            padding: '10px 60px',
            borderRadius: '5px',
            margin: '10px 0px',
            cursor: 'pointer'
          }}
        >
          Conectar ao banco de dados
        </button>
      </header>
    </div>
  );
}

export default MainScreen;