const menuBar = document.querySelector(".navbar-menu");
document.querySelector("#menu-bar").onclick = (e) => {
  menuBar.classList.toggle("active");
  e.preventDefault(); 
};

const sideMenu = document.querySelector("#menu-bar");
document.addEventListener("click", function (e) {
  if (!sideMenu.contains(e.target) && !menuBar.contains(e.target)) {
    menuBar.classList.remove("active");
  }
});

const shoppingCart = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

const sideCart = document.querySelector("#shopping-cart-button");
document.addEventListener("click", function (e) {
  if (!sideCart.contains(e.target) && !shoppingCart.contains(e.target)) {
    if (!e.target.closest(".add-to-cart")) {
      shoppingCart.classList.remove("active");
    }
  }
});

shoppingCart.addEventListener("click", (e) => {
  e.stopPropagation(); 
});

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, 
  }).format(number);
};

function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem("shoppingCart");
  if (savedCart) {
    cart = JSON.parse(savedCart); 
    updateCart();
  }
}

function saveCartToLocalStorage() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

function saveViewedBookToSession(book) {
  sessionStorage.setItem("viewedBook", JSON.stringify(book));
}

function loadViewedBookFromSession() {
  const viewedBook = sessionStorage.getItem("viewedBook");
  if (viewedBook) {
    console.log("Buku terakhir yang dilihat:", JSON.parse(viewedBook));
  }
}

let products = {
  items: [
    {
      id: 1,
      name: "The Alchemist",
      img: "images/theAlchemist.jpg",
      price: 216000,
      discount: 80 / 100,
    },
    {
      id: 2,
      name: "Rich Dad Poor Dad",
      img: "images/Richdad.jpg",
      price: 60000,
      discount: 90 / 100, 
    },
    {
      id: 3,
      name: "I Want Die But I Want To Eat Tteokbokki",
      img: "images/iWantDie.jpg",
      price: 150000,
      discount: 70 / 100,
    },
    {
      id: 4,
      name: "Chicken Soup For The Soul",
      img: "images/chickenSoup.jpg",
      price: 119000,
      discount: 65 / 100,
    },
    {
      id: 5,
      name: "Start With Why",
      img: "images/startWithWhy.jpg",
      price: 80000,
      discount: 75 / 100,
    },
    {
      id: 6,
      name: "Dunia Sophie",
      img: "images/DuniaSophie.jpg",
      price: 169000,
      discount: 85 / 100,
    },
    {
      id: 7,
      name: "Educated",
      img: "images/Educated.jpg",
      price: 126000,
      discount: 95 / 100,
    },
    {
      id: 8,
      name: "How To Win Friends And Influence People",
      img: "images/HowToWin.jpg",
      price: 98000,
      discount: 80 / 100,
    },
    {
      id: 9,
      name: "The Black Swan",
      img: "images/AngsaHitam.jpg",
      price: 103000,
      discount: 75 / 100,
    },
    {
      id: 10,
      name: "Principles 80/20",
      img: "images/principle8020.jpg",
      price: 298000,
      discount: 75 / 100,
    },
  ],
};

let cart = [];

function updateCart() {
  cartContainer.innerHTML = ""; // Kosongkan keranjang
  let totalPriceBeforeDiscount = 0;
  let totalDiscount = 0;
  let totalPriceAfterDiscount = 0;

  cart.forEach((item) => {
    const discountedPrice = item.price * item.discount;
    const jmlDiscount = item.price - discountedPrice;

    totalPriceBeforeDiscount += item.price * item.quantity;
    totalDiscount += jmlDiscount * item.quantity;
    totalPriceAfterDiscount += discountedPrice * item.quantity;

    const cartItemHTML = `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="detail-item">
          <h3>${item.name}</h3>
          <div class="item-price">${rupiah(discountedPrice)}</div>
          <div class="quantity-control">
            <button class="decrease-quantity" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="increase-quantity" data-id="${item.id}">+</button>
          </div>
        </div>
        <i data-feather="trash-2" class="delete-item" data-id="${item.id}"></i>
      </div>
    `;
    cartContainer.innerHTML += cartItemHTML;
  });

  const cartSummaryHTML = `
    <div class="cart-summary">
      <p>Total harga (sebelum diskon): ${rupiah(totalPriceBeforeDiscount)}</p>
      <p>Total diskon: ${rupiah(totalDiscount)}</p>
      <p>Total harga (setelah diskon): ${rupiah(totalPriceAfterDiscount)}</p>
    </div>
  `;
  cartContainer.innerHTML += cartSummaryHTML;

  feather.replace(); 
  saveCartToLocalStorage(); 

  document.querySelectorAll(".delete-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      removeFromCart(id);
    });
  });

  document.querySelectorAll(".increase-quantity").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      increaseQuantity(id);
    });
  });

  // Event listener untuk tombol kontrol quantity
  document.querySelectorAll(".decrease-quantity").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      decreaseQuantity(id);
    });
  });
}

function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id);

  if (!existingItem) {
    cart.push({ ...product, quantity: 1 }); 
  } else {
    existingItem.quantity += 1; 
  }

  updateCart(); 
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
}

function increaseQuantity(productId) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += 1;
    updateCart();
  }
}

function decreaseQuantity(productId) {
  const item = cart.find((item) => item.id === productId);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    updateCart();
  } else {
    removeFromCart(productId); 
  }
}

const productContainer = document.querySelector(".row");
const cartContainer = document.querySelector(".shopping-cart");

products.items.forEach((product) => {
  const productHTML = `
    <div class="product-card">
      <div class="product-icons">
        <a href="#" class="add-to-cart" data-id="${
          product.id
        }"><i data-feather="shopping-cart"></i></a>
      </div>
      <div class="product-image">
        <img src="${product.img}" alt="${product.name}" />
      </div>
      <div class="product-content">
        <h3>${product.name}</h3>
        <div class="product-stars">
          <i data-feather="star"></i>
          <i data-feather="star"></i>
          <i data-feather="star"></i>
          <i data-feather="star"></i>
          <i data-feather="star"></i>
        </div>
        <div class="product-price">${rupiah(
          product.price * product.discount
        )} <span>${rupiah(product.price)}</span></div>
      </div>
    </div>
  `;

  productContainer.innerHTML += productHTML;
  feather.replace(); 
});

productContainer.addEventListener("click", (e) => {
  if (e.target.closest(".add-to-cart")) {
    e.preventDefault();
    const productId = parseInt(
      e.target.closest(".add-to-cart").getAttribute("data-id")
    );
    const product = products.items.find((item) => item.id === productId);
    addToCart(product);

    saveViewedBookToSession(product);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  loadCartFromLocalStorage(); 
  loadViewedBookFromSession(); 
});