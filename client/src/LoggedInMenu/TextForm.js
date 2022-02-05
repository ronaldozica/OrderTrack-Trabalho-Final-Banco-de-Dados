import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { Button, Paper } from "@material-ui/core";
import { Dropdown } from 'react-dropdown-now';

// https://blog.logrocket.com/using-material-ui-with-react-hook-form/

const TextForm = () => {
    const [textValue, setTextValue] = useState("");
    const [itemQuantity, setItemQuantity] = useState(0);

    const onTextChange = (e) => setTextValue(e.target.value);

    const handleSubmit = () => {
        if(textValue){
            setTextValue("");
            setItemQuantity(0);
        }
    }

    const handleReset = () => {
        setTextValue("");
        setItemQuantity(0);
    }

    const handleAddItems = () => setItemQuantity(itemQuantity + 1);

    const handleSelectItem = (value) => {
        if(value.value === 'two')
            setItemQuantity(itemQuantity - 1);
    };

    const options = require('./options');
    const optionsFirstItem = require('./optionsFirstItem');

    let iterateItems = itemQuantity;

    return (
        <div>
            <h2>Insira o número da mesa :</h2>

            <Paper>
                <TextField
                    onChange={onTextChange}
                    value={textValue}
                    label={"Número da mesa"}  // placeholder
                    style={{ display: 'flex' }}
                />

                {
                    [...Array(iterateItems)].map((e, i) =>
                        i === 0 ?
                                <Dropdown
                                    key = {i}
                                    className="my-className"
                                    options={optionsFirstItem}
                                    value="one"
                                    onSelect={(value) => handleSelectItem(value)}
                                    onChange={(value) => console.log('change!', value)}
                                    onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
                                    onOpen={() => console.log('open!')}
                                />
                            :
                                <Dropdown
                                    key = {i}
                                    className="my-className"
                                    options={options}
                                    value="one"
                                    onSelect={(value) => handleSelectItem(value)}
                                    onChange={(value) => console.log('change!', value)}
                                    onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
                                    onOpen={() => console.log('open!')}
                                />
                    )}

                <Button onClick={handleSubmit}>Realizar pedido</Button>
                <Button onClick={handleReset}>Apagar pedido</Button>
                <Button onClick={handleAddItems}>Adicionar item</Button>
            </Paper>
        </div>
    );
};

export default TextForm;