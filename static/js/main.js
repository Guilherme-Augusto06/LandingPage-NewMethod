document.addEventListener('DOMContentLoaded', function() {
    todos_Eventos(); // Chame a função para adicionar os eventos após o carregamento do DOM
    atualizarContadorCarrinho(); // Atualiza o contador do carrinho ao carregar a página
    listarProdutosNoCarrinho(); // Lista os produtos do carrinho na modal
});

function todos_Eventos() {
    // ADICIONA EVENTO DE COMPRA PARA TODOS OS BOTÕES DE COMPRA
    document.querySelectorAll(".botao-comprar button").forEach(function(button) {
        button.addEventListener("click", function() {
            const produto = {
                marca: this.parentNode.parentNode.querySelector("#nome").textContent,
                descricao: this.parentNode.parentNode.querySelector("#descricao").textContent,
                valor: parseFloat(this.parentNode.parentNode.querySelector("#valor").textContent.replace("R$ ", ""))
            };
            adicionarProdutoAoCarrinho(produto);
        });
    });
    document.querySelectorAll(".botao-comprar2 button").forEach(function(button) {
        button.addEventListener("click", function() {
            const produto = {
                marca: this.parentNode.parentNode.querySelector("#nome").textContent,
                descricao: this.parentNode.parentNode.querySelector("#descricao").textContent,
                valor: parseFloat(this.parentNode.parentNode.querySelector("#valor").textContent.replace("R$ ", ""))
            };
            adicionarProdutoAoCarrinho(produto);
        });
    });

    // ADICIONA EVENTO PARA ABRIR MODAL DE CARRINHO
    document.querySelector("#abrirModalCarrinho").addEventListener("click", function() {
        document.getElementById("modalCarrinho").style.display = "block";
    });

    // ADICIONA EVENTO PARA FECHAR MODAL DE CARRINHO
    document.querySelector(".fecharModalCarrinho").addEventListener("click", function() {
        document.getElementById("modalCarrinho").style.display = "none";
    });
}

// Função para adicionar produto ao carrinho
function adicionarProdutoAoCarrinho(produto) {
    axios.post(`http://127.0.0.1:5000/add`, produto)
        .then(function() {
            alert(`O produto ${produto.marca} foi adicionado ao carrinho.`);
            // Atualiza o contador do carrinho
            atualizarContadorCarrinho();
            // Lista os produtos do carrinho na modal
            listarProdutosNoCarrinho();
        })
        .catch(function(error) {
            console.error(error);
        });
}

// Função para atualizar o contador do carrinho
function atualizarContadorCarrinho() {
    axios.get(`http://127.0.0.1:5000/list`)
        .then(function(response) {
            const produtos = response.data;
            const contador = produtos.length;
            document.getElementById("carrinho-counter").textContent = contador;
        })
        .catch(function(error) {
            console.error(error);
        });
}

// Função para listar os produtos do carrinho na modal
// Função para listar os produtos do carrinho na modal
function listarProdutosNoCarrinho() {
    axios.get(`http://127.0.0.1:5000/list`)
        .then(function(response) {
            const produtos = response.data;
            const modalBody = document.querySelector("#modalCarrinho #listaProdutosCarrinho");
            modalBody.innerHTML = ""; // Limpa o conteúdo anterior

            produtos.forEach(function(produto, index) {
                const produtoHTML = `
                    <div class="item-carrinho">
                        <p><strong>Marca:</strong> ${produto.Marca}</p>
                        <p><strong>Descrição:</strong> ${produto.Descrição}</p>
                        <p><strong>Valor:</strong> R$ ${produto.Valor.toFixed(2)}</p>
                        <button class="btn-excluir" data-index="${index}">-</button>
                    </div>
                `;
                modalBody.innerHTML += produtoHTML;
            });

            // Adiciona evento de clique para o botão de exclusão
            document.querySelectorAll(".btn-excluir").forEach(function(button) {
                button.addEventListener("click", function() {
                    const index = parseInt(this.getAttribute("data-index"));
                    deletarProdutoDoCarrinho(index);
                });
            });
        })
        .catch(function(error) {
            console.error(error);
        });
}

// Função para excluir o produto do carrinho
function deletarProdutoDoCarrinho(index) {
    axios.delete(`http://127.0.0.1:5000/delete/${index}`)
        .then(function(response) {
            alert(response.data.message);
            listarProdutosNoCarrinho();
            atualizarContadorCarrinho();
        })
        .catch(function(error) {
            console.error(error);
        });
}