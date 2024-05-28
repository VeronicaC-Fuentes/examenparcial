const request = require('supertest');
const app = require('./app');

let server;

beforeAll((done) => {
  server = app.listen(3000, () => {
    global.agent = request.agent(server);
    done();
  });
});

afterAll((done) => {
  return server && server.close(done);
});

describe('GET /', () => {
  it('responds with welcome message', async () => {
    const response = await global.agent.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Tienda de Libros');
  });
});

describe('GET /books', () => {
  it('responds with books.html content', async () => {
    const response = await global.agent.get('/books');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Lista de Libros');
  });
});

describe('GET /contact', () => {
  it('responds with contact.html content', async () => {
    const response = await global.agent.get('/contact');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Contáctanos');
  });
});

describe('POST /contact', () => {
  it('registers a new contact message', async () => {
    const newMessage = { name: 'John Doe', email: 'john@example.com', message: 'Hola, estoy interesado en sus libros.' };
    const response = await global.agent
      .post('/contact')
      .send(newMessage);
    expect(response.status).toBe(200);
    expect(response.text).toBe('¡Gracias por ponerte en contacto con nosotros!');
  });
});

describe('Carrito de Compras', () => {
  it('should add a book to the cart', async () => {
    const newBook = { title: 'Book Title', price: '€10.00', imageSrc: '/path/to/image.jpg', quantity: 1 };
    const response = await global.agent
      .post('/cart')
      .send(newBook);
    expect(response.status).toBe(200);
    expect(response.text).toBe('Libro agregado al carrito');
  });

  it('should not add a book with invalid data', async () => {
    const invalidBook = { title: 'Book Title', price: '€10.00', imageSrc: '/path/to/image.jpg', quantity: 0 };
    const response = await global.agent
      .post('/cart')
      .send(invalidBook);
    expect(response.status).toBe(400);
    expect(response.text).toBe('Datos inválidos para el carrito');
  });

  it('should get the cart contents', async () => {
    const response = await global.agent.get('/api/cart');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('title', 'Book Title');
  });

  it('should empty the cart', async () => {
    const response = await global.agent.delete('/api/cart');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Carrito vaciado');

    const cartResponse = await global.agent.get('/api/cart');
    expect(cartResponse.status).toBe(200);
    expect(cartResponse.body.length).toBe(0);
  });
});
