const data = {
    produtos: [
        {
            id:1,
            nome:"iPhone 13",
            preco:4500,
            categoria:"Celulares",
            imagem:"./imgs/iphone-13-img.jpg",
            descricao:"Smartphone da Apple com ótimo desempenho",
            emEstoque:true
        },
        {
            id:2,
            nome:"Samsung Galaxy S22",
            preco:3800,
            categoria:"Celulares",
            imagem:"./imgs/samsung-galaxy-s22-img.png",
            descricao:"Celular potente com excelente câmera",
            emEstoque:true
        },
        {
            id:3,
            nome:"Notebook Dell Inspiron",
            preco:3200,
            categoria:"Notebooks",
            imagem:"./imgs/notebook-dell-inspiron.png",
            descricao:"Notebook ideal para estudos e trabalho",
            emEstoque:true
        },
        {
            id:4,
            nome:"MacBook Air",
            preco:7000,
            categoria:"Notebooks",
            imagem:"./imgs/macbook-air.png",
            descricao:"Leve, rápido e com ótima bateria",
            emEstoque:true
        },
        {
            id:5,
            nome:"Mouse Gamer",
            preco:150,
            categoria:"Acessórios",
            imagem:"./imgs/mouse-gamer.jpg",
            descricao:"Mouse com alta precisão para jogos",
            emEstoque:true
        },
        {
            id:6,
            nome:"Teclado Mecânico",
            preco:300,
            categoria:"Acessórios",
            imagem:"./imgs/teclado-mecanico.jpg",
            descricao:"Teclado com switches mecânicos",
            emEstoque:true
        },
        {
            id:7,
            nome:"Xbox Series X",
            preco:4300,
            categoria:"Games",
            imagem:"./imgs/xbox-series-x.png",
            descricao:"Console poderoso da Microsoft",
            emEstoque:true
        },
        {
            id:8,
            nome:"PlayStation 5",
            preco:4500,
            categoria:"Games",
            imagem:"./imgs/playstation-5.jfif",
            descricao:"Console de última geração da Sony",
            emEstoque:false
        }
    ]
};

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

function formatPrice(preco) {
    return "R$ " + preco.toFixed(2);
}

function createProductCard(produto) {
    const card = document.createElement("div");

    card.classList.add("card");
    card.setAttribute("data-id", produto.id);

    card.style.border = "1px solid #ccc";
    card.style.padding = "10px";
    card.style.margin = "10px";
    card.style.backgroundColor = "#f9f9f9";
    card.style.cursor = "pointer";

    const titulo = document.createElement("h3");
    titulo.textContent = produto.nome;

    const img = document.createElement("img");
    img.setAttribute("src", produto.imagem);
    img.setAttribute("width", "150");

    const preco = document.createElement("p");
    preco.textContent = formatPrice(produto.preco);

    card.appendChild(titulo);
    card.appendChild(img);
    card.appendChild(preco);

    return card;
}

function renderProducts(produtos) {
    productList.innerHTML = "";

    produtos.forEach(produto => {
        const card = createProductCard(produto);
        productList.appendChild(card);
    });

    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            showProductDetails(produtos[index]);
        });
    });
}

function renderCategories() {
    categorySelect.innerHTML = "";

    const optionTodas = document.createElement("option");
    optionTodas.value = "todas";
    optionTodas.textContent = "Todas";
    categorySelect.appendChild(optionTodas);

    const categorias = [...new Set(data.produtos.map(p => p.categoria))];

    categorias.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });
}

function showProductDetails(produto) {
    productDetails.innerHTML = `
        <h2>${produto.nome}</h2>
        <img src="${produto.imagem}" width="200">
        <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Estoque:</strong> ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
    `;
}

function filterProducts() {
    const busca = searchInput.value.toLowerCase();
    const categoria = categorySelect.value;

    return data.produtos.filter(produto => {
        const matchNome = produto.nome.toLowerCase().includes(busca);
        const matchCategoria = categoria === "todas" || produto.categoria === categoria;

        return matchNome && matchCategoria;
    });
}

btnRender.addEventListener("click", () => {
    renderProducts(filterProducts());
});

renderCategories();
renderProducts(data.produtos);