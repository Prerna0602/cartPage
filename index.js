const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('static'));

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

// 1....Add an Item to the Cart
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let product = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  };
  cart.push(product);
  res.json({ cartItems: cart });
});

// 2...........edit quantity of an items in the cart
function editQuantity(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}
app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = editQuantity(cart, productId, quantity);
  res.json({ cartItems: result });
});

// 3......delete an item from the cart
function deleteItem(productId) {
  cart = cart.filter((product) => product.productId != productId);
  return cart;
}
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = deleteItem(productId);
  res.json({ cartItems: result });
});

// 4........read items in the cart
app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

// 5............calculate total quantity of items in the cart
function totalQuantity(cart) {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum += cart[i].quantity;
  }
  return sum;
}
app.get('/cart/total-quantity', (req, res) => {
  let result = totalQuantity(cart);
  res.json({ totalQuantity: result });
});

// total price of items in the cart
function totalPrice(cart) {
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum += cart[i].price;
  }
  return sum;
}
app.get('/cart/total-price', (req, res) => {
  let result = totalPrice(cart);
  res.json({ totalPrice: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
