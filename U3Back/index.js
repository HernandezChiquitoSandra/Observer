const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const biblioRoute = require('./src/routes/biblioRoute');
const app = express();
const port = process.env.PORT || 9000;
const cors = require("cors");

const corsOptions = {
    origin: 'http://localhost:4200', // Reemplaza esto con la URL de tu aplicación Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  
console.log('Before CORS middleware');
app.use(cors(corsOptions));
console.log('After CORS middleware');
app.use(express.json());
app.use('/api/', biblioRoute);

// mongodb connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlass'))
    .catch((error) => console.error(error));

app.listen(port, () => console.log('Server listening on port',port));