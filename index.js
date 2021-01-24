const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const clientsRoute = require('./api/clients/clientsRoute');
const productsRoute = require('./api/products/productsRoute');
const ordersRoute = require('./api/orders/ordersRoute');
const numOrderRoute = require('./api/numOrder/numOrderRoute');
const authRoute = require('./api/users/authRoute');
const userRoute = require('./api/users/userRoute');

require('dotenv').config();

const PORT = process.env.PORT || 2100;
const uriDb = process.env.URI_DB;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', clientsRoute);
app.use('/', productsRoute);
app.use('/', ordersRoute);
app.use('/', numOrderRoute);
app.use('/', authRoute);
app.use('/', userRoute);

app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /clients , /products , /orders',
    data: 'Not found',
  });

  next();
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  });

  next();
});

const connection = mongoose.connect(uriDb, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  dbName: 'smag',
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', err => {
  console.log(`Mongoose connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected to DB');
});

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(err =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
