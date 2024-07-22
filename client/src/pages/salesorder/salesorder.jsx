import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Modal from "react-modal";
import "./salesorder.css";
import Next from "Assets/Next.svg";
import Previous from "Assets/Previous.svg";
import logo from "Assets/Logo.png";
import "./modal.css";
import { AvatarSection, QuickActions, SalesChart } from "components";

export const SalesOrder = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [purchased, setPurchased] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  // Estado para los datos del modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [emissionDate, setEmissionDate] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [ruc, setRuc] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const handleCheckboxChange = (product) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.some((p) => p._id === product._id)) {
        return prevSelectedProducts.filter((p) => p._id !== product._id);
      } else {
        return [...prevSelectedProducts, product];
      }
    });
  };

  const formatPrice = (price) => {
    return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Name",
      "Price",
      "Description",
      "Quantity",
      "Total Price",
    ];
    const tableRows = [];

    let total = 0;

    // Calcular y agregar filas para la PDF
    selectedProducts.forEach((product) => {
      const quantity = purchased[product._id] || 0;
      const totalPrice = product.price * quantity;

      const productData = [
        product.name,
        formatPrice(product.price),
        product.description,
        quantity,
        formatPrice(totalPrice),
      ];

      tableRows.push(productData);
      total += totalPrice;
    });

    // Agregar fila de total al final de la tabla
    const totalRow = ["", "", "", "Total:", formatPrice(total)];
    tableRows.push(totalRow);

    // Añadir rectángulo azul oscuro detrás del encabezado
    doc.setFillColor(0, 51, 102); // Establecer color azul oscuro
    doc.rect(0, 0, doc.internal.pageSize.width, 20, "F"); // Dibujar rectángulo desde (0, 0) hasta el ancho de la página con altura 20

    doc.addImage(logo, "png", 140, 2, 40, 15);
    doc.setFont("custom", "bold");
    doc.setFontSize(10);
    doc.setTextColor("white");
    doc.text("RUC: 123456", 10, 8);
    doc.text("Timbrado: 1155789", 10, 12);
    doc.text("Inicio de vigencia: 05/07/2024", 10, 16);
    doc.text("Av. Caballero entre Ayolas y Oleary", 60, 8);
    doc.text("Encarnación - Paraguay", 60, 12);
    doc.text("www.manceg.com.py", 60, 16);

    // Generar la tabla y obtener la posición final de la misma
    const startY = 25; // Ajusta esta posición según sea necesario
    doc.autoTable(tableColumn, tableRows, { startY });

    // Obtener la ubicación final de la tabla
    const endY = doc.autoTable.previous.finalY;
    const totalY = endY - startY;

    // Mostrar los datos del modal en el PDF
    doc.setFillColor(0, 51, 102);
    doc.rect(0, 40 + totalY, doc.internal.pageSize.width, 20, "F");
    doc.setFont("custom", "bold");
    doc.setFontSize(12);
    doc.setTextColor("white");
    doc.text(`Fecha de Emisión: ${emissionDate}`, 15, 45 + totalY);
    doc.text(`Razón Social: ${businessName}`, 15, 55 + totalY);
    doc.text(`RUC: ${ruc}`, 85, 45 + totalY);
    doc.text(`Dirección: ${address}`, 85, 55 + totalY);

    // Guardar el PDF
    doc.save(`emitido el ${emissionDate} factura de ${businessName}.pdf`);

    // Limpiar productos seleccionados después de generar el PDF
    setSelectedProducts([]);

    // Actualizar el stock en el servidor
    updateStock();
    console.log("Selected Products:", selectedProducts);
    setSales(selectedProducts);
  };
  const setSales = async (newSale) => {
    try {
      const response = await fetch("http://localhost:8000/api/create/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSale),
      });
      if (!response.ok) {
        throw new Error("Error creating sale");
      }
      const data = await response.json();
      console.log("New Sale:", data);
    } catch (error) {
      console.log("Failed to create sale:", error);
    }
  };
  const updateStock = async () => {
    const updatedProducts = selectedProducts.map((product) => ({
      _id: product._id,
      quantity: product.quantity,
    }));

    try {
      const response = await fetch(
        "http://localhost:8000/api/update/quantity",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProducts),
        }
      );
      if (!response.ok) {
        throw new Error("Error updating stock");
      }
      const data = await response.json();
      setProducts(data); // Actualizar los productos en el estado con los datos recibidos del servidor
    } catch (error) {
      console.log("Failed to update stock:", error);
    }

    // Agregar los productos comprados a la base de datos de ventas
  };

  const subtractPurchasedProduct = (product, value) => {
    const newQuantity = value ? Math.max(0, Math.min(parseInt(value))) : 0;

    // Actualizar el estado de los productos comprados
    setPurchased({
      ...purchased,
      [product._id]: newQuantity,
    });

    // Actualizar el stock de los productos
    setProducts(
      products.map((p) => {
        if (p._id === product._id) {
          const oldPurchasedQuantity = purchased[product._id] || 0;
          // Calcular el nuevo stock correctamente
          const newStockQuantity =
            p.quantity + oldPurchasedQuantity - newQuantity;
          return { ...p, quantity: newStockQuantity };
        }
        return p;
      })
    );
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mainContainer">
      <div className="salesOrderContainer">
        <h1 className="salesOrder">Sales Order</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Stock</th>
              <th>Comprar</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{formatPrice(product.price)} Gs</td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>
                  <input
                    type="number"
                    className="inputOfSalesOrder"
                    value={purchased[product._id] || ""}
                    onChange={(e) =>
                      subtractPurchasedProduct(
                        product,
                        parseInt(e.target.value)
                      )
                    }
                    disabled={product.quantity === 0}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.some(
                      (p) => p._id === product._id
                    )}
                    onChange={() => handleCheckboxChange(product)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pageInfo">
          {currentPage} / {totalPages}
        </div>
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <img src={Previous} className="pages" alt="Previous" />
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <img src={Next} className="pages" alt="Next" />
          </button>
        </div>
        <button className="btnBilling" onClick={openModal}>
          Generate Billing
        </button>
      </div>
      <div className="rightPanel">
        <AvatarSection />
        <QuickActions />
        <SalesChart />
      </div>

      {/* Modal para la factura */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Bill Information"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Bill Information</h2>
        <form className="formModal">
          <div className="form-group">
            <label htmlFor="emissionDate">Emission Date</label>
            <input
              type="date"
              id="emissionDate"
              value={emissionDate}
              onChange={(e) => setEmissionDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="businessName">Business Name</label>
            <input
              type="text"
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ruc">RUC</label>
            <input
              type="text"
              id="ruc"
              value={ruc}
              onChange={(e) => setRuc(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>
        </form>
        <div className="modal-buttons">
          <button className="btn btn-primary" onClick={generatePDF}>
            Generate PDF
          </button>
          <button className="btn btn-secondary" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};
