const db = require('../database/db.js');

class ReceiptController {
    constructor() {

    }
    get(req, res) {
        try {
            db.query(`SELECT idreceipt, DATE_FORMAT(receipts.date, '%Y-%m-%d') AS date, receipts.total, sellers.seller_name, clients.client_name from receipts 
                    JOIN sellers on sellers.idseller = receipts.idseller
                    JOIN clients on clients.idclient = receipts.idclient 
                    ORDER BY idreceipt`,
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
            db.query(`SELECT idreceipt, DATE_FORMAT(receipts.date, '%Y-%m-%d') AS date, total, idseller, idclient from receipts
                    WHERE idreceipt = ?;`,
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
    post(req, res) {
        try {
            const { date, total, idseller, idclient } = req.body;
            db.query(`INSERT INTO receipts
                    (date, total, idseller, idclient)
                    VALUES(?, ?, ?, ?);`,
                [date, total, idseller, idclient],
                (err, rows) => {
                    if (err) {
                        throw err.message
                    } else {
                        res.json({ message: 'Factura agregada correctamente', data: rows });
                    }
                })
        } catch (error) {
            throw error
        }
    }
    update(req, res) {
        const { id } = req.params;
        try {
            const { date, total, idseller, idclient } = req.body;
            db.query(`UPDATE receipts SET
                        date=?,
                        total=?,
                        idseller=?,
                        idclient=?
                        WHERE idreceipt=?;`,
                [date, total, idseller, idclient, id],
                (err, data) => {
                    if (err) {
                        throw err
                    } else {
                        res.json(data)
                    }
                })
        } catch (error) {
            throw error
        }
    }
    delete(req, res) {
        const { id } = req.params;
        try {
            db.query(`DELETE FROM receipts WHERE idreceipt=?;`,
                [id],
                (err, data) => {
                    if (err) {
                        throw err
                    } else {
                        res.json(data)
                    }
                })
        } catch (error) {
            throw error
        }
    }
}

module.exports = new ReceiptController();