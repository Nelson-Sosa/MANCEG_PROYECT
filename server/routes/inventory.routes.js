const InventoryController = require("../controllers/inventory.controllers");
const express = require('express');
const router = express.Router();

// Ruta para buscar productos por nombre
router.get('/search', InventoryController.searchProduct);


module.exports = (app) => {
  app.use("/api/products",router);  
  app.get("/api/products", InventoryController.getAllProducts);
  app.post("/api/create/product", InventoryController.createProduct);
  app.put('/api/update/quantity', InventoryController.updateQuantity);
  app.get('/api/product/:id', InventoryController.getProductById);
  app.put('/api/update/product/:id', InventoryController.updateProduct);
  app.delete('/api/delete/product/:id', InventoryController.deleteProduct);
};
