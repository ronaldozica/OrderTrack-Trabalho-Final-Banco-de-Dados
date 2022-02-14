import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { Button, Paper } from "@material-ui/core";
import { Dropdown } from 'react-dropdown-now';
import MyContext from '../contexts/myContext';
import { useContext } from 'react';
import SimpleTableComponent from "reactjs-simple-table";

// https://blog.logrocket.com/using-material-ui-with-react-hook-form/

const columns = [
    {
        field: "title",
        headerName: "Name",
    },
    {
        field: "row",
        headerName: "Quantidade/Valor",
    },
];

const TextForm = () => {
    const { func } = useContext(MyContext);

    const [textValue, setTextValue] = useState("");
    const [itemQuantity, setItemQuantity] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);

    const [showResult, setShowResult] = useState(false);
    const [list, setList] = useState([]);

    let iterateItems = itemQuantity;

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
        if ((textValue) && (selectedItems)) {
            setTextValue("");
            setItemQuantity(0);

            createOrder();
            setSelectedItems([]);

            if (showResult) {
                setShowResult(false);
            }
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

    const handleShowOrders = () => {
        if (showResult) {
            setShowResult(!showResult);
        }
        else {
            let auxList = new Array();
            fetch("/fetchOrders")
                .then((res) => {
                    res.json().then(response => {
                        console.log(response);
                        response.message.rows.forEach(rowsIt => {
                            const obj = {
                                title: rowsIt.descricao,
                                row: rowsIt.quantidade
                            };
                            auxList.push(obj);
                        });
                        setList(auxList);
                        setShowResult(true);
                        console.log(auxList);
                    })
                });
        }
    };

    const options = require('./options');

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
                <Button onClick={handleShowOrders}>Consultar pedidos</Button>
            </Paper>

            <div>

                <h3>
                    {showResult ?
                        <div>
                            Pedidos cadastrados:
                        </div>
                        :
                        null
                    }
                    {showResult ?
                        <SimpleTableComponent columns={columns} list={list} />
                        :
                        null
                    }
                </h3>
            </div>
        </div>
    );
};

export default TextForm;