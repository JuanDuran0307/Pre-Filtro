const Router = require('express');
const {MongoClient, ObjectId} = require('mongodb');

const router = Router();

router.get('/getUsuarios',async(req,res)=>{
    const client = new MongoClient(process.env.DDBB23)
    await client.connect();
    const db =  client.db(`shopJQ`);
    const collection =  db.collection("usuarios");
    const result = await collection.find().toArray();
    res.json(result)
    client.close();    

})

router.post("/postUsuarios", async (req, res) => {
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

router.delete('/delUsuarios/:id',async(req,res)=>{
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

router.put('/updateUsuarios/:id', async (req, res) => {
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
      const carrito =  db.collection("carrito");
      const productos = db.collection("productos")
      const { id } = req.params;
      console.log({_id:id});

      /* Buscamos el producto en el carrito */
      const productInCart = await carrito.findOne({_id:id});
      console.log(productInCart);
      if (!productInCart) {
        return res.status(404).json({ mensaje: "El producto no se encontró en el carrito" });
      }

    
      /* Buscamos el producto en nuestra DB por el nombre del que esta en el carrito */
      const { nombre, imagen, precio, _id:productoId } = await productos.findOne({
        nombre: productInCart.nombre,
      });
    
      /* Buscamos y eliminamos el producto con la id */
      await carrito.deleteOne({_id:id});
      
      /* Buscamos y editamos la prop inCart: false */
      /* Le pasamos la id del producto en la DB */
      /* La prop a cambiar y las demas */
      /* Y el new para devolver el producto editado */
      await productos.updateOne(
        {_id:productoId},
        {$set: { inCart: false, nombre, imagen, precio }},
        { new: true }
      )
        .then((product) => {
          res.json({
            mensaje: `El producto ${product.nombre} fue eliminado del carrito`,
          });
        })
      } catch (error) {
          console.log(error);
      }
})
router.put('/updateProductoCarrito/:id', async (req, res) => {
  try {
    const client = new MongoClient(process.env.DDBB23);
    await client.connect();
    const db = client.db(`shopJQ`);
    const carrito = db.collection("carrito");
    const { id } = req.params;
    const { query } = req.query;
    const body = req.body;
    console.log(query);
    console.log(body.stock);

    /* Buscamos el producto en el carrito */
    const productBuscado = await carrito.find({ _id: id });

    /* Si no hay query 'add' o 'del' */
    if (!query) {
      res.status(404).json({ mensaje: "Debes enviar una query" });

      /* Si esta el producto en el carrito y quiero agregar */
    } else if (productBuscado && query === "add") {
      body.stock = body.stock + 1;

      await carrito.updateOne(
        { _id: id },
        { $set: { stock: body.stock } }, // Usar el operador $set
        { new: true }
      ).then(() => {
        res.json({
          mensaje: `El producto: ${body.nombre} fue actualizado`,
          product: productBuscado,
        });
      });

      /* Si esta el producto en el carrito y quiero sacar */
    } else if (productBuscado && query === "del") {
      if (body.stock > 0) {
        body.stock = body.stock - 1;

        await carrito.updateOne(
          { _id: id },
          { $set: { stock: body.stock } }, // Usar el operador $set
          { new: true }
        ).then(() => {
          res.json({
            mensaje: `El producto: ${productBuscado.nombre} fue actualizado`,
            product: productBuscado,
          });
        });
      } else {
        res.status(400).json({ mensaje: "El producto ya tiene stock 0" });
      }
    } else {
      res.status(400).json({ mensaje: "Ocurrió un error" });
    }
  } catch (error) {
    console.log(error);
  }
});



  

module.exports = router;

