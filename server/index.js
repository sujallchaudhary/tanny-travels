require('dotenv').config();

const connection = require('./database/connection');
const express = require('express');
const cors = require('cors');

const iterateRoute = require('./routes/iterateRoute');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/iterate', iterateRoute);

connection();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});