const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const dbConfig = require('./dbConfig'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

    const [dbEmail, dbPassword, role] = result.rows[0]; // Extract email and password from the query result
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
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
