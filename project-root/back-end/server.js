const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const path = require('path')

const app = express();

const port = 3001;

app.use(cors());
app.use(express.json());

//TESTE DE SERIVIDOR
app.listen(port, () => console.log(`Rodando na porta ${port}`));

//importar a conexao do banco
const connection = require('../back-end/config/db');


// ROTA PARA CRIAR UM USUARIO ADM

app.post('/usuario/cadastrarAdmin', (request, response) => {
    const {nome, email, senha,} = request.body 

    if (!nome || !email || !senha ){
        return response
        .status(400)
        .json({success: false, message: "Preencha todos os campos de cadastro"})
    }

    const queryAdmin = `SELECT * FROM Usuario WHERE status_permissão = 'ADMIN'`
    connection.query(queryAdmin, async (err, result) => {
        if (err){
            response
                .status(500)
                .json({
                    success:false,
                    message: 'Erro ao verificar se existe um admin no sistema'
                })
        }

        // verificar se já existe um admin cadastrado
        if (result.length > 0){
            response.status(403)
            .json({
                success: false,
                message: 'Já existe um administrador no sistema'
            })
            
        } else {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(senha, salt);


            const admin = [nome, email, passwordHash,'******', 'ADMIN']
            const query = `INSERT INTO Usuario(nome, email, senha, cpf_usuario, status_permissão) VALUES(?,?,?,?,?)`
            connection.query(query, admin, (err, result) => {
                if(result){
                        response
                        .status(201)
                        .json({
                                success: true,
                                message: "Administrador cadastrado com sucesso",
                                data: result
                            })
                            
                    } else {
                        response
                            .status(400)
                            .json({
                                success: false,
                                message: "Erro ao cadastrar Administrador",
                                data: err
                            })
                    }
                })
        }
        
    })    
})

app.put('/usuario/atualizarAdmin/:id', (request, response) => {
    const params = Array(
        request.body.nome,
        request.body.email,
        request.body.senha,
        request.params.id,
        request.body.status_permissão
    )

    const query = `UPDATE Usuario
        SET nome = ?, email = ?, senha = ? WHERE id_usuario = ? AND status_permissão = 'ADMIN'
    `
    connection.query(query, params, (err, result) => {
        if (err){
            response 
            .status(400)
            .json({success: false, message: 'Erro ao atualizar as informações', err})
        } else {
            response
            .status(201)
            .json({
                sucess: true,
                message: 'Sucesso ao atualizar as informações.'
            })
        }
    }) 
})
app.delete('/usuario/deletarAdmin/:id', (request, response) => {
    const params = Array(
        request.params.id,
        request.params.status_permissão
    )
    const query = `DELETE FROM Usuario WHERE id_usuario = ? AND status_permissão = ?`
    connection.query(query, params, (err, result) => {
        if (result) {
            response
                .status(201)
                .json({
                    message: "sucesso ao deletar adm",
                    success: true,
                    data: result
                })
        } else
            response
                .status(400)
                .json({
                    success: false,
                    message: "erro ao deletar adm",
                    data: err
                })
    })
})


//ROTA POST CADASTRO DE USUÁRIOS TER ( CREATE, READ, UPDATE AND DELETE)
app.post('/usuario/cadastrar', async (request, response) => {
    const { nome, email, senha, cpf_usuario} = request.body;

    if (!nome || !email || !senha || !cpf_usuario) {
        response.status(400).json({
            success: false,
            message: "Preencha todos os campos de cadastro"
        });
    }

    // Criptografar a senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(senha, salt);

    // Criar os parâmetros para a consulta SQL
    const params = [nome, email, passwordHash, cpf_usuario, 'USER'];

    const query = `INSERT INTO Usuario(nome, email, senha, cpf_usuario, status_permissão) VALUES(?,?,?,?,?);`;
    connection.query(query, params, (err, result) => {
        if (err) {
            return response.status(400).json({
                success: false,
                message: "Erro ao cadastrar o usuário",
                data: err
            });
        } else {
            return response.status(201).json({
                success: true,
                message: "Usuário cadastrado com sucesso",
                data: result
            });
        }
    });
});

app.post('/usuario/login', async (request, response) => {
    const { email, senha } = request.body;

    // Verificar se os campos estão preenchidos
    if (!email || !senha) {
         response.status(400).json({
            success: false,
            message: "Email e senha são obrigatórios"
        });
    }

    // Buscar no banco de dados se existe o email digitado
    const query = 'SELECT * FROM Usuario WHERE email = ?';
    connection.query(query, [email], async (err, result) => {
        if (err) {
            return response.status(500).json({
                success: false,
                message: "Erro ao buscar usuário no banco",
                data: err
            });
        }

        // Verificar se o usuário foi encontrado
        if (result.length === 0) {
            return  response.status(404).json({
                success: false,
                message: "Usuário não encontrado"
            });
        }

        // Pegar o usuário cadastrado se existir
        const user = result[0];

        // Comparar a senha fornecida com a senha armazenada no banco de dados
        const senhaEncontrada = await bcrypt.compare(senha, user.senha);

        if (!senhaEncontrada) {
            return  response.status(401).json({
                success: false,
                message: "Senha incorreta"
            });
        }

        // Gerar um token JWT
        const token = jwt.sign({ id: user.id, role: user.status_permissão }, 'secreta', { expiresIn: '1h' });


        // Retornar o token como resposta
        return  response.json({
            success: true,
            message: "Login realizado com sucesso",
            token: token
        });
        
    });
});

app.get('/usuario/exibir', (request, response) => {
    let query = `SELECT * FROM Usuario`
    connection.query(query, (err, result) => {
        if(result){
            response .status(201).json({
                message: "sucesso",
                success: true,
                data: result
            })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "erro",
                    data: err
                })
        }
    })
})

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
        if (result) {
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
        if (result) {
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

// ROTA PARA READ AS INFORMAÇÕES DOS USUÁRIOS REGISTRADO NO NOSSO BANCO
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
        if (result) {
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

// ROTAS PARA PRODUTO (CREATE, READ, UPDATE AND DELETE)

app.post('/product/cadastrar', (request, response) => {
    let params = Array(
        request.body.nome,
        request.body.descriçãoProduto,
        request.body.valor,
        request.body.tags,
        request.body.imagem,
        request.body.avaliaçãoProduto
    )

    let query = 'INSERT INTO Produto(nome, descriçãoProduto, valor, tags,imagem, avaliaçãoProduto) VALUES(?,?,?,?,?,?)'
    connection.query(query, params, (err, result) => {
        if (result) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "sucesso",
                    data: result
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "erro",
                    data: err
                })
        }
    })
})
app.get('/product/exibir', (request, response) => {
    let params = Array(
        request.body.nome,
        request.body.descriçãoProduto,
        request.body.valor,
        request.body.tags,
        request.body.imagem,
        request.body.avaliaçãoProduto
    )

    let query = 'SELECT * FROM Produto'
    connection.query(query, params, (err, result) => {
        if (result) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "sucesso",
                    data: result
                })
        } else {
            response
                .status(401)
                .json({
                    success: false,
                    message: "erro",
                    data: err
                })
        }
    })
})
app.put('/product/editar/:id', (request, response) => {
    let params = Array(
        request.body.nome,
        request.body.descriçãoProduto,
        request.body.valor,
        request.body.tags,
        request.body.imagem,
        request.body.avaliaçãoProduto,
        request.params.id
    )
    let query = `UPDATE Produto 
    SET nome = ?, descriçãoProduto = ?, valor = ?, tags = ?, imagem = ? ,avaliaçãoProduto = ? WHERE id_produto = ?`
    connection.query(query, params, (err, result) => {
        if (result) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "sucesso",
                    data: result
                })
        } else {
            response
                .status(401)
                .json({
                    success: false,
                    message: "erro",
                    data: err
                })
        }
    })
})
app.delete('/product/deletar/:id', (request, response) => {
    let params = Array(
        request.params.id
    )
    
        let query = 'DELETE FROM Produto WHERE id_produto = ?'
        connection.query(query, params, (err,result) => {
        if(result){
            response
                .status(201)
                .json({
                    success: true,
                    message: "sucesso",
                    data: result
                })
        } else {
            response
                .status(401)
                .json({
                    success: false,
                    message: "erro",
                    data: err
                })
        }
        })
    

    
})

// ROTA PARA TABELA DE FAVORITOS( CREATE, READ,UPDATE AND REMOVE)
app.post('/cadastrar/favoritos', (request, response) => {
    let params = Array(
        request.body.Usuario_Id,
        request.body.Produto_Id
    )
    let query = 'INSERT INTO Favoritos(UsuarioId, ProdutoId) VALUES(?,?)'
    connection.query(query, params, (err, result) => {
        if (result) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "sucesso",
                    data: result
                })
        } else {
            response
                .status(401)
                .json({
                    success: false,
                    message: "erro",
                    data: err
                })
        }
    })
})