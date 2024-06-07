const pool = require("../../db.js");

exports.postSignIn = async (req, res) => {
    const { client_p_i_b, client_mobile_number, client_email } = req.body;

    try {
        const client = await pool.query(
            'SELECT * FROM client WHERE (client_p_i_b = $1 OR client_mobile_number = $2 OR client_email = $3)',
            [client_p_i_b, client_mobile_number, client_email]
        );

        if (client.rows.length === 0) {
            return res.json({ error: 'User not found' });
        }

        res.json({ clientID: client.rows[0].client_id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
