import React from "react";
import TextForm from './TextForm';
import 'react-dropdown-now/style.css';

// https://blog.logrocket.com/using-material-ui-with-react-hook-form/

const LoggedInMenu = () => {
    return (
        <div className="App">
            <header className="App-header">
                <TextForm />
            </header>
        </div>
    );
};

export default LoggedInMenu;