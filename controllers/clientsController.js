const db = require('../database/db.js');

class ClientController{
    constructor(){

    }
    get(req, res){
        try {
            db.query(`SELECT * FROM clients;`,
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
            db.query(`SELECT * FROM clients WHERE idclient = ?;`,
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
            const { name, phone, school } = req.body;
            db.query(`INSERT INTO clients
                    (client_name, phone, school)
                    VALUES(?, ?, ?);`,
                [name, phone, school], 
            (err, rows)=>{
                if (err) {
                    throw err.message
                } else {
                    res.json({ message: 'Cliente agregado correctamente', data: rows });
                }
            })
        } catch (error) {
            throw error
        }
    }
    update(req, res) {
        const { id } = req.params;
        try {
            const { name, phone, school } = req.body;
            db.query(`UPDATE clients SET
                        client_name=?,
                        phone=?,
                        school=?
                        WHERE idclient=?;`,
                        [name, phone, school, id],
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
            db.query(`DELETE FROM clients WHERE idclient=?;`,
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

module.exports = new ClientController();