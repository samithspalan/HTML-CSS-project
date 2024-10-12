// JavaScript for Cart functionality
let cart = [];  // To store items in the cart
let cartTotal = 0;

const cartItems = document.getElementById('cart-items');
const cartTotalDisplay = document.getElementById('cart-total');

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (event) => {
    const name = event.target.dataset.name;
    const price = parseInt(event.target.dataset.price);
    
    // Check if the cake is already in the cart
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      // Add new item to the cart
      cart.push({ name, price, quantity: 1 });
    }

    // Update cart display
    updateCartDisplay();
  });
});

// Function to update cart items and total
function updateCartDisplay() {
  cartItems.innerHTML = ''; // Clear current cart items
  cartTotal = 0;

  cart.forEach((item, index) => {
    // Create a list item for each cart item
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - $${item.price} x ${item.quantity}
      <button class="decrease" data-index="${index}">-</button>
      <button class="increase" data-index="${index}">+</button>
    `;
    cartItems.appendChild(li);

    // Calculate total price
    cartTotal += item.price * item.quantity;
  });

  // Update total price display
  cartTotalDisplay.textContent = cartTotal;

  // Add event listeners to increase and decrease buttons
  document.querySelectorAll('.increase').forEach(button => {
    button.addEventListener('click', increaseQuantity);
  });
  
  document.querySelectorAll('.decrease').forEach(button => {
    button.addEventListener('click', decreaseQuantity);
  });
}

// Function to increase item quantity
function increaseQuantity(event) {
  const index = event.target.dataset.index;
  cart[index].quantity++;
  updateCartDisplay();
}

// Function to decrease item quantity
function decreaseQuantity(event) {
  const index = event.target.dataset.index;
  
  // Decrease the quantity or remove the item if quantity becomes 0
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1); // Remove item from the cart
  }

  updateCartDisplay();
}
