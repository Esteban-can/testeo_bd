// Importamos los módulos necesarios
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// ✅ Configurar CORS para permitir peticiones desde el front local y Render
const corsOptions = {
  origin: ["http://localhost:5173", "https://zona404.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));

// ✅ Middleware para parsear JSON y formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Conexión con la base de datos
const db = require("./app/models");
db.sequelize.sync()
  .then(() => console.log("📦 Conectado a la base de datos correctamente"))
  .catch(err => console.error("❌ Error al conectar la base de datos:", err));

// ✅ Ruta simple de prueba
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a nuestro Cine 🎬" });
});

// ✅ Prefijo común para las rutas de la API
// Esto hace que todas las rutas estén bajo /api/
app.use("/api/asientos", require("./app/routes/asiento.routes"));
app.use("/api/salas", require("./app/routes/sala.routes"));
app.use("/api/usuarios", require("./app/routes/usuario.routes"));
app.use("/api/peliculas", require("./app/routes/pelicula.routes"));
app.use("/api/funciones", require("./app/routes/funcion.routes"));
app.use("/api/reservas", require("./app/routes/reserva.routes"));
app.use("/api/promociones", require("./app/routes/promocion.routes"));
app.use("/api/pagos", require("./app/routes/pago.routes"));

// ✅ Puerto del backend (diferente del frontend)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}.`);
});
