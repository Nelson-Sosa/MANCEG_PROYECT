const Sales = require("../models/sales.models");

module.exports.getAllSales = (req, res) => {
  Sales.find()
    .then((allSales) => {
      console.log("All Sales:", allSales);
      res.json(allSales);
    })
    .catch((err) => {
      console.error("Error retrieving sales:", err);
      res.status(500).json(err);
    });
};

module.exports.createSale = (req, res) => {
  const { product, quantity, price, date } = req.body;

  if (!product || !quantity || !price || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (quantity < 0) {
    return res.status(400).json({ message: "Quantity must be at least 0" });
  }

  if (price < 0) {
    return res.status(400).json({ message: "Price must be at least 0" });
  }

  const formattedDate = moment(date, "YYYY-MM-DD", true).toDate();

  if (!formattedDate || isNaN(formattedDate.getTime())) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  Sales.create({
    product,
    quantity,
    price,
    date: formattedDate,
  })
    .then((newSale) => {
      console.log("New Sale:", newSale);
      res.json(newSale);
    })
    .catch((err) => {
      console.error("Error creating sale:", err);
      res.status(500).json(err);
    });
};

module.exports.updateSale = (req, res) => {
  const { id } = req.params;
  const updatedSale = req.body;

  Sales.findByIdAndUpdate(id, updatedSale, { new: true })
    .then((updatedSale) => {
      console.log("Updated Sale:", updatedSale);
      res.json(updatedSale);
    })
    .catch((err) => {
      console.error("Error updating sale:", err);
      res.status(500).json(err);
    });
};

module.exports.deleteSale = (req, res) => {
  const { id } = req.params;

  Sales.findByIdAndDelete(id)
    .then((deletedSale) => {
      console.log("Deleted Sale:", deletedSale);
      res.json(deletedSale);
    })
    .catch((err) => {
      console.error("Error deleting sale:", err);
      res.status(500).json(err);
    });
};
