async function entrarUsuario(event){
    event.preventDefault()

    const email = document.getElementById('email').value
    const senha = document.getElementById('password').value

    const data = {
        email,
        senha
    }
    // trocar rota para a de login
    const response = await fetch('http://localhost:3001/usuario/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const result = await response.json()
    if (result.success){
        console.log(`Login realizado com sucesso!`)
        window.location.href ='../public/Dashboard/index.html'
    } else {
        console.log('Dados não encontrados!Tente novamente')
    }
}

