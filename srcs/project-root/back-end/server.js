// PASSO1 - IMPORTAR PACOTES PARA A APLICAÇÃO
 
//aqui é a solicitação do pacote express, que será usado para a criação de rotas
const express = require('express');
//aqui é a solicitação do pacote cors, que será usado para a ()
const cors = require('cors');
 
//aqui estou instanciando o pacote express nessa constante "app"
const app = express();
 
//definição da porta que o servidor vai rodar
const port = 3001;
 
app.use(cors());
app.use(express.json());
 
 
//TESTE DE SERIVIDOR
app.listen(port, () => console.log(`Rodando na porta ${port}`));
 
//importar a conexao do banco
const connection = require('../back-end/config/db');
 
//ROTA POST CADASTRO DE USUÁRIOS
app.post('/usuario/cadastrar', (request, response) => {
    let params = Array(
        request.body.nome,
        request.body.email,
        request.body.senha,
        request.body.cpf_usuario,
        request.body.status_permissão
    );
     
        let query = "INSERT INTO Usuario(nome, email, senha, cpf_usuario, status_permissão) VALUES(?,?,?,?,?);";
        connection.query(query, params, (err, result) => {
            if(result){
                response
                    .status(201)
                    .json({
                        succsses: true,
                        message: "sucesso",
                        data: result
                    });
            } else{
                response
                    .status(400)
                    .json({
                        success: false,
                        message: "erro",
                        data: err
                    })
            }
        });
    }
);
 
 
app.get('/usuario/listar', (request, response) => {
    let params = Array(
        request.body.nome,
        request.body.email,
        request.body.senha,
        request.body.cpf_usuario,
        request.body.status_permissão
    );
 
    let query = "SELECT * FROM Usuario";
    connection.query(query, params, (err, result) => {
        if(result){
            response
                .status(201)
                .json({
                    success: true,
                    essage: "sucesso",
                    data: result,
                })
        } else
        response
        .status(400)
        .json({
            success: false,
            message: "erro",
            data: err
        })
    });
});
 
 
app.put('/usuario/editar/:id', (request, response) => {
    let params = Array(      
        request.body.nome,
        request.body.email,
        request.body.senha,
        request.body.cpf_usuario,
        request.body.status_permissão,
        request.params.id
    );
 
   
    let query = `UPDATE Usuario
    SET nome = ?,email = ?,senha = ?,cpf_usuario = ?, status_permissão = ?
    where id_usuario = ?`;
 
 
    connection.query(query, params, (err, result) => {
        if(result){
            response
                .status(201)
                .json({
                    message: "sucesso",
                    success: true,
                    data: result
                })
        } else
        response
        .status(400)
        .json({
            success: false,
            message: "erro",
            data: err
        })
    })
 
})
 
app.delete('/usuario/deletar/:id', (request, response) => {
    let params = Array(      
        request.params.id
    );
 
    let query = `DELETE FROM Usuario WHERE id_usuario = ? `;
 
    connection.query(query, params, (err, result) => {
        if(result){
            response
                .status(201)
                .json({
                    message: "sucesso",
                    success: true,
                    data: result
                })
        } else
        response
        .status(400)
        .json({
            success: false,
            message: "erro",
            data: err
        })
    })
 
})
app.post('/product/cadastrarProduct', (request, response) => {
    let params = Arra(
        request.body.nome,
        request.body.descriçâoProduto,
        request.body.valor,
        request.body.tags,
        request.body.avaliaçãoProduto
    )

    let query = 'INSERT INTO Produto(nome, descriçãoProdut, valor, tags, avaliaçãoProduto) VALUES(?,?,?,?,?)'
    connection.query(query, params, (err, result) => {
        if (result){
            response
            .status(201)
            .json({
                success: true,
                message: "sucesso",
                data: result
            })
        }
    })
})