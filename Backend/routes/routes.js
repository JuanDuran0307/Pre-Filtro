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

router.delete('/delProductos/:id',async(req,res)=>{
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

  router.post('/login', async (req, res) => {

    const client = new MongoClient(process.env.DDBB23);
  
    const db = client.db('shopJQ');
    const usuarios = db.collection('usuarios');
    const { email, password } = req.body;
  
    const usuario = await usuarios.findOne({ email, password });
  
    if (usuario) {
      // Las credenciales son válidas, puedes devolver una respuesta de éxito
      res.json({ message: 'Autenticación exitosa' });
    } else {
      // Las credenciales no son válidas, puedes devolver un mensaje de error
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  });










  router.get('/get-productos', async(req, res) =>{
   
    const client = new MongoClient(process.env.DDBB23);
    const db = client.db('shopJQ');
    const productos = db.collection('productos');
    const result = await productos.find().toArray();

  if (result) {
    res.json({ result });
  } else {
    res.json({ mensaje: "No hay productos" });
  }

  });
  router.get('/get-productos-carrito', async(req, res) =>{
   
    const client = new MongoClient(process.env.DDBB23);
    const db = client.db('shopJQ');
    const productos = db.collection('carrito');
    const result = await productos.find().toArray();

  if (result) {
    res.json({ result });
  } else {
    res.json({ mensaje: "No hay productos" });
  }

  });
  //Este endpoint es para agregar productos al carrito
router.post('/add-productos-carrito', async (req, res) => {
  const client = new MongoClient(process.env.DDBB23);
  const db = client.db('shopJQ');
  const productos = db.collection('productos');
  const carro = db.collection('carrito');
  const { nombre, imagen, precio } = req.body;

  // Verificar si el producto ya está en el carrito
  const estaEnProducts = await productos.findOne({ nombre });

  /* Nos fijamos si todos los campos vienen con info */
  const noEstaVacio = nombre !== "" && imagen !== "" && precio !== "";

  /* Nos fijamos si el producto ya esta en el carrito */
  const estaEnElCarrito = await carro.findOne({ nombre });

  /* Si no tenemos el producto */
  if (!estaEnProducts) {
    res.status(400).json({
      mensaje: "Este producto no se encuentra en nuestra base de datos",
    });

    /* Si nos envían algo y no está en el carrito, lo agregamos */
  } else if (noEstaVacio && !estaEnElCarrito) {
    const newProductInCart = {
      nombre,
      imagen,
      precio,
      stock: 1,
    };

    await carro.insertOne(newProductInCart).then(() => {
      /* Y actualizamos la prop inCart: true en nuestros productos */
      productos
        .updateOne(
          { _id: estaEnProducts._id },
          { $set: { inCart: true } }
        )
        .then(() => {
          res.json({
            mensaje: `El producto fue agregado al carrito`,
            product: newProductInCart,
          });
        })
        .catch((error) => console.error(error));
    });

    /* Y si está en el carrito avisamos */
  } else if (estaEnElCarrito) {
    res.status(400).json({
      mensaje: "El producto ya está en el carrito",
    });
  }
});

  
router.delete('/delProductos/:id',async(req,res)=>{
  try {
      const client = new MongoClient(process.env.DDBB23)
      await client.connect();
      const db =  client.db(`shopJQ`);
      const collection =  db.collection("carrito");
      const productId = req.params.id;
      const existingUser = await collection.findOne ({ _id: new ObjectId(productId) });
      if (!existingUser) {
      return res.status(404).json({ error: 'Articulo no encontrado' });
      }

      // Eliminar el producto
      await collection.deleteOne({ _id: new ObjectId(productId) });
          res.json("Borrado con exito")
      } catch (error) {
          console.log(error);
      }
})
router.put('/updateProductoCarrito/:id', async (req, res) => {
  const client = new MongoClient(process.env.DDBB23);

  try {
    await client.connect();
    const db = client.db('shopJQ');
    const collection = db.collection('carrito');

    // Obtener el ID del producto a actualizar desde los parámetros de la URL
    const productId = req.params.id;

    // Verificar si el producto con el ID dado existe
    const existingUser = await collection.findOne({ _id: new ObjectId(productId) });

    if (!existingUser) {
      return res.status(404).json({ error: 'producto no encontrado' });
    }

    // Obtener los datos actualizados del producto del cuerpo de la solicitud
    const updatedUserData = req.body;

    // Realizar la actualización del producto en la base de datos
    await collection.updateOne({ _id: new ObjectId(productId) }, { $set: updatedUserData });

    res.json({ message: 'producto actualizado con éxito' });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Hubo un error al actualizar el producto' });
  } finally {
    client.close();
  }
});



  

module.exports = router;

