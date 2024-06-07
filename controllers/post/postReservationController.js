const pool = require("../../db.js");

exports.postReservation = (req, res) => {
    const {
        tariffID,
        paymentType,
        orderTime,
        workspaceId,
        orderStatus,
        orderPrice,
        orderType,
        orderHours,
        employeeID,
        clientID,
        orderForm
    } = req.body;


    pool.query(
        'INSERT INTO reservation(id_tariff, payment_type, order_time, workspace_id, order_status, order_price, order_type, order_hours, employee_id, client_id, order_form) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
        [
            tariffID,
            paymentType,
            orderTime,
            workspaceId,
            orderStatus,
            orderPrice,
            orderType,
            orderHours,
            employeeID,
            clientID,
            orderForm
        ],
        (error, results) => {
            if (error) {
                throw error;
            }
            console.log("results: " + results.rows);
            res.status(200).json(results.rows);
        }
    );
};