const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be at least 0"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [5, "Description must be at least 5 characters long"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [0, "Quantity must be at least 0"],
  },
  ref: {
    type: String,
    required: [true, "Reference is required"],
  },
  brand: {
    type: String,
    required: [true, "Brand is required"],
  },
  size: {
    type: String,
    required: [true, "Size is required"],
  },
  color: {
    type: String,
    required: [true, "Color is required"],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
