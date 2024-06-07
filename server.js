const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
require('dotenv').config({ path: './config.env' });
const app = express();
const pool = require("./db");
const sessionSecret = process.env.SESSION_SECRET || 'my-secret-key';
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

pool.connect((err, client, done) => {
    if (err) {
        console.log('PostgreSQL connection failed: ', err);
    } else {
        console.log('PostgreSQL connection successful');
        done();
    }
});

dotenv.config();

// GET controllers
const getComputerController = require('./controllers/get/getComputerController.js');
const getConsoleController = require('./controllers/get/getConsoleController.js');
const getSoftwareController = require('./controllers/get/getSoftwareController.js');
const getTariffController = require('./controllers/get/getTariffController.js');

// POST controllers
const postSignInController = require('./controllers/post/postSignInController');
const postSignUpController = require('./controllers/post/postSignUpController');
const postReservationController = require('./controllers/post/postReservationController.js');
const getOrderPriceController = require('./controllers/get/getOrderPriceController.js')

// GET endpoints
app.get('/get-computer', getComputerController.getComputer);
app.get('/get-console', getConsoleController.getConsole);
app.get('/get-software', getSoftwareController.getSoftware);
app.get('/get-tariff', getTariffController.getTariff);
app.get('/get-order-price', getOrderPriceController.getOrderPrice);

// POST endpoints
app.post('/post-sign-in', postSignInController.postSignIn);
app.post('/post-sign-up', postSignUpController.postSignUp);
app.post('/post-reservation', postReservationController.postReservation);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});