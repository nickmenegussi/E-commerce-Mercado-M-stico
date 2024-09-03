const close_modal = document.getElementById("close-modal");

close_modal.addEventListener("click", () => {
  close_modal.setAttribute("data-bs-dismiss", "modal");
});

async function NovasInformacoes(event) {
  event.preventDefault();

  const produto_input = document.getElementById("produto_id").value;

  const nome = document.getElementById("novo_produto").value;
  const descriçãoProduto = document.getElementById("novaDescricao").value;
  const valor = document.getElementById("novoPreco").value;
  const tags = document.getElementById("novaTag").value;
  const avaliaçãoProduto = document.getElementById("novaAvaliacao").value;
  const imagem = document.getElementById("novaImagem").value;

  const data = {
    nome,
    descriçãoProduto,
    valor,
    tags,
    avaliaçãoProduto,
    imagem,
  };

  const response = await fetch(
    `http://localhost:3001/product/editar/${produto_input}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (result.success) {
    console.log("Alterado com sucesso!");
  } else {
    console.log("Erro ao alterar os dados");
  }
}
