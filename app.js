const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Agregar esta línea
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/src', express.static(path.join(__dirname, 'src')));

let cart = [];

// Rutas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/books', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'books.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/policies', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'policies.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

// Endpoint para agregar al carrito
app.post('/cart', (req, res) => {
  const { title, price, imageSrc, quantity } = req.body;
  if (!title || !price || !imageSrc || quantity <= 0) {
    return res.status(400).send('Datos inválidos para el carrito');
  }

  const existingBookIndex = cart.findIndex(item => item.title === title);
  if (existingBookIndex > -1) {
    cart[existingBookIndex].quantity += quantity;
  } else {
    cart.push({ title, price, imageSrc, quantity });
  }

  res.status(200).send('Libro agregado al carrito');
});

// Endpoint para obtener el contenido del carrito
app.get('/api/cart', (req, res) => {
  res.status(200).json(cart);
});

// Endpoint para vaciar el carrito
app.delete('/api/cart', (req, res) => {
  cart = [];
  res.status(200).send('Carrito vaciado');
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Nuevo mensaje de contacto:\nNombre: ${name}\nCorreo electrónico: ${email}\nMensaje: ${message}`);
  res.send('¡Gracias por ponerte en contacto con nosotros!');
});

// Solo inicia el servidor si no estamos en un entorno de pruebas
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
  });
}

module.exports = app;
