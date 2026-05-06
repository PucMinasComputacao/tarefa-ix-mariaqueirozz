document.addEventListener("DOMContentLoaded", () => {

// ==========================
// BASE DE DADOS (JSON)
// ==========================
const data = {
    produtos: [
    { id: 1, nome: "iPhone 13", preco: 5000, categoria: "Celulares", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi3pGuBfI7mAboYlb2yHytiev5EOBAADOKRQ&s", descricao: "Apple smartphone moderno", emEstoque: true },
    { id: 2, nome: "Samsung Galaxy S21", preco: 3200, categoria: "Celulares", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIuXrkYwL7cLn-pVLmNNQ3M1U5Gof4z2W0Vg&s", emEstoque: true },
    { id: 3, nome: "Notebook Dell Inspiron", preco: 4200, categoria: "Notebooks", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKPRhdlAVhZeW4UiZ2EVTGggqYzFT0eccGLQ&s", descricao: "Notebook para trabalho e estudo", emEstoque: false },
    { id: 4, nome: "MacBook Air", preco: 7000, categoria: "Notebooks", imagem: "https://cdn.awsli.com.br/600x700/1861/1861669/produto/228035473/macbook-air-m2--2022--13-6-ssd-256gb8gb--space-gray-7phwqtxwq5.jpg", descricao: "Notebook leve da Apple", emEstoque: true },
    { id: 5, nome: "Mouse Gamer RGB", preco: 180, categoria: "Acessórios", imagem: "https://cdn.awsli.com.br/2500x2500/1318/1318167/produto/122256448/20983cdb10.jpg", descricao: "Mouse com iluminação RGB", emEstoque: true },
    { id: 6, nome: "Teclado Mecânico", preco: 350, categoria: "Acessórios", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST_Kyipsu_C8Hx9E67h6Tb-qt2ORmFul1BUA&s", descricao: "Teclado gamer profissional", emEstoque: true },
    { id: 7, nome: "PlayStation 5", preco: 4500, categoria: "Games", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjvm-RygcWDY94TE8ndQpZP-iT6lNNAAir6g&s", descricao: "Console da Sony", emEstoque: false },
    { id: 8, nome: "Xbox Series X", preco: 4200, categoria: "Games", imagem: "https://images.tcdn.com.br/img/img_prod/993382/console_xbox_series_x_1tb_2_controles_pretos_473_1_6d80e52b7bf8e12985fe0371faf6cd19.jpg", descricao: "Console da Microsoft", emEstoque: true }
    ]
};

// ==========================
// SELEÇÃO DE ELEMENTOS (DOM)
// ==========================
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

// ==========================
// FUNÇÕES
// ==========================

// Formatar preço
function formatPrice(preco) {
    return "R$ " + preco.toFixed(2);
}

// Criar card
function createProductCard(produto) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", produto.id);

  // estilo obrigatório
    card.style.backgroundColor = "#ffffff";

    const title = document.createElement("h3");
    title.innerText = produto.nome;

    const img = document.createElement("img");
    img.setAttribute("src", produto.imagem);

    const price = document.createElement("p");
    price.innerText = formatPrice(produto.preco);

    const category = document.createElement("p");
    category.innerText = "Categoria: " + produto.categoria;

    const btnDetails = document.createElement("button");
    btnDetails.innerText = "Ver detalhes";

    const btnHighlight = document.createElement("button");
    btnHighlight.innerText = "Destacar";

  // EVENTO: Ver detalhes
    btnDetails.addEventListener("click", () => {
    showProductDetails(produto);
    });

  // EVENTO: Destacar
    btnHighlight.addEventListener("click", () => {
    card.classList.toggle("highlight");
    });

    card.appendChild(title);
    card.appendChild(img);
    card.appendChild(price);
    card.appendChild(category);
    card.appendChild(btnDetails);
    card.appendChild(btnHighlight);

    return card;
}

// Renderizar produtos
function renderProducts(produtos) {
    productList.innerHTML = "";

    produtos.forEach(produto => {
    const card = createProductCard(produto);
    productList.appendChild(card);
    });

  // Uso obrigatório de querySelectorAll
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
    console.log("ID do card:", card.getAttribute("data-id"));

    // pequeno efeito extra
    card.style.transition = "0.3s";
    });
}

// Renderizar categorias
function renderCategories() {
    const categorias = ["Todas"];

    data.produtos.forEach(produto => {
    if (!categorias.includes(produto.categoria)) {
        categorias.push(produto.categoria);
    }
    });

    categorySelect.innerHTML = "";

    categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.innerText = cat;
    categorySelect.appendChild(option);
    });
}

// Mostrar detalhes
function showProductDetails(produto) {
    productDetails.innerHTML = `
    <h2>${produto.nome}</h2>
    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
    <p><strong>Categoria:</strong> ${produto.categoria}</p>
    <p><strong>Estoque:</strong> ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
    <p>${produto.descricao}</p>
    `;
}

// Filtrar produtos
function filterProducts() {
    const search = searchInput.value.toLowerCase();
    const category = categorySelect.value;

    return data.produtos.filter(produto => {
    const matchName = produto.nome.toLowerCase().includes(search);
    const matchCategory = category === "Todas" || produto.categoria === category;
    return matchName && matchCategory;
    });
}

// ==========================
// EVENTOS
// ==========================

searchInput.addEventListener("input", () => {
    renderProducts(filterProducts());
});

categorySelect.addEventListener("change", () => {
    renderProducts(filterProducts());
});

btnRender.addEventListener("click", () => {
    renderProducts(filterProducts());
});

// ==========================
// INICIALIZAÇÃO
// ==========================
renderCategories();
renderProducts(data.produtos);
});