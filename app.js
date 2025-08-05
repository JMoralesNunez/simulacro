const express = require('express');
const cors = require('cors');
const app = express();
const clientRoutes = require('./routes/clientRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const sellerRoutes = require('./routes/sellerRoutes.js');
const receiptRoutes = require('./routes/receiptRoutes.js');
const purchaseRoutes = require('./routes/purchaseRoutes');


//Para cargar el csv al db
const db = require('./database/dbAsync.js');
const fs = require('fs');
const csv = require('csv-parser');


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json('Todo funcionando')
})

app.use('/clientes', clientRoutes);
app.use('/productos', productRoutes);
app.use('/vendedores', sellerRoutes);
app.use('/facturas', receiptRoutes);
app.use('/compras', purchaseRoutes);


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
                    INSERT INTO dbventas.clients
                    (idclient, phone, school, client_name)
                    VALUES(?, ?, ?, ?);
                `;
                    const values = [
                        parseInt(cliente.id),
                        cliente.colegio,
                        cliente.telefono,
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
                    INSERT INTO dbventas.products
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
                    INSERT INTO dbventas.sellers
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
        fs.createReadStream('./csv/sellers.csv')
            .pipe(csv())
            .on('data', (data) => {
                facturas.push(data);
            })
            .on('end', async () => {
                for (const factura of facturas) {
                    const query = `
                    INSERT INTO dbventas.receipts
                    (idreceipt, date, )
                    VALUES(?, ?);
                `;
                    const values = [
                        parseInt(factura.id),
                        factura.nombre
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

// cargarClientes();
// cargarProductos();
cargarVendedores()

app.listen(3000, () => {
    console.log("corriendo en servidor: http://localhost:3000/");
})
