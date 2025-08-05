const db = require('../database/db.js');

class ReceiptController{
    constructor(){

    }
    get(req, res){
        try {
            db.query(`SELECT * FROM receipts;`,
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