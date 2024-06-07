const pool = require("../../db");

exports.getSoftware = (req, res) => {
    pool.query('SELECT software_id, software_name, operating_system FROM software ORDER BY software_id', (error, results) => {
        if (error) {
            throw error
        }
        console.log("results: " + results.rows);
        res.status(200).json(results.rows);
    })
}