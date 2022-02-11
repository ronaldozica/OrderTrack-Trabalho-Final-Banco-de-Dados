import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { Button, Paper } from "@material-ui/core";
import badge from './cracha.png';
import specialBadge from './crachaEspecial.png';
import MyContext from '../contexts/myContext';
import { useContext } from 'react';

// https://blog.logrocket.com/using-material-ui-with-react-hook-form/

const TextForm = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(MyContext);
    const { func, setFunc } = useContext(MyContext);

    const [textValue, setTextValue] = useState("");
    const [showHelp, setShowHelp] = useState(false);
    const [showErrorFindingBadge, setShowErrorFindingBadge] = React.useState(false);

    const onTextChange = (e) => setTextValue(e.target.value);
    const handleReset = () => setTextValue("");
    const handleHelp = () => setShowHelp(!showHelp);

    const handleSubmit = () => {
        if(textValue){ 
            if(!func){
                fetch("/query")
                    .then((res) => {
                        res.json().then(response => {
                            console.log(response);
                            response.message.rows.forEach(rowsIt => {
                                if(rowsIt.cracha === textValue){
                                    setFunc((rowsIt.nome).toString());
                                    setIsLoggedIn(true);
                                }
                            })
                        })
                    })
            }

            if(!isLoggedIn){
                setShowErrorFindingBadge(true);
            }
        }
    }

    return (
        <div>
            <h2>Insira o número do seu crachá:</h2>

            <Paper>
                <TextField
                    onChange={onTextChange}
                    value={textValue}
                    label={"Número do crachá"}  // placeholder
                    style={{ display: 'flex' }}
                />

                <Button onClick={handleSubmit}>Enviar</Button>
                <Button onClick={handleReset}>Apagar</Button>
                <Button onClick={handleHelp}>Ajuda</Button>
            </Paper>

            {showHelp ?
                <div>
                    <p>
                        Insira o número do crachá, conforme demonstrado abaixo
                    </p>

                    {Math.round(Math.random() * 100) === 1 ?
                        <img src={specialBadge} alt="badge" style={{ paddingTop: '1px' }} />
                        :
                        <img src={badge} alt="badge" style={{ paddingTop: '1px' }} />
                    }
                </div>
                :
                null
            }

            { showErrorFindingBadge ?
                <h3>Crachá incorreto, favor verificar e inserir novamente.</h3>
                :
                null
            }
        </div>
    );
};

export default TextForm;