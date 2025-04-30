const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

console.log("Starting server...");

app.use(express.json());
app.use(cors());

// MySQL database connection pool
const db = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'earist'
});

// Test database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the database');
        connection.release(); // release connection after checking
    }
});

// Example API endpoint
app.get('/api/data', (req, res) => {
    const query = "SELECT * FROM certificate_of_registration";
    db.query(query, (err, results) => {
        if (err) {
            console.error('Query error:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🌐 Server is running on http://localhost:${PORT}`);
});
