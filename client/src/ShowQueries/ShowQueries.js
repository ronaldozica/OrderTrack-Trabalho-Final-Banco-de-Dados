import React from "react";
import Queries from "./Queries";
import 'react-dropdown-now/style.css';

// https://blog.logrocket.com/using-material-ui-with-react-hook-form/

const LoggedInMenu = () => {
    return (
        <div className="App">
            <header className="App-header">
                <Queries />
            </header>
        </div>
    );
};

export default LoggedInMenu;