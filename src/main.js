// Данные о товарах
const products = 
[
    { title: "Товар 1", price: 1000, image: "empty.png", category: "Худи" },
    { title: "Товар 2", price: 2000, image: "empty.png", category: "Худи" },
    { title: "Товар 3", price: 1500, image: "empty.png", category: "Шапки" },
    { title: "Товар 4", price: 2500, image: "empty.png", category: "Шапки" },
    { title: "Товар 5", price: 1000, image: "empty.png", category: "Худи" },
    { title: "Товар 6", price: 2000, image: "empty.png", category: "Худи" },
    { title: "Товар 7", price: 1500, image: "empty.png", category: "Шапки" },
    { title: "Товар 8", price: 2500, image: "empty.png", category: "Шапки" },
    { title: "Товар 9", price: 1000, image: "empty.png", category: "Худи" },
    { title: "Товар 10", price: 2000, image: "empty.png", category: "Худи" },
    { title: "Товар 11", price: 1500, image: "empty.png", category: "Шапки" },
    { title: "Товар 12", price: 2500, image: "empty.png", category: "Шапки" },
]

const container = document.getElementById('productContainer');

// Создаем карточки и вставляем в контейнер
products.forEach(product => {
  const card = document.createElement('div');
  card.className = 'productCard';
  card.innerHTML = `
    <img src="${product.image}" alt="${product.title}" class="productImage" />
    <div class="productDetails">
      <div class="productTitle">${product.title}</div>
      <div class="productPrice">${product.price.toLocaleString()} Р</div>
    </div>
    <button type="button" name="buyButton">В корзину</button>
    `
  ;
  
  container.appendChild(card);
});

container.addEventListener('click', (e) => {
  if (e.target.name === 'buyButton') {
    const button = e.target;
    button.textContent = 'Добавлено';
    button.disabled = true;
  }
});