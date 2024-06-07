const pool = require("../../db");

exports.getConsole = (req, res) => {
    pool.query('SELECT console_id, console_workspace_id, console_type, console_status FROM console ORDER BY console_id', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows);
    })
}