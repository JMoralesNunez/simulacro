const db = require('../database/db.js');

class SellerController{
    constructor(){

    }
    get(req, res){
        try {
            db.query(`SELECT * FROM sellers ORDER BY idseller;`,
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
            db.query(`SELECT * FROM sellers WHERE idseller = ?;`,
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
            const { name } = req.body;
            db.query(`INSERT INTO sellers
                    (seller_name)
                    VALUES(?);`,
                [name], 
            (err, rows)=>{
                if (err) {
                    throw err.message
                } else {
                    res.json({ message: 'Vendedor agregado correctamente', data: rows });
                }
            })
        } catch (error) {
            throw error
        }
    }
    update(req, res) {
        const { id } = req.params;
        try {
            const { name } = req.body;
            db.query(`UPDATE sellers SET
                        seller_name=?
                        WHERE idseller=?;`,
                        [name, id],
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
            db.query(`DELETE FROM sellers WHERE idseller=?;`,
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

module.exports = new SellerController();