const pool = require("../../db");

exports.getComputer = (req, res) => {
    pool.query('SELECT hardware_id, workspace_id, processor, motherboard, hdd, ssd, graphics_card, power_supply, ram, cooling FROM pc_hardware', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows);
    })
}
