const pool = require("../../db");

exports.getTariff = (req, res) => {
    pool.query('SELECT tariff_id, tariff_name, tariff_cost FROM tariff ORDER BY tariff_id', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows);
    })
}