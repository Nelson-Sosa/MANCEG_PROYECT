const Supliers = require("../models/supliers.models");

exports.searchSuppliers = async (req, res) => {
  try {
    const name = req.query.name.trim();// Limpia la entrada

    if(!name){
      return res.status(400).json({message: 'El nombre del proveedor es requerido'})
    }
    // Verifica que se esté buscando por 'name' y no por '_id'
    const supliers = await Supliers.find({ name: { $regex: name, $options: 'i' } });

    if(supliers.length === 0 ){
      return res.status(404).json({message: 'Proveedor no encontrado'});
    }
    res.json(supliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
////////////////////////////
module.exports.getAllSupliers = (req, res) => {
  Supliers.find()
    .then((allSupliers) => {
      console.log("All Supliers:", allSupliers);
      res.json(allSupliers);
    })
    .catch((err) => {
      console.error("Error retrieving Supliers:", err);
      res.status(500).json(err);
    });
};

module.exports.getSupliers = (request, response) => {
 Supliers.findOne({_id:request.params.id})
        .then(supliers => response.json(supliers))
        .catch(err => response.json(err))
}

module.exports.createSupliers = async (req, res) => {
  try {
    const { name, ruc, phone, address, mail, postalCode, sitioWep } = req.body;

    // Verificar si ya existe proveedor con el mismo RUC
    const existingSupplier = await Supliers.findOne({ ruc });
    if (existingSupplier) {
      return res
        .status(400)
        .json({ error: "Supplier with this RUC already exists" });
    }

    // Crear el nuevo proveedor
    const newSuplier = await Supliers.create({
      name,
      ruc,
      phone,
      address,
      mail,
      postalCode,
      sitioWep,
    });

    console.log("New Supplier:", newSuplier);
    res.json(newSuplier);
  } catch (err) {
    console.error("Error creating supplier:", err);
    res.status(400).json(err);
  }
};

module.exports.updateSupliers = (request, response)=>{
  Supliers.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updateSupliers => response.json(updateSupliers))
        .catch(err=> response.json(err));
}

module.exports.deleteSupliers = (request, response)=>{
  Supliers.deleteOne({_id: request.params.id})
  .then(deleteSupliers => response.json(deleteSupliers))
  .catch(err => response.json(err));
} 
