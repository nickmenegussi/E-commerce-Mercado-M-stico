const removeProductsdButtons = document.getElementsByClassName("button-excluir")

for (let i = 0; i < removeProductsdButtons.length; i++) {
  removeProductsdButtons[i].addEventListener("click", function (event) {
    event.target.parentElement.parentElement.remove()
  })
}
updateQuantityandPriceTotal()

function updateProductsCart(){
    let newCartProduct = document.createElement("div");
    newCartProduct.className = 'linhaofproducts mx-auto p-2 mt-3';
    newCartProduct.innerHTML = `
      <div class="col descritionsofcontent">
        <img class="productImg" src="${productImage}" alt="${productTitle}">
        <h6>${productTitle}</h6>
      </div>
      <div class="col">
        <div class="container borda gap-2 text-center">
          <button class="button-diminuir">-</button>
          <div class="valor-quantidade">1</div>
          <button class="button-aumentar">+</button>
        </div>
      </div>
      <div class="col">
        <h6 class="mt-2 text-center product-price">R$${productPrice}</h6>
      </div>
      <div class="col">
        <h6 class="mt-2 text-center total-price">R$${productPrice}</h6>
      </div>
      <div class="col">
        <button type="button" class="btn btn-danger ms-5 button-excluir">Excluir</button>
      </div>
    `;
}

function updateQuantityandPriceTotal() {
    updateProductsCart()
    const cartProdcuts = document.getElementsByClassName("linhaofproducts")
    for (let i = 0; i < cartProdcuts.length; i++) {
      let quantity = 1
  
      const button_diminuir = cartProdcuts[i].getElementsByClassName("button-diminuir")[0]
      const button_aumentar = cartProdcuts[i].getElementsByClassName("button-aumentar")[0]
  
      const productPrice = cartProdcuts[i].getElementsByClassName("product-price")[0].innerText.replace("R$", "").replace(",", ".")
  
      let productTotalPrice = cartProdcuts[i].getElementsByClassName("total-price")[0]
      let valueQuantity = cartProdcuts[i].getElementsByClassName("valor-quantidade")[0]
  
  
      function updateTotalAmount() {
        let totalAmount = quantity * productPrice
        productTotalPrice.innerText = "R$" + totalAmount.toFixed(2)
      }
  
      button_diminuir.addEventListener("click", () => {
        if (quantity > 1) {
          quantity -= 1
          valueQuantity.innerHTML = quantity
          updateTotalAmount()
  
        } else {
          alert("Erro. explicar o erro")
        }
      })
      button_aumentar.addEventListener("click", () => {
        quantity += 1
        valueQuantity.innerHTML = quantity
        updateTotalAmount()
      }
      )
      updateTotalAmount()
    }
  
  }
  