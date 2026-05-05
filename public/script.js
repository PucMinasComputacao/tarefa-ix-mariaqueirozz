// ====BASE DE DADOS====
const data = {
  produtos: [
    {id:1, nome:"iPhone", preco:5000, categoria:"Celulares", imagem:"https://via.placeholder.com/150", descricao:"Celular top", emEstoque:true},
    {id:2, nome:"Samsung", preco:3000, categoria:"Celulares", imagem:"https://via.placeholder.com/150", descricao:"Celular bom", emEstoque:true},
    {id:3, nome:"Notebook Dell", preco:4000, categoria:"Notebooks", imagem:"https://via.placeholder.com/150", descricao:"Notebook rápido", emEstoque:true},
    {id:4, nome:"Notebook HP", preco:3500, categoria:"Notebooks", imagem:"https://via.placeholder.com/150", descricao:"Notebook ok", emEstoque:false},
    {id:5, nome:"Mouse Gamer", preco:200, categoria:"Acessórios", imagem:"https://via.placeholder.com/150", descricao:"Mouse RGB", emEstoque:true},
    {id:6, nome:"Teclado", preco:150, categoria:"Acessórios", imagem:"https://via.placeholder.com/150", descricao:"Teclado mecânico", emEstoque:true},
    {id:7, nome:"PlayStation", preco:4500, categoria:"Games", imagem:"https://via.placeholder.com/150", descricao:"Console", emEstoque:true},
    {id:8, nome:"Xbox", preco:4200, categoria:"Games", imagem:"https://via.placeholder.com/150", descricao:"Console top", emEstoque:false},
  ]
}

// ====SELEÇÃO====
const productList = document.getElementById("product-list")
const productDetails = document.getElementById("product-details")
const searchInput = document.querySelector("#search")
const categorySelect = document.querySelector("#category")
const btnRender = document.getElementById("btnRender")

// ====FUNÇÕES====
function formatPrice(preco){
  return "R$ " + preco.toFixed(2)
}

function createProductCard(produto){
  const card = document.createElement("div")
  card.classList.add("card")
  card.setAttribute("data-id", produto.id)

  // estilo obrigatório
  card.style.background = "#f9f9f9"

  card.innerHTML = `
    <h3>${produto.nome}</h3>
    <img src="${produto.imagem}">
    <p>${formatPrice(produto.preco)}</p>
    <p>${produto.categoria}</p>
    <button class="details">Ver detalhes</button>
    <button class="highlightBtn">Destacar</button>
  `

  // eventos
  card.querySelector(".details").addEventListener("click", () => {
    showProductDetails(produto)
  })

  card.querySelector(".highlightBtn").addEventListener("click", () => {
    card.classList.toggle("highlight")
  })

  return card
}

function renderProducts(produtos){
  productList.innerHTML = ""

  produtos.forEach(p => {
    const card = createProductCard(p)
    productList.appendChild(card)
  })

  // querySelectorAll obrigatório
  const cards = document.querySelectorAll(".card")
  cards.forEach(c => {
    console.log("Card ID:", c.getAttribute("data-id"))
  })
}

function renderCategories(){
  const categorias = [...new Set(data.produtos.map(p => p.categoria))]

  categorias.forEach(cat => {
    const option = document.createElement("option")
    option.value = cat
    option.textContent = cat
    categorySelect.appendChild(option)
  })
}

function showProductDetails(produto){
  productDetails.innerHTML = `
    <h2>${produto.nome}</h2>
    <p>Preço: ${formatPrice(produto.preco)}</p>
    <p>Categoria: ${produto.categoria}</p>
    <p>Estoque: ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
    <p>${produto.descricao}</p>
  `
}

function filterProducts(){
  const texto = searchInput.value.toLowerCase()
  const categoria = categorySelect.value

  return data.produtos.filter(p => {
    const matchNome = p.nome.toLowerCase().includes(texto)
    const matchCategoria = categoria === "Todas" || p.categoria === categoria
    return matchNome && matchCategoria
  })
}

// ====EVENTOS====
searchInput.addEventListener("input", () => {
  renderProducts(filterProducts())
})

categorySelect.addEventListener("change", () => {
  renderProducts(filterProducts())
})

btnRender.addEventListener("click", () => {
  renderProducts(data.produtos)
})

// ====INICIALIZAÇÃO====
renderCategories()
renderProducts(data.produtos)