const Product = require("../models/inventory.models");
const moment = require("moment");

exports.searchProduct = async (req, res) => {
  try {
    const name = req.query.name.trim(); // Limpia la entrada
    if(!name){
      return res.status(400).json({message: 'El nombre del producto es requerido'})
    }
    // Verifica que se esté buscando por 'name' y no por '_id'
    const product = await Product.find({ name: { $regex: name, $options: 'i' } });
    if(product.length === 0){
      return res.status(400).json({message: 'El producto no fue encontrado'});
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports.getAllProducts = (req, res) => {
  Product.find()
    .then((allProducts) => {
      console.log("All Products:", allProducts);
      res.json(allProducts);
    })
    .catch((err) => {
      console.error("Error retrieving products:", err);
      res.status(500).json(err);
    });
};

module.exports.createProduct = (req, res) => {
  const { name, price, description, quantity, ref, brand, size, color, date } =
    req.body;

  //VALIDACIONES
  if (
    !name ||
    !price ||
    !description ||
    !quantity ||
    !ref ||
    !brand ||
    !size ||
    !color ||
    !date
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: "Name must be at least 3 characters long" });
  }
  if (price < 0) {
    return res.status(400).json({ message: "Price must be at least 0" });
  }
  if (description.length < 5) {
    return res
      .status(400)
      .json({ message: "Description must be at least 5 characters long" });
  }
  if (quantity < 0) {
    return res.status(400).json({ message: "Quantity must be at least 0" });
  }

  // Convirtiendo formato de fecha a "YYYY-MM-DD"
  const formattedDate = moment(date, "YYYY-MM-DD", true).toDate();

  if (!formattedDate || isNaN(formattedDate.getTime())) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  Product.create({
    name,
    price,
    description,
    quantity,
    ref,
    brand,
    size,
    color,
    date: formattedDate,
  })
    .then((newProduct) => {
      console.log("New Product:", newProduct);
      res.json(newProduct);
    })
    .catch((err) => {
      console.error("Error creating product:", err);
      res.status(500).json(err);
    });
};

module.exports.updateQuantity = async (req, res) => {
  const updatedProducts = req.body;
  try {
    const promises = updatedProducts.map((product) =>
      Product.findByIdAndUpdate(
        product._id,
        { quantity: product.quantity },
        { new: true }
      )
    );
    const results = await Promise.all(promises);
    const allProducts = await Product.find(); // Obtener todos los productos actualizados
    res.json(allProducts);
  } catch (err) {
    console.error("Error updating products:", err);
    res.status(500).json(err);
  }
};

module.exports.getProductById = (req, res) => {
  const { id } = req.params;

  Product.findById(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    })
    .catch((err) => {
      console.error("Error retrieving product:", err);
      res.status(500).json(err);
    });
};

module.exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, quantity, ref, brand, size, color, date } =
    req.body;

  console.log("Request body:", req.body);

  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  // Convertir la fecha a un objeto de fecha válido
  const formattedDate = moment(date, "YYYY-MM-DD", true).toDate();
  if (!formattedDate || isNaN(formattedDate.getTime())) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        quantity,
        ref,
        brand,
        size,
        color,
        date: formattedDate,
      },
      { new: true, runValidators: true }
    );

    console.log("Updated Product:", updatedProduct);

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

module.exports.deleteProduct = (request, response)=>{
  Product.deleteOne({_id: request.params.id})
  .then(deleteProduct => response.json(deleteProduct))
  .catch(err => response.json(err));
} 
