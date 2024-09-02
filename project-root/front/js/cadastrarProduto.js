async function SalvarInformacoes(event){
    event.preventDefault()

    const nome = document.getElementById("nome_produto").value
    const descriçãoProduto = document.getElementById("produtoDescricao").value 
    const valor = document.getElementById("produtoPreco").value
    const tags = document.getElementById("produtoTags").value
    const avaliaçãoProduto = document.getElementById("AvaliacaodoProduto").value
    const imagem = document.getElementById("produtoImagem").value

    const data = {
        nome,
        descriçãoProduto,
        valor,
        tags,
        avaliaçãoProduto,
        imagem
    }

   const response = await fetch('http://localhost:3001/product/cadastrar', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })

    const result = await response.json()
    console.log(result)
}
