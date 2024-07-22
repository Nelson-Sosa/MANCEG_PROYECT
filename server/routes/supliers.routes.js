const SupliersController = require("../controllers/supliers.controllers");
const express = require('express');
const router = express.Router();

// Ruta para buscar proveedores por nombre
router.get('/search', SupliersController.searchSuppliers);

module.exports = (app) => {
  app.use("/api/supliers",router);  
  app.get("/api/supliers", SupliersController.getAllSupliers);
  app.post("/api/agregar/supliers", SupliersController.createSupliers);
  app.put("/api/actualizar/supliers/:id", SupliersController.updateSupliers);
  app.delete("/api/eliminar/supliers/:id", SupliersController.deleteSupliers);
  app.get('/api/supliers/:id', SupliersController.getSupliers);
};
