const removeProductsdButtons = document.getElementsByClassName("button-excluir")

for (let i = 0; i < removeProductsdButtons.length; i++){
  removeProductsdButtons[i].addEventListener("click", function(event){
    event.target.parentElement.parentElement.remove()
  })
}


  const cartProdcuts = document.getElementsByClassName("linhaofproducts")

  for(let i = 0; i < cartProdcuts.length; i++){
    let totalAmount = 0
    let quantity = 1
    
    const button_diminuir = cartProdcuts[i].getElementsByClassName("button-diminuir")[0]
    const button_aumentar = cartProdcuts[i].getElementsByClassName("button-aumentar")[0]
    const productPrice = cartProdcuts[i].getElementsByClassName("product-price")[0].innerText.replace("R$", "").replace(",",".")
    

    button_diminuir.addEventListener("click", () =>{
      const valueQuantity = cartProdcuts[i].getElementsByClassName("valor-quantidade")[0].innerText = quantity
      if (quantity !== 1){
        quantity -= 1
        totalAmount -= valueQuantity * productPrice 
        const productTotalPrice = cartProdcuts[i].getElementsByClassName("total-price")[0].innerHTML =  "R$" + totalAmount.toFixed(2)
        const productPrice = cartProdcuts[i].getElementsByClassName("product-price")[0].innerText.replace("R$", "").replace(",",".")

      } else {
        alert("Erro. explicar o erro")
      }

      console.log(totalAmount)


    })
    button_aumentar.addEventListener("click", () => {
      quantity += 1
      const valueQuantity = cartProdcuts[i].getElementsByClassName("valor-quantidade")[0].innerText = quantity
      totalAmount += valueQuantity * productPrice
      const productTotalPrice = cartProdcuts[i].getElementsByClassName("total-price")[0].innerHTML =  "R$" + totalAmount.toFixed(2)
      const productPrice = cartProdcuts[i].getElementsByClassName("product-price")[0].innerText.replace("R$", "").replace(",",".")



    })
   
   
    
  }




function addProductToCart(event){
  const button = event.tagert
  // primeiro pegar a div que engloba todas informações
  const productInfos = button.parentElement
  const productImage = productInfos.getElementsByClassName('card-img')
  console.log(button)
}
