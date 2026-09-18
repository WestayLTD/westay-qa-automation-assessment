const PRODUCTS = [
  { id: 'laptop', name: 'Laptop', price: 999, icon: '💻', description: 'A powerful everyday laptop built for focused work.' },
  { id: 'headphones', name: 'Wireless Headphones', price: 149, icon: '🎧', description: 'Immersive sound with all-day wireless comfort.' },
  { id: 'keyboard', name: 'Mechanical Keyboard', price: 89, icon: '⌨️', description: 'Tactile keys and a compact, productive layout.' },
  { id: 'mouse', name: 'Wireless Mouse', price: 49, icon: '🖱️', description: 'Precise, ergonomic control without the cable.' },
  { id: 'monitor', name: '27-inch Monitor', price: 299, icon: '🖥️', description: 'A crisp display with generous space for multitasking.' },
  { id: 'webcam', name: 'Webcam', price: 79, icon: '📷', description: 'Sharp video and clear sound for every meeting.' }
];

const CART_KEY = 'westay-evaluation-cart';
const money = value => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
const getCart = () => JSON.parse(localStorage.getItem(CART_KEY) || '{}');
const saveCart = cart => { localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartCount(); };
const cartQuantity = cart => Object.values(cart).reduce((total, quantity) => total + quantity, 0);

function updateCartCount() {
  const count = document.querySelector('[data-testid="cart-count"]');
  if (count) count.textContent = String(cartQuantity(getCart()));
}

function showToast(message) {
  const toast = document.querySelector('[data-testid="toast"]');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function addToCart(productId) {
  const cart = getCart();
  if ((cart[productId] || 0) >= 2) return showToast('Maximum quantity of 2 reached.');
  if (!cart[productId] && Object.keys(cart).length >= 3) return showToast('Maximum of 3 different products allowed.');
  cart[productId] = (cart[productId] || 0) + 1;
  saveCart(cart);
  showToast('Added to cart.');
}

function renderProducts() {
  const grid = document.querySelector('[data-testid="product-grid"]');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map(product => `
    <article class="product-card" data-testid="product-card" data-product-id="${product.id}">
      <div class="product-image" role="img" aria-label="${product.name}"><span>${product.icon}</span></div>
      <div class="product-body">
        <h2 data-testid="product-name">${product.name}</h2>
        <p>${product.description}</p>
        <div class="product-foot">
          <span class="price" data-testid="product-price">${money(product.price)}</span>
          <button class="add-btn" data-testid="add-to-cart" type="button">Add to Cart</button>
        </div>
      </div>
    </article>`).join('');
  grid.addEventListener('click', event => {
    const button = event.target.closest('[data-testid="add-to-cart"]');
    if (button) addToCart(button.closest('[data-product-id]').dataset.productId);
  });
}

function renderCart() {
  const list = document.querySelector('[data-testid="cart-list"]');
  if (!list) return;
  const cart = getCart();
  const items = PRODUCTS.filter(product => cart[product.id]);
  if (!items.length) {
    list.innerHTML = '<div class="empty" data-testid="empty-cart"><div class="icon">🛒</div><h2>Your cart is empty</h2><p>Add something you like from our collection.</p><a class="primary-btn" href="/products">Browse products →</a></div>';
  } else {
    list.innerHTML = items.map(product => `
      <article class="cart-item" data-testid="cart-item" data-product-id="${product.id}">
        <div class="cart-thumb">${product.icon}</div>
        <div class="cart-meta"><h2>${product.name}</h2><span>${money(product.price)}</span></div>
        <div class="quantity">
          <button type="button" data-action="decrease" data-testid="decrease-quantity" aria-label="Decrease ${product.name} quantity">−</button>
          <strong data-testid="item-quantity">${cart[product.id]}</strong>
          <button type="button" data-action="increase" data-testid="increase-quantity" aria-label="Increase ${product.name} quantity">+</button>
        </div>
        <button class="remove" type="button" data-action="remove" data-testid="remove-item">Remove</button>
      </article>`).join('');
  }
  updateSummary();
}

function updateSummary() {
  const cart = getCart();
  const subtotal = PRODUCTS.reduce((total, p) => total + p.price * (cart[p.id] || 0), 0);
  const tax = subtotal * .05;
  const values = { subtotal, tax, total: subtotal + tax };
  Object.entries(values).forEach(([key, value]) => {
    const el = document.querySelector(`[data-testid="${key}"]`);
    if (el) el.textContent = money(value);
  });
  const checkout = document.querySelector('[data-testid="checkout-button"]');
  if (checkout) checkout.disabled = subtotal === 0;
}

document.addEventListener('click', event => {
  const control = event.target.closest('[data-action]');
  if (!control) return;
  const id = control.closest('[data-product-id]').dataset.productId;
  const cart = getCart();
  if (control.dataset.action === 'remove') delete cart[id];
  if (control.dataset.action === 'decrease') cart[id] <= 1 ? delete cart[id] : cart[id]--;
  if (control.dataset.action === 'increase') {
    if (cart[id] >= 2) return showToast('Maximum quantity of 2 reached.');
    cart[id]++;
  }
  saveCart(cart);
  renderCart();
});

document.addEventListener('DOMContentLoaded', () => { updateCartCount(); renderProducts(); renderCart(); });
