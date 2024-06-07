const pool = require("../../db.js");

exports.getOrderPrice = async (req, res) => {
    const tariffID = req.query.tariffID;
    let orderPrice;

    if (tariffID === '1') {
        orderPrice = 150;
    } else if (tariffID === '2') {
        orderPrice = 160;
    } else if (tariffID === '3') {
        orderPrice = 200;
    } else if (tariffID === '4') {
        orderPrice = 180;
    } else if (tariffID === '5') {
        orderPrice = 450;
    } else if (tariffID === '6') {
        orderPrice = 50;
    }

    res.json(orderPrice);
};