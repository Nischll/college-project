const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const dbConfig = require('./dbConfig'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const JWT_SECRET = 'mySuperSecretKey@1234';
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Database connection
async function testConnection() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    console.log('Connected to Oracle Database');
  } catch (err) {
    console.error('Error connecting to Oracle Database:', err);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

testConnection();

// API to insert data into signup_details table
app.post('/signup', async (req, res) => {
  const { email, name, password } = req.body;

  let connection;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `INSERT INTO signup_details (email, name, password)
       VALUES (:email, :name, :password)`,
      { email, name, password:hashedPassword }, 
      { autoCommit: true }  
    );

    res.status(201).send({ message: 'User signed up successfully', result });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send({ error: 'Failed to sign up user' });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

// Login API
app.post('/login', async (req, res) => {

  const { email, password } = req.body;

  let connection;

  try {

    connection = await oracledb.getConnection(dbConfig);

    // Query to find user by email
    const result = await connection.execute(
      `SELECT email, password, role FROM signup_details WHERE email = :email`,
      { email }
    );
    // console.log('Database query result:', result.rows);

    if (result.rows.length === 0) {
      // User not found
      return res.status(404).send({ error: 'User not found' });
    }

    const [dbEmail, dbPassword, role] = result.rows[0]; 
    // console.log('Email:', dbEmail, 'Password:', dbPassword, 'Role:', role);

    // Compare entered password with hashed password
    const isPasswordMatch = await bcrypt.compare(password, dbPassword);

    if (!isPasswordMatch) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ email: dbEmail }, JWT_SECRET, { expiresIn: '1h' });

    // Success: Send response (or generate JWT here if needed)
    res.status(200).send({ 
      message: 'Login successful', 
      token,
      user: {email: dbEmail, role}
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send({ error: 'Failed to login' });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

// ADD PRODUCT
// Multer setup for image upload (image will be uploaded to server)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination folder for image uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add a timestamp to the filename
  }
});
const upload = multer({ storage });

app.post('/products', upload.single('image'), async (req, res) => {
  const { product_name, category, buying_price, quantity, unit, expiry_date } = req.body;
  const image = req.file ? fs.readFileSync(path.join(__dirname, 'uploads', req.file.filename)) : null;

  if (!product_name || !buying_price || !quantity || !expiry_date) {
    return res.status(400).send("Missing required fields: product_name, buying_price, quantity, or expiry_date.");
  }

  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    // Insert product into the Products table
    const query = `
      INSERT INTO Products (product_name, category, buying_price, quantity, unit, expiry_date, image)
      VALUES (:product_name, :category, :buying_price, :quantity, :unit, TO_DATE(:expiry_date, 'YYYY-MM-DD'), :image)
    `;
    
    const binds = {
      product_name,
      category,
      buying_price,
      quantity,
      unit,
      expiry_date,
      image
    };

    const result = await connection.execute(query, binds, { autoCommit: true });

    res.status(201).send({ message: 'Product added successfully', result });
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send({ error: 'Failed to add product' });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

// API to fetch product data from the database
app.get('/getProducts', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Query to fetch all data from the Products table
    const result = await connection.execute(
      `SELECT product_name, category, buying_price, quantity, unit, 
              TO_CHAR(expiry_date, 'YYYY-MM-DD') AS expiry_date
       FROM Products`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT } // Return rows as objects
    );

    res.status(200).send(result.rows); // Send the data to the client
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send({ error: 'Failed to fetchproducts' });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

// TOTAL NUMBER OF CATEOGORY FROM PRODUCT
app.get('/product/category/count', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Query to fetch the count of distinct categories from the Products table
    const result = await connection.execute(
      `SELECT COUNT(DISTINCT category) AS no_of_category FROM products`
    );

    // Log the full result to check its structure
    // console.log("Full Query Result:", result);

    // Check if rows are returned and the expected result is in place
    if (result.rows && result.rows.length > 0) {
      // Access the count value directly from result.rows[0][0]
      const categoryCount = result.rows[0][0];  // Access the first row, first column

      // Send the category count in the response
      res.json({ no_of_category: categoryCount });
    } else {
      res.status(404).json({ error: 'No data found' });
    }
  } catch (error) {
    console.error("Error fetching category count:", error);
    res.status(500).json({ error: 'Failed to fetch category count' });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
