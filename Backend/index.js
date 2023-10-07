const express = require ('express');
const {MongoClient} = require('mongodb');
require('dotenv').config();
const routerMain = require('./routes/routes.js');
const cors = require ('cors');
const app = express();



const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger/config.js')
app.use('/shop-swagger', swaggerUi.serve, swaggerUi.setup(specs));



  app.use(cors());



app.use(express.json());
app.use('/shop', routerMain)

const port = process.env.PORT;
const database = async ()=>{
    const url = process.env.DDBB23;
    const db = new MongoClient(url);
    await db.connect();
    console.log('Db online :', url);

}

app.listen(port,async()=>{
    database();
    console.log('Servidor Corriendo el port:', port);

})
module.exports = database;