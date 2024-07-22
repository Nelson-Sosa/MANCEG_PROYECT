const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  ref: {
    type: String,
    required: [true, "Reference is required"],
  },
  name: {
    type: String,
    required: [true, "Product is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [0, "Quantity must be at least 0"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be at least 0"],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
});

const Sale = mongoose.model("Sale", saleSchema);
