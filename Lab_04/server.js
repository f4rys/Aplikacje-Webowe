const express = require('express');
const bodyParser = require('body-parser');
const { Book, Order, User } = require('./models');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = 'LOREMIPSUM';

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.error('Authorization header is missing');
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.error('Token is missing in Authorization header');
    return res.status(401).json({ error: 'Token is missing in Authorization header' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.error('JWT verification failed:', err.message);
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};

// Book routes
app.get('/api/books', async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

app.get('/api/books/:id', async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.sendStatus(404);
  }
});

app.post('/api/books', authenticateJWT, async (req, res) => {
  const name = req.query.name;
  const author = req.query.author;
  const year = req.query.year;

  if (!name || !author || !year) {
    return res.status(400).json({ error: 'Name, author, and year are required' });
  }

  try {
    const book = await Book.create({ name, author, year });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the book' });
  }
});

app.delete('/api/books/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Book.destroy({ where: { id } });
    if (result) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the book' });
  }
});

// Order routes
app.get('/api/orders/:userId', async (req, res) => {
  const orders = await Order.findAll({ where: { userId: req.params.userId } });
  res.json(orders);
});

app.post('/api/orders', authenticateJWT, async (req, res) => {
  const { bookId, quantity } = req.query;
  const userId = req.user.id;

  console.log(userId)

  if (!bookId || !quantity) {
    return res.status(400).json({ error: 'Book ID and quantity are required' });
  }

  try {
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const order = await Order.create({ userId, bookId, quantity });
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(500).json({ error: 'An error occurred while creating the order' });
  }
});

app.patch('/api/orders/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.query;

  if (!quantity) {
    return res.status(400).json({ error: 'Quantity is required' });
  }

  try {
    const order = await Order.findByPk(id);
    if (order) {
      order.quantity = quantity;
      await order.save();
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the order' });
  }
});

app.delete('/api/orders/:id', authenticateJWT, async (req, res) => {
  const result = await Order.destroy({ where: { id: req.params.id } });
  if (result) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

app.patch('/api/orders/:id', authenticateJWT, async (req, res) => {
  const { quantity } = req.body;
  const order = await Order.findByPk(req.params.id);
  if (order) {
    order.quantity = quantity;
    await order.save();
    res.json(order);
  } else {
    res.sendStatus(404);
  }
});

// User routes
app.post('/api/register', async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  try {
    const user = await User.create({ email, password});
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
});

app.post('/api/login', async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  const user = await User.findOne({ where: { email } });

  if (user && user.password === password) {
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});