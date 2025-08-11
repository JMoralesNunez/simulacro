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
    post(req, res) {
        try {
            const { quantity, idproduct, idreceipt } = req.body;
            db.query(`INSERT INTO purchases_details
                    (quantity, idproduct, idreceipt)
                    VALUES(?, ?, ?);`,
                [quantity, idproduct, idreceipt], 
            (err, rows)=>{
                if (err) {
                    throw err.message
                } else {
                    res.json({ message: 'Producto agregado correctamente', data: rows });
                }
            })
        } catch (error) {
            throw error
        }
    }
    update(req, res) {
        const { id } = req.params;
        try {
            const { quantity, idproduct, idreceipt } = req.body;
            db.query(`UPDATE purchases_details SET
                        quantity=?,
                        idproduct=?,
                        idreceipt=?
                        WHERE id_purchase=?;`,
                        [quantity, idproduct, idreceipt, id],
                        (err, data)=>{
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
            db.query(`DELETE FROM purchases_details WHERE id_purchase=?;`,
                        [id],
                        (err, data)=>{
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

module.exports = new PurchaseController();