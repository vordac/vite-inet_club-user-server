const pool = require("../db");

exports.postNotification = (req, res) => {
    const phone = req.body.phone;
    const date = new Date(Date.now());
    const status = "Нове";

    pool.query('INSERT INTO service.notification (phone, date, status) values($1, $2, $3) ',
        [
            phone,
            date,
            status
        ],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        });
};