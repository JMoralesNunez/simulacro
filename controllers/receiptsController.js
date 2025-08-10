const db = require('../database/db.js');

class ReceiptController {
    constructor() {

    }
    get(req, res) {
        try {
            db.query(`SELECT idreceipt, DATE_FORMAT(receipts.date, '%Y-%m-%d') AS date, receipts.total, sellers.seller_name, clients.client_name from receipts 
                    JOIN sellers on sellers.idseller = receipts.idseller
                    JOIN clients on clients.idclient = receipts.idclient `,
                (err, response) => {
                    if (err) {
                        throw err
                    } else {
                        res.json(response)
                    }
                }
            )
        } catch (error) {
            throw error
        }
    }
    getDetails(req, res) {
        const { id } = req.params;
        try {
            db.query(`SELECT * FROM receipts WHERE idreceipt = ?;`,
                [id],
                (err, response) => {
                    if (err) {
                        throw err
                    } else {
                        res.json(response)
                    }
                }
            )
        } catch (error) {
            throw error
        }
    }
}

module.exports = new ReceiptController();