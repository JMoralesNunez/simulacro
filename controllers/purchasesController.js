const db = require('../database/db.js');

class PurchaseController{
    constructor(){

    }
    get(req, res){
        try {
            db.query(`SELECT * FROM purchases_details;`,
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
            db.query(`SELECT * FROM purchases_details WHERE id_purchase = ?;`,
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

module.exports = new PurchaseController();