async function carregarProdutos(){
    const response = await fetch('http://localhost:3001/product/exibir')
    const result = await response.json()

    if (result.success){
        exibirProdutos(result.data)
    } else {
        console.log('erro ao exibir os produtos')
    }
}


function exibirProdutos(produtos){
    const conteudoTabela = document.querySelector('.conteudoTabela')
    
    produtos.forEach(produto => {       
        const linhas_content = document.createElement('tr')
        linhas_content.innerHTML = `
                    <td class="">${produto.id_produto}</td>
                    <td class="ProductTitle">${produto.nome}</td>
                    <td class="ProductTags">${produto.tags}</td>
                    <td class="ProductPrice">${produto.valor}</td>
                    <td class="ProductFeeback">${produto.avaliaçãoProduto}</td>
                        
         `
         conteudoTabela.appendChild(linhas_content)

    });
    
}
carregarProdutos()