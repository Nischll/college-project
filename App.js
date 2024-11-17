const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const dbConfig = require('./dbConfig'); 
const bcrypt = require('bcrypt');

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
