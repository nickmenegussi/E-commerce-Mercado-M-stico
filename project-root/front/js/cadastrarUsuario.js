async function cadastrarUsuario(event){
    event.preventDefault()
    
    const nome = document.getElementById('fullName').value 
    const email = document.getElementById('email').value
    const cpf_usuario = document.getElementById('cpf').value 
    const senha = document.getElementById('password').value

    const data = {
        nome,
        email,
        cpf_usuario,
        senha
    }

    const response = await fetch('http://localhost:3001/usuario/cadastrar', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)

    })

    const result = await response.json()

    if (result.success){
        alert("Cadastrado realizado com sucesso!")
        window.location.href = '../public/login.html'
    } else {
        alert("Erro ao cadastrar")
    }
}