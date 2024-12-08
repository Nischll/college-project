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
  const { username, name, password } = req.body;

  let connection;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `INSERT INTO signup_details (username, name, password)
       VALUES (:username, :name, :password)`,
      { username, name, password:hashedPassword }, 
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

// app.get('/signup/get/details', async (req, res) => {
//   let connection;

//   try {
//     connection = await oracledb.getConnection(dbConfig);

//     // Query to fetch all users from the signup_details table
//     const result = await connection.execute(
//       `SELECT username, name, password, role FROM signup_details`,
//       [], // No parameters needed in the query
//       { outFormat: oracledb.OUT_FORMAT_OBJECT }  // To get results as objects
//     );

//     // If no users found, send an appropriate message
//     if (result.rows.length === 0) {
//       return res.status(404).send({ message: 'No users found' });
//     }

//     // Respond with the fetched data
//     res.status(200).send(result.rows);
//   } catch (err) {
//     console.error('Error executing query:', err);
//     res.status(500).send({ error: 'Failed to retrieve users' });
//   } finally {
//     if (connection) {
//       await connection.close();
//     }
//   }
// });


// API to get all admins
app.get('/signup/get/admins', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Query to fetch users with role 'admin'
    const result = await connection.execute(
      `SELECT id, username, name, password, role FROM signup_details WHERE role = 'admin'`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    // Check if admins are found
    if (result.rows.length === 0) {
      return res.status(404).send({ message: 'No admins found' });
    }

    // Respond with the fetched data
    res.status(200).send(result.rows);
  } catch (err) {
    console.error('Error executing query for admins:', err);
    res.status(500).send({ error: 'Failed to retrieve admins' });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

// API to get all users
app.get('/signup/get/users', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Query to fetch users with role 'user'
    const result = await connection.execute(
      `SELECT id, username, name, password, role FROM signup_details WHERE role = 'user'`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    // Check if users are found
    if (result.rows.length === 0) {
      return res.status(404).send({ message: 'No users found' });
    }

    // Respond with the fetched data
    res.status(200).send(result.rows);
  } catch (err) {
    console.error('Error executing query for users:', err);
    res.status(500).send({ error: 'Failed to retrieve users' });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});

// GET SPECIFIC DETAILS FROM SIGNUP TABLE
app.get('/signup/get/:id', async (req, res) => {
  const { id } = req.params; // Extract id from the URL
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Query to fetch a specific user by id
    const result = await connection.execute(
      `SELECT id, username, name, password, role FROM signup_details WHERE id = :id`,
      { id },
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    // Check if user is found
    if (result.rows.length === 0) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Respond with the fetched data
    res.status(200).send(result.rows[0]); // Send only the first matching user
  } catch (err) {
    console.error('Error executing query for user:', err);
    res.status(500).send({ error: 'Failed to retrieve user details' });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});


// UPDATE SIGNUP TABLE
app.put('/signup/update/:id', async (req, res) => {
  const { id } = req.params; // Extract id from the URL
  const { username, name, password, role } = req.body; // Get new values from the request body
  let connection;

  try {
    // Optionally hash password if it's being updated
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    connection = await oracledb.getConnection(dbConfig);

    // Update query to change user details based on id
    const result = await connection.execute(
      `UPDATE signup_details SET username = :username, name = :name, password = :password, role = :role WHERE id = :id`,
      {
        username,
        name,
        password: hashedPassword || password, // If password is not updated, use the old one
        role,
        id
      },
      { autoCommit: true }
    );

    // Check if the update was successful
    if (result.rowsAffected === 0) {
      return res.status(404).send({ message: 'User not found or no changes made' });
    }

    // Respond with a success message
    res.status(200).send({ message: 'User details updated successfully' });
  } catch (err) {
    console.error('Error executing update query:', err);
    res.status(500).send({ error: 'Failed to update user details' });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
});




// Login API
app.post('/login', async (req, res) => {

  const { username, password } = req.body;

  let connection;

  try {

    connection = await oracledb.getConnection(dbConfig);

    // Query to find user by username
    const result = await connection.execute(
      `SELECT username, password, role FROM signup_details WHERE username = :username`,
      { username }
    );
    // console.log('Database query result:', result.rows);

    if (result.rows.length === 0) {
      // User not found
      return res.status(404).send({ error: 'User not found' });
    }

    const [dbusername, dbPassword, role] = result.rows[0]; 
    // console.log('username:', dbusername, 'Password:', dbPassword, 'Role:', role);

    // Compare entered password with hashed password
    const isPasswordMatch = await bcrypt.compare(password, dbPassword);

    if (!isPasswordMatch) {
      return res.status(401).send({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ username: dbusername }, JWT_SECRET, { expiresIn: '1h' });

    // Success: Send response (or generate JWT here if needed)
    res.status(200).send({ 
      message: 'Login successful', 
      token,
      user: {username: dbusername, role}
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
              TO_CHAR(expiry_date, 'YYYY/MM/DD') AS expiry_date
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

// TOTAL NUMBER OF PRODUCTS
app.get('/product/count', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Query to fetch the count of distinct categories from the Products table
    const result = await connection.execute(
      `SELECT COUNT(*) AS no_of_product FROM products`
    );

    // Check if rows are returned and the expected result is in place
    if (result.rows && result.rows.length > 0) {
      // Access the count value directly from result.rows[0][0]
      const productCount = result.rows[0][0];  // Access the first row, first column

      // Send the category count in the response
      res.json({ no_of_product: productCount });
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

// TOTAL AMOUNT OF ALL AVAILABLE PRODUCTS
app.get('/product/amount', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Query to fetch the count of distinct categories from the Products table
    const result = await connection.execute(
      `SELECT SUM(quantity * buying_price) AS total_amount FROM Products`
    );

    // Check if rows are returned and the expected result is in place
    if (result.rows && result.rows.length > 0) {
      // Access the count value directly from result.rows[0][0]
      const productAmount = result.rows[0][0];  // Access the first row, first column

      // Send the category count in the response
      res.json({ total_product_amount: productAmount });
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

// TOTAL NUMBER OF LOW STOCKS
app.get('/product/stocks/low', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Query to fetch the count of distinct categories from the Products table
    const result = await connection.execute(
      `SELECT COUNT(*) AS low_stock_count FROM products WHERE quantity <= 10`
    );

    // Check if rows are returned and the expected result is in place
    if (result.rows && result.rows.length > 0) {
      // Access the count value directly from result.rows[0][0]
      const lowStocks = result.rows[0][0];  // Access the first row, first column

      // Send the category count in the response
      res.json({ total_low_stocks: lowStocks });
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
