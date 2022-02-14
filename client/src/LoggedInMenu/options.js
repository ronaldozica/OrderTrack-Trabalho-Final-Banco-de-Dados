let produtos = [];
let items = [];
let flagProdutos = 0;
if(!flagProdutos){
    let item;
    let categoriaAtual = 0;
    let lastCategoria;
    produtos.push({ id: 'one', value: 'one', label: 'Selecione o item pedido' });
    fetch("/produtos")
        .then((res) => {
            res.json().then(response => {
                response.message.rows.forEach(rowsIt => {
                    if(categoriaAtual != rowsIt.id_categoria){
                        produtos.push({
                            name: lastCategoria,
                            items: items
                        });
                        items = [];
                        categoriaAtual++;
                    }
                    item = { id: rowsIt.id_produto, value: rowsIt.id_produto, label: rowsIt.descricao };
                    items.push(item);
                    lastCategoria=rowsIt.nome_categoria;
                })
            })
        })
        flagProdutos = 1;
}

const optionsFirstItem = produtos;

module.exports = optionsFirstItem;