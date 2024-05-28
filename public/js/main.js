
document.addEventListener("DOMContentLoaded", function() {
  // Obtener todos los botones "Agregar al Carrito"
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  // Agregar evento de clic a cada botón
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Obtener información del libro desde la tarjeta
      const bookCard = button.closest('.card');
      const title = bookCard.querySelector('.card-title').textContent;
      const price = bookCard.querySelector('strong').textContent;
      const imageSrc = bookCard.querySelector('img').src;

      // Crear objeto de libro
      const book = {
        title: title,
        price: price,
        imageSrc: imageSrc,
        quantity: 1
      };

      console.log('Libro a agregar:', book);

      // Obtener el carrito desde localStorage
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      console.log('Carrito antes de agregar:', cart);

      // Verificar si el libro ya está en el carrito
      const existingBookIndex = cart.findIndex(item => item.title === book.title);
      if (existingBookIndex > -1) {
        // Si ya está en el carrito, incrementar la cantidad
        cart[existingBookIndex].quantity += 1;
      } else {
        // Si no está, agregarlo al carrito
        cart.push(book);
      }

      // Guardar el carrito actualizado en localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Carrito después de agregar:', cart);

      // Mostrar mensaje de éxito
      alert('¡Libro agregado al carrito!');
    });
  });
});
