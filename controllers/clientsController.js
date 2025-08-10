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
}

module.exports = new ClientController();