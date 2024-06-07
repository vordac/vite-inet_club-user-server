const pool = require("../../db.js");

exports.postSignUp = async (req, res) => {
    const { client_p_i_b, client_mobile_number, client_email } = req.body;

    try {
        const checkMobileNumberExistence = await pool.query(
            'SELECT * FROM client WHERE client_mobile_number = $1',
            [client_mobile_number]
        );

        const checkEmailExistence = await pool.query(
            'SELECT * FROM client WHERE client_email = $1',
            [client_email]
        );

        if (checkMobileNumberExistence.rows.length > 0) {
            return res.json({ error: 'Mobile number already exists' });
        }

        if (checkEmailExistence.rows.length > 0) {
            return res.json({ error: 'Email already exists' });
        }

        const newClient = await pool.query(
            'INSERT INTO client (client_p_i_b, client_mobile_number, client_email) VALUES ($1, $2, $3) RETURNING *',
            [client_p_i_b, client_mobile_number, client_email]
        );

        res.json({ clientID: newClient.rows[0].client_id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};