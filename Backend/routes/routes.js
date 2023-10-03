const Router = require('express');
const {MongoClient} = require('mongodb');

const router = Router();

router.get('/',async(req,res)=>{
    const client = new MongoClient(process.env.DDBB23)
    const db =  client.db(`jqshop`);
    const collection =  db.collection("usuarios");
    const result = await collection.find().toArray();
    res.json(result)
    client.close();    

})

module.exports = router;

