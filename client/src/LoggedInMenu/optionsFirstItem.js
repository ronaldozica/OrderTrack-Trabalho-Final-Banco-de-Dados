let salgados = [];
let flagSalgados = 0;
if(!flagSalgados){
    let item;
    fetch("/salgados")
        .then((res) => {
            res.json().then(response => {
                //console.log(response);
                response.message.rows.forEach(rowsIt => {
                    item = { id: rowsIt.id_produto, value: rowsIt.id_produto, label: rowsIt.descricao }
                    salgados.push(item);
                })
            })
        })
    flagSalgados = 1;
}

let bebidas = [];
let flagBebidas = 0;
if(!flagBebidas){
    let item;
    fetch("/bebidas")
        .then((res) => {
            res.json().then(response => {
                //console.log(response);
                response.message.rows.forEach(rowsIt => {
                    item = { id: rowsIt.id_produto, value: rowsIt.id_produto, label: rowsIt.descricao }
                    bebidas.push(item);
                })
            })
        })
    flagBebidas = 1;
}

const optionsFirstItem = [
    { id: 'one', value: 'one', label: 'Selecione o item pedido' },
    {
        name: 'Lanches',
        items: salgados
    },
    {
        name: 'Bebidas',
        items: bebidas
    }
];

module.exports = optionsFirstItem;