// Configuración del servidor
const ENV = require('dotenv');
const express = require('express');
const cors = require('cors');
const Routes = require('./routes');
const { configDotenv } = require('dotenv');

const server = express();

const port = process.env.PORT || 3000 ;
server.use(cors({
    origin : '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
server.use(express.json());
server.use('/api/v1', Routes);

server.listen(port, () => {
    console.log(`La API se encuentra escuchando en el puerto ${port}`)
});
/**
 * una forma de hacerlo
 * const Routes = require('./routes');
server.use('/clients',Routes.ClientRoutes);
server.use('/products',Routes.ProductoRoutes);
server.use('/sales',Routes.SaleRoutes);
 */
