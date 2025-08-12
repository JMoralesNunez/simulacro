//Para cargar el csv al db
const db = require('./database/dbAsync.js');
const fs = require('fs');
const csv = require('csv-parser');


async function cargarClientes() {
    try {
        // await db.connect();

        const clientes = [];
        fs.createReadStream('./csv/clients.csv')
            .pipe(csv())
            .on('data', (data) => {
                clientes.push(data);
            })
            .on('end', async () => {
                for (const cliente of clientes) {
                    const query = `
                    INSERT INTO clients
                    (phone, school, client_name)
                    VALUES(?, ?, ?);
                `;
                    const values = [
                        cliente.telefono,
                        cliente.colegio,
                        cliente.nombre
                    ];
                    await db.query(query, values);
                }

                console.log(' clientes cargados exitosamente.');
                // await db.end();
            });

    } catch (err) {
        console.error('Error cargando clientes:', err);
        // await db.end();
    }
}
async function cargarProductos() {
    try {
        // await db.connect();

        const productos = [];
        fs.createReadStream('./csv/products.csv')
            .pipe(csv())
            .on('data', (data) => {
                productos.push(data);
            })
            .on('end', async () => {
                for (const producto of productos) {
                    const query = `
                    INSERT INTO products
                    (idproduct, product_name)
                    VALUES(?, ?);
                `;
                    const values = [
                        parseInt(producto.id),
                        producto.Producto
                    ];
                    await db.query(query, values);
                }

                console.log(' productos cargados exitosamente.');
                // await db.end();
            });

    } catch (err) {
        console.error('Error cargando productos:', err);
        // await db.end();
    }
}
async function cargarVendedores() {
    try {
        // await db.connect();

        const vendedores = [];
        fs.createReadStream('./csv/sellers.csv')
            .pipe(csv())
            .on('data', (data) => {
                vendedores.push(data);
            })
            .on('end', async () => {
                for (const vendedor of vendedores) {
                    const query = `
                    INSERT INTO sellers
                    (idseller, seller_name)
                    VALUES(?, ?);
                `;
                    const values = [
                        parseInt(vendedor.id),
                        vendedor.nombre
                    ];
                    await db.query(query, values);
                }

                console.log(' vendedores cargados exitosamente.');
                // await db.end();
            });

    } catch (err) {
        console.error('Error cargando vendedores:', err);
        // await db.end();
    }
}
async function cargarFacturas() {
    try {
        // await db.connect();

        const facturas = [];
        fs.createReadStream('./csv/receipts.csv')
            .pipe(csv())
            .on('data', (data) => {
                facturas.push(data);
            })
            .on('end', async () => {
                for (const factura of facturas) {
                    const query = `
                    INSERT INTO receipts
                    (idreceipt, date, total, idseller, idclient)
                    VALUES(?, ?, ?, ?, ?);
                `;
                    const values = [
                        parseInt(factura.id),
                        factura.date,
                        factura.total,
                        factura.idseller,
                        factura.idclient
                    ];
                    await db.query(query, values);
                }

                console.log(' facturas cargados exitosamente.');
                // await db.end();
            });

    } catch (err) {
        console.error('Error cargando facturas:', err);
        // await db.end();
    }
}
async function cargarCompras() {
    try {
        // await db.connect();
        const compras = [];
        fs.createReadStream('./csv/purchases_details.csv')
            .pipe(csv())
            .on('data', (data) => {
                compras.push(data);
            })
            .on('end', async () => {
                for (const compra of compras) {
                    const query = `
                    INSERT INTO purchases_details
                    (id_purchase, quantity, idproduct, idreceipt)
                    VALUES(?, ?, ?, ?);
                `;
                    const values = [
                        parseInt(compra.id),
                        compra.quantity,
                        compra.id_product,
                        compra.id_receipt
                    ];
                    await db.query(query, values);
                }
                console.log(' compras cargados exitosamente.');
                // await db.end();
            });
    } catch (err) {
        console.error('Error cargando compras:', err);
        // await db.end();
    }
}

module.exports = {
    cargarClientes,
    cargarProductos,
    cargarVendedores,
    cargarFacturas,
    cargarCompras
};