const pool = require("../db");

exports.getTariff = (req, res) => {
    pool.query('SELECT id_tariff, name_tariff, price_tariff from service.tariff ORDER BY id_tariff', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows);
    })
}