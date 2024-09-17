Aqui está um **README** completo para o seu projeto de Banco de Dados. Ele foi estruturado para fornecer uma visão geral do projeto e suas funcionalidades.

---

# Sistema de Gerenciamento de Pedidos de Restaurante

Este é um sistema de gerenciamento de pedidos desenvolvido para a disciplina de **Banco de Dados** no primeiro semestre de 2022. O projeto foi desenvolvido utilizando **React** no front-end e **Node.js** com **PostgreSQL** no back-end. O sistema permite a criação de pedidos, visualização de produtos, categorias e consultas a dados específicos armazenados no banco de dados.

## Índice

- [Descrição](#descrição)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Funcionalidades](#funcionalidades)
- [Consultas SQL](#consultas-sql)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Descrição

O sistema foi desenvolvido para gerenciar pedidos de um restaurante. Ele permite que o atendente selecione produtos a partir de um menu, adicione itens a pedidos, envie os pedidos para o banco de dados e visualize informações como as quantidades e valores dos itens. O projeto também suporta a execução de consultas predefinidas, mostrando dados como a quantidade total de produtos vendidos ou os pedidos feitos por categoria.

## Tecnologias Utilizadas

### Front-end
- **React.js**
- **Material-UI** para interface de usuário
- **React Hook Form** para manipulação de formulários
- **reactjs-simple-table** para visualização de tabelas

### Back-end
- **Node.js**
- **Express.js** para criação da API
- **PostgreSQL** como banco de dados principal
- **Oracle DB** (parcialmente integrado)

### Bibliotecas adicionais
- **Body-Parser** para tratamento de requisições HTTP
- **pg** (node-postgres) para integração com o PostgreSQL

## Instalação

Para rodar o projeto localmente, siga os passos abaixo:

### Requisitos:
- **Node.js** instalado
- **PostgreSQL** instalado e rodando
- **npm** ou **yarn**

### Passos

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências do projeto:

   ```bash
   npm install
   ```

3. Configure o banco de dados PostgreSQL:

   - Certifique-se de que o PostgreSQL esteja rodando localmente na porta `5432`.
   - As credenciais padrão de banco de dados utilizadas no projeto são:
     - **Usuário:** `postgres`
     - **Senha:** `test`
   - Você pode alterar essas configurações no arquivo `server/index.js` se necessário.

4. Execute a aplicação:

   ```bash
   npm run start
   ```

   O servidor estará disponível em `http://localhost:3001`.

## Como Usar

### Front-End (Cliente)
- Acesse a aplicação via navegador (`http://localhost:3001`) após iniciar o servidor.
- O sistema exibirá a tela de inserção de pedidos, onde é possível selecionar itens, inserir a quantidade e enviar os pedidos para o banco de dados.

### Back-End (Servidor)
- As APIs estão disponíveis para gerenciar dados de pedidos, produtos e consultas. Algumas rotas relevantes:
  - `POST /createOrder`: Envia um pedido para o banco de dados.
  - `GET /produtos`: Retorna todos os produtos disponíveis no cardápio.
  - `GET /fetchOrders`: Retorna os pedidos realizados.
  - `GET /query1`, `GET /query2`, `GET /query3`, etc.: Executa consultas SQL predefinidas.

## Funcionalidades

- **Adicionar pedidos:** O usuário pode adicionar um ou mais itens a um pedido, especificando a quantidade.
- **Consultar pedidos:** Exibe os pedidos já cadastrados, mostrando detalhes como a descrição do item e a quantidade.
- **Resetar pedidos:** Limpa os itens selecionados antes de enviar o pedido.
- **Consultar produtos e categorias:** As APIs do servidor permitem visualizar os produtos do cardápio, organizados por categorias como "Bebidas" e "Salgados".
- **Consultas predefinidas:** São disponibilizadas consultas SQL prontas, como:
  - Pedidos por produto.
  - Pedidos por categoria.
  - Total de produtos vendidos.

## Consultas SQL

As consultas são executadas a partir das seguintes rotas no servidor:

1. **Consulta 1** (`GET /query1`): Retorna a descrição e quantidade dos produtos vendidos.
2. **Consulta 2** (`GET /query2`): Retorna todos os produtos com suas respectivas categorias.
3. **Consulta 3** (`GET /query3`): Retorna a descrição dos produtos e o total de quantidades vendidas de cada produto.
4. **Consulta 4** (`GET /query4`): Retorna produtos cujas quantidades vendidas ultrapassam um determinado valor.
5. **Consulta 5** (`GET /query5`): Rota reservada para uma nova consulta a ser implementada.

## Contribuição

Contribuições são bem-vindas! Se você encontrar problemas ou tiver sugestões para melhorias, sinta-se à vontade para abrir uma _issue_ ou enviar um _pull request_.

1. Faça um _fork_ do projeto
2. Crie sua _feature branch_ (`git checkout -b feature/nova-funcionalidade`)
3. Faça o _commit_ de suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça o _push_ para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um _pull request_

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Se precisar de mais detalhes ou ajustes no **README**, me avise!
