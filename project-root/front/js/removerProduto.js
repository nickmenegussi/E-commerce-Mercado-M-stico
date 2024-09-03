async function ExibirBanco() {
  const response = await fetch("http://localhost:3001/product/exibir");
  const result = await response.json();

  if (result.success) {
    console.log(result.data)
  } else {
    console.log("Erro ao exibir produtos no banco", error);
  }
}

async function RemoverProduto() {

    const input_value = document.getElementById("number-produto").value;

    const response = await fetch(`http://localhost:3001/product/deletar/${input_value}`, {
        method: 'DELETE',
    })

    const result = await response.json()

    if (result.success){
        console.log('Produto removido e encontrado com sucesso')
    } else {
        console.log('Produto não encontrado!')
    }
  
}

ExibirBanco();
