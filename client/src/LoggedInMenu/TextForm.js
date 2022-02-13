import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { Button, Paper } from "@material-ui/core";
import { Dropdown } from 'react-dropdown-now';
import MyContext from '../contexts/myContext';
import { useContext } from 'react';

// https://blog.logrocket.com/using-material-ui-with-react-hook-form/

const TextForm = () => {
    const { func } = useContext(MyContext);

    const [textValue, setTextValue] = useState("");
    const [itemQuantity, setItemQuantity] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);

    const onTextChange = (e) => setTextValue(e.target.value);

    const createOrder = () => {
        fetch("/createOrder", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                func: func,
                items: selectedItems
            })
        })
            .then((response) => {
                console.log(response);
            });
    }

    const handleSubmit = () => {
        if ( (textValue) && (selectedItems) ) {
            setTextValue("");
            setItemQuantity(0);

            createOrder();
            setSelectedItems([]);
        }
    }

    const handleReset = () => {
        setTextValue("");
        setItemQuantity(0);
    }

    const handleAddItems = () => setItemQuantity(itemQuantity + 1);

    const handleSelectItem = (value) => {
        const arrayAux = selectedItems;
        arrayAux.push(value);
        setSelectedItems(arrayAux);
        console.log('selectedItems: ', selectedItems);
    };

    const options = require('./options');

    let iterateItems = itemQuantity;

    return (
        <div>
            <h1> Olá {func}! </h1>
            <h2> Insira o número da mesa: </h2>

            <Paper>
                <TextField
                    onChange={onTextChange}
                    value={textValue}
                    label={"Número da mesa"}  // placeholder
                    style={{ display: 'flex' }}
                />

                {
                    [...Array(iterateItems)].map((e, i) =>
                        <Dropdown
                            key={i}
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