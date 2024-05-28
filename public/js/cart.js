document.addEventListener("DOMContentLoaded", function() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalContainer = document.getElementById('cart-total');
  const purchaseButton = document.getElementById('purchase-button');

  // Verificar si el contenedor del carrito existe
  if (!cartItemsContainer) {
    console.error('El contenedor del carrito no existe.');
    return;
  }

  // Obtener el carrito desde localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  console.log('Contenido del carrito al cargar la página:', cart);

  // Mostrar los elementos del carrito
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
    purchaseButton.style.display = 'none'; // Ocultar el botón de compra si el carrito está vacío
  } else {
    let total = 0;

    cart.forEach(book => {
      const bookElement = document.createElement('div');
      bookElement.className = 'cart-item';
      bookElement.innerHTML = `
        <div class="row mb-3">
          <div class="col-md-2">
            <img src="${book.imageSrc}" alt="${book.title}" class="img-fluid">
          </div>
          <div class="col-md-8">
            <h5>${book.title}</h5>
            <p>${book.price}</p>
            <p>Cantidad: ${book.quantity}</p>
          </div>
          <div class="col-md-2">
            <button class="btn btn-danger remove-from-cart">Eliminar</button>
          </div>
        </div>
      `;
      cartItemsContainer.appendChild(bookElement);

      // Calcular el total
      const price = parseFloat(book.price.replace('€', ''));
      total += price * book.quantity;

      // Agregar evento de clic para eliminar del carrito
      bookElement.querySelector('.remove-from-cart').addEventListener('click', function() {
        cart = cart.filter(item => item.title !== book.title);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Carrito después de eliminar un elemento:', cart);
        location.reload(); // Recargar la página para actualizar el carrito
      });
    });

    // Mostrar el total de la venta
    cartTotalContainer.innerHTML = `<h4>Total: €${total.toFixed(2)}</h4>`;
  }

  // Manejar el evento de clic en el botón "COMPRAR"
  purchaseButton.addEventListener('click', function() {
    alert('¡Tu compra ha sido procesada!');
    // Vaciar el carrito después de la compra
    localStorage.removeItem('cart');
    location.reload(); // Recargar la página para actualizar el carrito
  });
});
