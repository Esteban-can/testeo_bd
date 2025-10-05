const express = require("express");
const router = express.Router();
const peliculas = require("../controllers/pelicula.controller.js");

// Crear película
router.post("/create", peliculas.create);

// Obtener todas las películas
router.get("/", peliculas.findAll);

// Obtener película por ID
router.get("/:id", peliculas.findOne);

// Actualizar película
router.put("/:id", peliculas.update);

// Eliminar película por ID
router.delete("/:id", peliculas.delete);

// Eliminar todas las películas
router.delete("/", peliculas.deleteAll);

module.exports = router;
