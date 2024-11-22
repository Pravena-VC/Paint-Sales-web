const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const cors = require('cors'); 
const app = express(); 
app.use(cors()); 

const port = 3000;

app.use(bodyParser.json());

// Connect to MySQL database (assuming XAMPP is running locally)
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'paint_sales',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});



app.post('/addToCart', async (req, res) => {
    const { paintColor, quantity } = req.body;

    const insertQuery = 'INSERT INTO paint_orders (color, quantity) VALUES (?, ?)';
    connection.query(insertQuery, [paintColor, quantity], (err) => {
        if (err) {
            console.error('Error adding to cart:', err);
            res.status(500).json({ success: false, message: 'Failed to add item to cart.' });
        } else {
            res.json({ success: true, message: `Added to cart: ${quantity} gallon(s) of ${paintColor} paint.` });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
