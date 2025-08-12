# Simulacro — Backend

Backend del proyecto **Simulacro**, construido con **Node.js**, **Express** y **MySQL**.  
Incluye endpoints para clientes, productos, vendedores, facturas y compras. Además contiene loaders para importar datos desde CSV hacia la base de datos.

---

## Requisitos previos

- Node.js (v16+ recomendado)
- MySQL (servidor y usuario con permisos)
- Git

---

## Instalación (desde cero)

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd simulacro
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Configura la base de datos MySQL:
   - Crea la base de datos (ejemplo):
     ```sql
     CREATE DATABASE dbventas;
     ```
   - Actualiza las credenciales de conexión en el archivo de configuración que uses (por ejemplo `config/db.js` o donde definas la conexión). Se recomienda usar variables de entorno:
     ```env
     DB_HOST=localhost
     DB_USER=tu_usuario
     DB_PASS=tu_password
     DB_NAME=dbventas
     DB_PORT=3306
     ```

> **Nota:** adapta la ubicación del archivo de configuración según tu proyecto. Asegúrate de que el archivo que establece la conexión con `mysql2` lea las variables o tenga las credenciales correctas.

---

## Cargar datos iniciales desde CSV

El proyecto contiene funciones `cargarClientes`, `cargarProductos`, `cargarVendedores`, `cargarFacturas` y `cargarCompras` dentro de los loaders. Para ejecutar la carga inicial:

1. Abre `app.js` y **descomenta** (en este orden) las importaciones de los loaders y las llamadas a las funciones. En `app.js` verás bloques como:

```js
// const { cargarClientes } = require('./loaders.js');
// const { cargarProductos } = require('./loaders.js');
// const { cargarVendedores } = require('./loaders.js');
// const { cargarFacturas } = require('./loaders.js');
// const { cargarCompras } = require('./loaders.js');
```

y más abajo:

```js
// cargarClientes()
// cargarProductos()
// cargarVendedores()
// cargarFacturas()
// cargarCompras()
```

Descomenta ambas secciones para que queden activas (primero las `require`, luego las llamadas).

2. Ejecuta el servidor para que corran las cargas:
   ```bash
   node app.js
   ```
   o (con recarga automática)
   ```bash
   npx nodemon app.js
   ```

3. Observa la salida en consola: cuando las funciones terminen de insertar los datos desde los CSV, detén el servidor y **vuelve a comentar** (o elimina) las llamadas a las funciones `cargar*()` en `app.js`. Esto evita duplicar datos al iniciar el servidor de nuevo.

---

## Ejecutar el servidor (uso normal)

Modo desarrollo (con nodemon):
```bash
npx nodemon app.js
```

Modo normal:
```bash
node app.js
```

El servidor por defecto corre en:
```
http://localhost:5000/
```

---

## Endpoints principales

(Definidos en `app.js` con sus routers)
- `GET /clientes` — Operaciones sobre clientes
- `GET /productos` — Operaciones sobre productos
- `GET /vendedores` — Operaciones sobre vendedores
- `GET /facturas` — Operaciones sobre facturas
- `GET /compras` — Operaciones sobre compras
- `GET /usuarios` — Operaciones sobre usuarios


---

## Solución de problemas comunes

- **Conexión a MySQL fallida**: revisa host/usuario/contraseña/puerto y que el servidor MySQL esté encendido.
- **Permisos denegados**: revisa que el usuario tenga permisos para `CREATE`, `INSERT`, `UPDATE`, `DELETE`.
- **Duplicado al correr loaders**: recuerda comentar las llamadas `cargar*()` luego de usarlas.
- **Puerto en uso**: cambia el puerto en `app.js` o libera el puerto 5000.

---

## Dependencias (extraídas de package.json)

- express
- cors
- mysql2
- csv-parser
- nodemon (dev)

Instaladas con:
```bash
npm install
```

---

