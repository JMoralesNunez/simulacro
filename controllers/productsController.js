const db = require('../database/db.js');

class ProductController{
    constructor(){

    }
    get(req, res){
        try {
            db.query(`SELECT * FROM products ORDER BY idproduct;`,
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
            db.query(`SELECT * FROM products WHERE idproduct = ?;`,
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
            db.query(`INSERT INTO products
                    (product_name)
                    VALUES(?);`,
                [name], 
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
            const { name } = req.body;
            db.query(`UPDATE products SET
                        product_name=?
                        WHERE idproduct=?;`,
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
            db.query(`DELETE FROM products WHERE idproduct=?;`,
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

module.exports = new ProductController();