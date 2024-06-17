const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const db = require('./connection')
const app = express();
const port = 3001;
require('dotenv').config(); 
// Middleware
app.use(bodyParser.json());
app.use(cors());


// Define a route to handle form data submission
app.post('/api/formData', (req, res) => {
    const { formType, name, countryCode, phoneNumber } = req.body;
    const query = 'INSERT INTO form_data (form_type, name, country_code, phone_number) VALUES (?, ?, ?, ?)';

    db.query(query, [formType, name, countryCode, phoneNumber], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(201).json({ message: 'Form data inserted successfully' });
    });
});


// Define a route to fetch form data
app.get('/api/formData', (req, res) => {
    const query = 'SELECT * FROM form_data';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(200).json(results);
    });
});




// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${port}`);
});
