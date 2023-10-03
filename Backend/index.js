const express = require ('express');
const {MongoClient} = require('mongodb');
require('dotenv').config();
/* const routerMain = require('./routes/routes.js'); */
const app = express();


const port = process.env.PORT;
app.use(express.json());

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