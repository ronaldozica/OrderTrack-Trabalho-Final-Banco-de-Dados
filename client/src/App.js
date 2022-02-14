// client/src/App.js

import React from 'react';
import './App.css';
import MyContext from './contexts/myContext'
import MainScreen from './MainScreen/MainScreen';
import LoginMenu from './LoginMenu/LoginMenu';
import LoggedInMenu from './LoggedInMenu/LoggedInMenu';
import ShowQueries from './ShowQueries/ShowQueries';
import { Button } from "@material-ui/core";

function App() {
  const [data, setData] = React.useState("");
  const [showLoginMenu, setShowLoginMenu] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [func, setFunc] = React.useState("");
  const [showQueries, setShowQueries] = React.useState(false);

  if (!data) {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }

  const handleBack = () => {
    if (showLoginMenu){
      setShowLoginMenu(false);
    } else if (isLoggedIn || func){
      setShowLoginMenu(true);
      setIsLoggedIn(false);
      setFunc(false);
    }

    setShowQueries(false);
  };

  const handleQueries = () => {
    if (showLoginMenu){
      setShowLoginMenu(false);
    } else if (isLoggedIn || func){
      setShowLoginMenu(true);
      setIsLoggedIn(false);
      setFunc(false);
    }

    setShowQueries(true);
  };

  return (
    <MyContext.Provider value={{ showLoginMenu, setShowLoginMenu, isLoggedIn, setIsLoggedIn, func, setFunc }}>
      <Button onClick={handleBack}
        style={{
          backgroundColor: 'black',
          color: 'white',
          cursor: 'pointer'
        }}>
        voltar
      </Button>
      <Button onClick={handleQueries}
        style={{
          backgroundColor: 'black',
          color: 'white',
          cursor: 'pointer'
        }}>
        realizar buscas no banco de dados
      </Button>
      {
        showQueries ?
            <ShowQueries />
          :
          isLoggedIn ?
            <LoggedInMenu />
            :
            showLoginMenu ?
              <LoginMenu />
              :
              <MainScreen />
      }
    </MyContext.Provider>
  );
}

export default App;