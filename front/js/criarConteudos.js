async function carregarProdutos(){
    const response = await fetch('http://localhost:3001/product/exibir')
    const result = await response.json()
  
    if(result.success){
      updateProductsCart(result.data) // pegam os valores do json que serão exibidos 
      // para nós no result.data ou seja vao pegar os objetos dos valores cadastrados

    } else {
      console.error("Erro ao carregar produtos:", error)
    }
  
  }
  
  
  function updateProductsCart(produtos){
    const container_pocoes = document.querySelector('.section2 .row.row-cols-1.row-cols-md-3.g-4')
    const container_especiarias = document.querySelector('.especiarias .row.row-cols-1.row-cols-md-3.g-4')
    const container_artefatos = document.querySelector('.Artefatos .row.row-cols-1.row-cols-md-3.g-4')


    // Limpar o conteúdo anterior
      produtos.forEach(produto => {
          let produto_tags_cadastro = produto.tags.trim()
          const col = document.createElement('div');
          col.className = 'col';

          const card_content = document.createElement('div')
          card_content.className = 'card card-content'

          // Adicionar o conteúdo HTML do card
          card_content.innerHTML = `
              <img class="productImg" src="../../assets/" class="card-img-top card-img" alt="${produto.nome}">
              <div class="stars">
                  <h5>${produto.avaliaçãoProduto}</h5>
                  <i class="fa-solid fa-star"></i>
              </div>
              <div class="card-body-items">
                  <h5 class="product-name">${produto.nome}</h5>
                  <p>${produto.descriçãoProduto}</p>
                  <p class="product-price">R$ ${produto.valor.toFixed(2)}</p>
                  <button href="#" class="btn btn-primary mb-2 add-to-cart">ADICIONAR AO CARRINHO</button>
              </div>
          `;
            col.appendChild(card_content)
            if (produto_tags_cadastro === 'POÇÕES'){
              container_pocoes.appendChild(col)
            } else if (produto_tags_cadastro === 'ESPECIARIAS'){
              container_especiarias.appendChild(col)
            } else if (produto_tags_cadastro === 'ARTEFATOS'){
              container_artefatos.appendChild(col)
            }
          
          
        
    })
  }
  
carregarProdutos()