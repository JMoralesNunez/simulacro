const express = require('express');
const cors = require('cors');
const app = express();
const clientRoutes = require('./routes/clientRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const sellerRoutes = require('./routes/sellerRoutes.js');
const receiptRoutes = require('./routes/receiptRoutes.js');
const purchaseRoutes = require('./routes/purchaseRoutes');
const userRoutes = require('./routes/userRoutes.js');

//const { cargarClientes } = require('./loaders.js');


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
app.use('/usuarios', userRoutes);




    app.listen(5000, () => {
        console.log("corriendo en servidor: http://localhost:5000/");
    })
