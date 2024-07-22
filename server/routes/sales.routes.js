const SalesController = require("../controllers/sales.controllers");

module.exports = (app) => {
  app.get("/api/sales", SalesController.getAllSales);
  app.post("/api/create/sale", SalesController.createSale);
  app.put("/api/update/sale/:id", SalesController.updateSale);
  app.delete("/api/delete/sale/:id", SalesController.deleteSale);
};
