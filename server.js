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

const tariffControllerGET = require('./controllers/tariffControllerGET');
const notificationControllerPOST = require('./controllers/notificationControllerPOST');

app.get('/get-tariff', tariffControllerGET.getTariff);
app.post('/post-notification', notificationControllerPOST.postNotification);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});