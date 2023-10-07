# API de Compras

Esta es una API de compras construida con Node.js y Express. La API se conecta a una base de datos MongoDB y proporciona endpoints para gestionar compras y productos.

## Requisitos

Asegúrate de tener Node.js y MongoDB instalados en tu sistema antes de ejecutar la aplicación.

## Configuración

1. Clona este repositorio:


2. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias:


3. Instala las dependencias del proyecto:


## Ejecución

Ejecuta la aplicación con el siguiente comando:


La API estará disponible en `http://localhost:3000` (o el puerto que hayas configurado en tu archivo `.env`).

## Documentación

Hemos proporcionado documentación Swagger para esta API. Puedes acceder a ella en `http://localhost:3000/shop-swagger` para explorar la API y probar los endpoints.

## Uso

La API proporciona las siguientes rutas y funcionalidades:

- `GET /shop`: Obtiene la lista de compras.
- `POST /shop`: Crea una nueva compra.
- `PUT /shop/:id`: Actualiza una compra existente.
- `DELETE /shop/:id`: Elimina una compra por su ID.

Asegúrate de revisar la documentación Swagger para obtener más detalles sobre cómo utilizar cada endpoint.

## Contribución

¡Agradecemos las contribuciones! Si deseas contribuir a este proyecto, sigue estos pasos:

1. Abre un issue para discutir la contribución que te gustaría realizar.
2. Fork el repositorio y crea una rama para tu contribución.
3. Realiza tus cambios y envía una solicitud de extracción.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para obtener más detalles.

