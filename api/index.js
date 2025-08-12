const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const validateForm = require('../helper/signup');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})

// Root endpoint to confirm backend is deployed
app.get('/', (req, res) => {
    res.status(200).json({ status: "Backend is running" });
});

app.post('/signup', async (req, res) => {
    const dob = new Date(req.body.DOB); // Convert DOB to a JavaScript Date object
    console.log("DOB:", dob);

    const sql = "INSERT INTO login (`Username`, `FirstName`, `LastName`, `EmailID`, `Password`, `ContactNumber`, `DOB`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.Username,
        req.body.FirstName,
        req.body.LastName,
        req.body.EmailID,
        req.body.Password,
        req.body.ContactNumber,
        dob // Use the JavaScript Date object here
    ];

    let store = await validateForm(req.body);
    console.log('store', store);

    if (!store) {
        return res.status(401).send({ error: 'Invalid Data' });
    }

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error inserting data' });
        }
        return res.status(200).json(data);
    });
});


app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `EmailID` = ? AND `ContactNumber` = ? AND `Password` = ?";
    db.query(sql, [req.body.EmailID, req.body.ContactNumber, req.body.Password], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            console.log("data", data);
            return res.json("Success");
        } else {
            return res.json("Failed");
        }

    })

})


app.listen(8081, () => {
    console.log("Server is running on port 8081");
})
