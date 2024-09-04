# Mercado Místico API

Bem-vindo à API do Mercado Místico! Este é o backend para o sistema de gerenciamento de produtos e usuários em um e-commerce.

## Índice

- [Descrição](#descrição)
- [Instalação](#instalação)
- [Execução](#execução)
- [Rotas da API](#rotas-da-api)
  - [Usuários](#usuários)
  - [Produtos](#produtos)
  - [Carrinho](#carrinho)
  - [Compra](#compra)
  - [Favoritos](#favoritos)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Descrição

Este projeto fornece uma API para gerenciar usuários, produtos, carrinhos de compras e favoritos. A API permite a criação, atualização, exclusão e listagem desses recursos.

## Instalação

Para configurar o ambiente de desenvolvimento, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/nickmenegussi/E-commerce-Mercado-M-stico.git
   cd E-commerce-Mercado-M-stico
Instale as dependências: Certifique-se de ter o Node.js instalado. Em seguida, instale as dependências do projeto com:

 ``` bash
  Copiar código
  npm install

Dependências:

bcryptjs: "^2.4.3"
body-parser: "^1.20.2"
cors: "^2.8.5"
dotenv: "^16.4.5"
express: "^4.19.2"
jsonwebtoken: "^9.0.2"
multer: "^1.4.5-lts.1"
mysql2: "^3.11.0"
nodemon: "^3.1.4"
```
Execução
Para iniciar o servidor, execute o seguinte comando:


```bash
  Copiar código
  npm start
```
Rotas da API
## Usuários


1. Criar Admin
    Método: POST
    Rota: /usuario/cadastrarAdmin
    Descrição: Cria um usuário com permissão de administrador.
    Dados Esperados:
    nome: Nome completo do administrador.
    email: Endereço de e-mail.
    senha: Senha para o administrador.
    Respostas Possíveis:
    201 Created: Admin criado com sucesso.
    400 Bad Request: Campo ausente ou erro.
    403 Forbidden: Já existe um administrador.
    500 Internal Server Error: Erro ao verificar administrador existente.

2. Atualizar Admin
    Método: PUT
    Rota: /usuario/atualizarAdmin/:id
    Descrição: Atualiza um administrador existente.
    Dados Esperados:
    nome: Nome do administrador.
    email: Endereço de e-mail.
    senha: Senha (opcional).
    status_permissão: 'ADMIN'.
    Parâmetros na URL:
    id: ID do administrador.
    Respostas Possíveis:
    201 Created: Atualização bem-sucedida.
    400 Bad Request: Erro na atualização.

3. Deletar Admin
    Método: DELETE
    Rota: /usuario/deletarAdmin/:id
    Descrição: Remove um administrador.
    Parâmetros na URL:
    id: ID do administrador.
    Respostas Possíveis:
    201 Created: Remoção bem-sucedida.
    400 Bad Request: Erro na remoção.
4. Cadastrar Usuário
    Método: POST
    Rota: /usuario/cadastrar
    Descrição: Cria um novo usuário com permissão de 'USER'.
    Dados Esperados:
    nome: Nome completo do usuário.
    email: Endereço de e-mail.
    senha: Senha para o usuário.
    cpf_usuario: CPF do usuário.
    Respostas Possíveis:
    201 Created: Usuário criado com sucesso.
    400 Bad Request: Campo ausente ou erro.
5. Login
    Método: POST
    Rota: /usuario/login
    Descrição: Faz login de um usuário e retorna um token JWT.
    Dados Esperados:
    email: Endereço de e-mail.
    senha: Senha.
    Respostas Possíveis:
    200 OK: Login bem-sucedido, token JWT gerado.
    400 Bad Request: Campo ausente.
    401 Unauthorized: Senha incorreta.
    404 Not Found: E-mail não encontrado.
6. Listar Usuários
    Método: GET
    Rota: /usuario/listar
    Descrição: Retorna todos os usuários.
    Respostas Possíveis:
    200 OK: Lista recuperada com sucesso.
    400 Bad Request: Erro na recuperação.
7. Editar Usuário
    Método: PUT
    Rota: /usuario/editar/:id
    Descrição: Atualiza os detalhes de um usuário.
    Dados Esperados:
    nome: Nome do usuário.
    email: Endereço de e-mail.
    senha: Senha (opcional).
    cpf_usuario: CPF do usuário.
    status_permissão: Permissão 'USER' ou 'ADMIN'.
    Parâmetros na URL:
    id: ID do usuário.
    Respostas Possíveis:
    201 Created: Atualização bem-sucedida.
    400 Bad Request: Erro na atualização.
8. Deletar Usuário
    Método: DELETE
    Rota: /usuario/deletar/:id
    Descrição: Remove um usuário.
    Parâmetros na URL:
    id: ID do usuário.
    Respostas Possíveis:
    201 Created: Remoção bem-sucedida.
    400 Bad Request: Erro na remoção.

## Produtos
1. Cadastrar Produto
    Método: POST
    Rota: /product/cadastrar
    Descrição: Adiciona um novo produto.
    Dados Esperados:
    nome: Nome do produto.
    descricaoProduto: Descrição.
    valor: Preço.
    tags: Tags associadas.
    imagem: URL da imagem.
    avaliacaoProduto: Avaliação.
    Respostas Possíveis:
    201 Created: Produto criado com sucesso.
    400 Bad Request: Dados ausentes ou erro.
2. Exibir Produtos
    Método: GET
    Rota: /product/exibir
    Descrição: Retorna todos os produtos.
    Respostas Possíveis:
    200 OK: Lista de produtos recuperada.
    401 Unauthorized: Erro na recuperação.
3. Editar Produto
    Método: PUT
    Rota: /product/editar/:id
    Descrição: Atualiza os detalhes de um produto.
    Dados Esperados:
    nome: Nome do produto.
    descricaoProduto: Descrição.
    valor: Preço.
    tags: Tags.
    imagem: URL da imagem.
    avaliacaoProduto: Avaliação.
    Parâmetros na URL:
    id: ID do produto.
    Respostas Possíveis:
    201 Created: Atualização bem-sucedida.
    401 Unauthorized: Erro na atualização.
4. Deletar Produto
    Método: DELETE
    Rota: /product/deletar/:id
    Descrição: Remove um produto.
    Parâmetros na URL:
    id: ID do produto.
    Respostas Possíveis:
    201 Created: Produto removido com sucesso.
    401 Unauthorized: Erro na remoção.
    Carrinho
1. Cadastrar Carrinho
    Método: POST
    Rota: /carrinho/cadastrar
    Descrição: Adiciona um item ao carrinho de um usuário.
    Dados Esperados:
    quantidade: Quantidade.
    valor_total: Valor total.
    UsuarioId: ID do usuário.
    ProdutoId: ID do produto.
    Respostas Possíveis:
    201 Created: Item adicionado com sucesso.
    400 Bad Request: Dados ausentes ou erro.
2. Exibir Carrinho
    Método: GET
    Rota: /carrinho/exibir
    Descrição: Retorna todos os itens do carrinho.
    Respostas Possíveis:
    200 OK: Lista de itens recuperada.
    400 Bad Request: Erro na recuperação.
3. Atualizar Carrinho
    Método: PUT
    Rota: /carrinho/atualizar/:id
    Descrição: Atualiza a quantidade ou outros detalhes do item do carrinho.
    Dados Esperados:
    quantidade: Nova quantidade.
    valor_total: Novo valor total.
    Parâmetros na URL:
    id: ID do item do carrinho.
    Respostas Possíveis:
    201 Created: Atualização bem-sucedida.
    400 Bad Request: Erro na atualização.
4. Deletar Carrinho
    Método: DELETE
    Rota: /carrinho/deletar/:id
    Descrição: Remove um item do carrinho.
    Parâmetros na URL:
    id: ID do item do carrinho.
    Respostas Possíveis:
    201 Created: Item removido com sucesso.
    400 Bad Request: Erro na remoção.

## Compra
1. Cadastrar Compra
    Método: POST
    Rota: /compra/cadastrar
    Descrição: Registra uma nova compra.
    Dados Esperados:
    data_compra: Data e hora da compra.
    valor: Valor total.
    CarrinhoId: ID do carrinho associado.
    Respostas Possíveis:
    201 Created: Compra registrada com sucesso.
    400 Bad Request: Dados ausentes ou erro.
2. Exibir Compras
    Método: GET
    Rota: /compra/exibir
    Descrição: Retorna uma lista de todas as compras.
    Respostas Possíveis:
    200 OK: Lista de compras recuperada com sucesso.
    400 Bad Request: Erro na recuperação.
3. Editar Compra
    Método: PUT
    Rota: /compra/editar/:id
    Descrição: Atualiza os detalhes de uma compra existente.
    Dados Esperados:
    data_compra: Nova data e hora.
    valor: Novo valor total.
    Parâmetros na URL:
    id: ID da compra.
    Respostas Possíveis:
    201 Created: Atualização bem-sucedida.
    400 Bad Request: Erro na atualização.
4. Deletar Compra
    Método: DELETE
    Rota: /compra/deletar/:id
    Descrição: Remove uma compra.
    Parâmetros na URL:
    id: ID da compra.
    Respostas Possíveis:
    201 Created: Compra removida com sucesso.
    400 Bad Request: Erro na remoção.

## Favoritos
1. Adicionar Favorito
    Método: POST
    Rota: /favoritos/adicionar
    Descrição: Adiciona um produto à lista de favoritos de um usuário.
    Dados Esperados:
    UsuarioId: ID do usuário.
    ProdutoId: ID do produto.
    Respostas Possíveis:
    201 Created: Favorito adicionado com sucesso.
    400 Bad Request: Dados ausentes ou erro.

