const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDb = require('../config/connectDb');
require('colors');
const errorHandler = require('./middlewares/errorHandler');

const configPath = path.join(__dirname, '..', 'config', '.env');
dotenv.config({ path: configPath });

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/v1', require('./routes/postsRoutes'));

app.use(errorHandler);

const { PORT } = process.env;
connectDb();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.green.bold.italic);
});
