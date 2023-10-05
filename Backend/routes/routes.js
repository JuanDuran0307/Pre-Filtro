const Router = require('express');
const {MongoClient, ObjectId} = require('mongodb');

const router = Router();

router.get('/usuarios',async(req,res)=>{
    const client = new MongoClient(process.env.DDBB23)
    await client.connect();
    const db =  client.db(`shopJQ`);
    const collection =  db.collection("usuarios");
    const result = await collection.find().toArray();
    res.json(result)
    client.close();    

})

router.post("/post", async (req, res) => {
    try {
        const client = new MongoClient(process.env.DDBB23)
        await client.connect();
        const db =  client.db(`shopJQ`);
        const collection =  db.collection("usuarios");
        const body = req.body;
        const result = await collection.insertOne(body);
        res.json(result);
    } catch (error) {
        console.log(error);
    }   

});

router.delete('/del/:id',async(req,res)=>{
    try {
        const client = new MongoClient(process.env.DDBB23)
        await client.connect();
        const db =  client.db(`shopJQ`);
        const collection =  db.collection("usuarios");
        const userId = req.params.id;
        const existingUser = await collection.findOne ({ _id: new ObjectId(userId) });
        if (!existingUser) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Eliminar el usuario
        await collection.deleteOne({ _id: new ObjectId(userId) });
            res.json("Borrado con exito")
        } catch (error) {
            console.log(error);
        }
})

router.put('/update/:id', async (req, res) => {
    const client = new MongoClient(process.env.DDBB23);
  
    try {
      await client.connect();
      const db = client.db('shopJQ');
      const collection = db.collection('usuarios');
  
      // Obtener el ID del usuario a actualizar desde los parámetros de la URL
      const userId = req.params.id;
  
      // Verificar si el usuario con el ID dado existe
      const existingUser = await collection.findOne({ _id: new ObjectId(userId) });
  
      if (!existingUser) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Obtener los datos actualizados del usuario del cuerpo de la solicitud
      const updatedUserData = req.body;
  
      // Realizar la actualización del usuario en la base de datos
      await collection.updateOne({ _id: new ObjectId(userId) }, { $set: updatedUserData });
  
      res.json({ message: 'Usuario actualizado con éxito' });
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).json({ error: 'Hubo un error al actualizar el usuario' });
    } finally {
      client.close();
    }
  });
  

module.exports = router;

