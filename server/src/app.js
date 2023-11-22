const express = require('express');
const cors = require('cors');
const livrosRouter = require('./Routes/Livros.routes');

const app = express();

//security
app.use(cors());

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Routes
app.use('/', livrosRouter);
// app.use('/auth', authRouter);
// app.use('/pet', petRouter);

module.exports = app;