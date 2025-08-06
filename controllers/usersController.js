const db = require('../database/db.js');

class UserController{
    constructor(){

    }
    get(req, res){
        try {
            db.query(`SELECT * FROM users;`,
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
            db.query(`SELECT * FROM clients WHERE id_client = ?;`,
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
            const { name, email, password } = req.body;
            db.query(`INSERT INTO users
                    (name, email, password)
                    VALUES(?, ?, ?);`,
                [name, email, password], 
            (err, data)=>{
                if (err) {
                    throw err.message
                } else {
                    res.json({ message: 'Usuario agregado correctamente', data: data });
                }
            })
        } catch (error) {
            throw error
        }
    }
}

module.exports = new UserController();