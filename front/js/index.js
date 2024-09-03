function addProductToCart(event) {
    const button = event.target
    const productInfos = button.parentElement.parentElement.parentElement
    const productImage = productInfos.getElementsByClassName("productImg")[0].src
    const productTitle = productInfos.getElementsByClassName("product-name")[0].innerText
    const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText

    const product = {
      Name: productTitle,
      Image: productImage,
      Price: productPrice,
    }
    
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const findProduct = cart.find(item => item.Name === product.Name)

    function updateCartAccount(){
      let valueofItensInfos = document.getElementsByClassName("position-relative")
      console.log(valueofItens)
    }

    if (findProduct){
      alert("Você já adicionou um produto no carrinho! Se quiseres aumentar a quantidade, vá para o carrinho;")
    } else {
      cart.push(product)
      alert(`Você adicionou ao carrinho o produto ${product.Name}`)

    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    updateCartAccount()


}

const addToCartButtons = document.getElementsByClassName("add-to-cart")

for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", addProductToCart)
}


// uso do result.data para pegar os valores do json que estão em uma lista de objetos e que geralmente nos retorna os dados da nossa API que tem o resultado e a data
async function ExibirvaloresBD(){
    const exibirInformações = await fetch('http://localhost:3001/usuario/exibir')
    
    const result = await exibirInformações.json()

    if (result.success){
      const adminUser = result.data.findIndex(user => user.status_permissão === 'ADMIN')

      if(adminUser !== -1){
        const valores = result.data[0].nome
        const nome_usuario = document.querySelector('.nome-usuario')
        nome_usuario.textContent = `Nome: ${valores}`

        const adminlink = document.getElementById('adminlink')
        adminlink.innerHTML = '<a class="nav-link" href="../../private/DashboardAdmin/gerenciamentoCatalogos.html/gerenCatalogos.html">Gerenciar Catalogo</a>'

        alert(`Seja muito Bem-vindo, ${valores}, ao GalacticMaket! Você tem privilégios extras!!!`)
      } else {
          result.data.forEach((user, index) => {
            if (index !== 0){
              const valores = user.nome
              const nome_usuario = document.querySelector('.nome-usuario')
              nome_usuario.textContent = `Nome: ${valores}`

              const adminlink = document.getElementById('adminlink')
              adminlink.innerHTML = '<a class="nav-link" href="#">Exit</a>'

              alert(`Seja muito Bem-vindo, ${valores}, ao GalacticMaket! Desejamos que você aproveite o nosso E-commerce!`)
              }
          })
      }
      
    } 
}

ExibirvaloresBD()
