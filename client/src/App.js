// client/src/App.js

import React from 'react';
import './App.css';
import MyContext from './contexts/myContext'
import MainScreen from './MainScreen/MainScreen';
import LoginMenu from './LoginMenu/LoginMenu';
import LoggedInMenu from './LoggedInMenu/LoggedInMenu';

function App() {
  const [data, setData] = React.useState("");
  const [showLoginMenu, setShowLoginMenu] = React.useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = React.useState(false);
  const [func, setFunc] = React.useState("");

  if(!data){
    fetch("/api")
        .then((res) => res.json())
        .then((data) => setData(data.message));
  }

  return (
    <MyContext.Provider value={{ showLoginMenu, setShowLoginMenu, isLoggedIn, setIsLoggedIn, func, setFunc }}>
      {
        isLoggedIn ?
          <LoggedInMenu/>
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