import React, { useState } from "react";
import { Button, Paper } from "@material-ui/core";
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

const Queries = () => {
    const [showResult, setShowResult] = useState(false);
    const [list, setList] = useState([]);

    const handleQuery1 = () => {
        let auxList = new Array();
        fetch("/query1")
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
                })
            })
    }

    const handleQuery2 = () => {
        let auxList = new Array();
        fetch("/query2")
            .then((res) => {
                res.json().then(response => {
                    console.log(response);
                    response.message.rows.forEach(rowsIt => {
                        const obj = {
                            title: rowsIt.nome_categoria,
                            row: rowsIt.valor
                        };
                        auxList.push(obj);
                    });
                    setList(auxList);
                    setShowResult(true);
                })
            })
    }

    const handleQuery3 = () => {
        let auxList = new Array();
        fetch("/query3")
            .then((res) => {
                res.json().then(response => {
                    console.log(response);
                    response.message.rows.forEach(rowsIt => {
                        const obj = {
                            title: rowsIt.descricao,
                            row: rowsIt.quantidadetotal
                        };
                        auxList.push(obj);
                    });
                    setList(auxList);
                    setShowResult(true);
                })
            })
    }

    const handleQuery4 = () => {
        let auxList = new Array();
        fetch("/query4")
            .then((res) => {
                res.json().then(response => {
                    console.log(response);
                    response.message.rows.forEach(rowsIt => {
                        const obj = {
                            title: rowsIt.descricao,
                            row: rowsIt.quantidadetotal
                        };
                        auxList.push(obj);
                    });
                    setList(auxList);
                    setShowResult(true);
                })
            })
    }

    const handleQuery5 = () => {    // TO DO
        let auxList = new Array();
        fetch("/query5")
            .then((res) => {
                res.json().then(response => {
                    // console.log(response);
                    // response.message.rows.forEach(rowsIt => {
                    //     const obj = {
                    //         title: rowsIt.descricao,
                    //         row: rowsIt.quantidadetotal
                    //     };
                    //     auxList.push(obj);
                    // });
                    // setList(auxList);
                    // setShowResult(true);
                })
            })
    }

    return (
        <div>
            <h2>Selecione a pesquisa desejada:</h2>

            <Paper>
                <Button onClick={handleQuery1}>1</Button>
                <Button onClick={handleQuery2}>2</Button>
                <Button onClick={handleQuery3}>3</Button>
                <Button onClick={handleQuery4}>4</Button>
                <Button onClick={handleQuery5}>5</Button>
            </Paper>

            <h3>
                {showResult ?
                    <SimpleTableComponent columns={columns} list={list} />
                    :
                    null
                }
            </h3>
        </div>
    );
};

export default Queries;