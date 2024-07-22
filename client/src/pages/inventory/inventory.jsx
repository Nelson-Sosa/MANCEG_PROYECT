import React, { useState, useEffect } from "react";
import Next from "Assets/Next.svg";
import Previous from "Assets/Previous.svg";
import "./inventory.css";
import {
  AvatarSection,
  InventoryChart,
  InventorySearchBar,
  QuickActions,
} from "components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "components/Modal/Modal";

export const Inventory = ({removeFromDom}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  const deleteProduct = (productId)=>{
    axios.delete('http://localhost:8000/api/delete/product/' +productId)
    .then(res =>{
      if(removeFromDom){
        removeFromDom(productId);
      }else{
        setProducts(products.filter(product => product._id !== productId));
      }
    })
    .catch(error => console.error('Error al eliminar producto', error))
  }

  const handleDeleteClick = (productId) =>{
    setCurrentProductId(productId);
    setShowModal(true);
  }

  const handleConfirmDelete = () =>{
    deleteProduct(currentProductId);
    setShowModal(null);
    setCurrentProductId(null);
  }
    

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setProducts(data);
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  //
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatPrice = (price) => {
    return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const mostRecentActivity = products.slice(0, 4);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="inventoryContainer">
      <div className="leftPanel">
        <InventorySearchBar setSearchResultados={setProducts} />
        <div className="productList">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Ref</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.ref}>
                  <td>{product.name}</td>
                  <td>{product.ref}</td>
                  <td>{formatPrice(product.price)} Gs</td>
                  <td>{product.quantity}</td>
                  <td className="buttons">
                    <div>
                      <button
                        onClick={() =>
                          navigate(`/update-product/${product._id}`)
                        }
                        className="edit"
                      >
                        Edit
                      </button>
                    </div>
                    <div>
                      <button className="delete" onClick={()=> handleDeleteClick(product._id)}>Delete</button>
                    </div>
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
        </div>
      </div>
      <div className="rightPanel">
        <AvatarSection />
        <QuickActions />
        <InventoryChart />
      </div>
      <Modal show={showModal}
      onClose={() => setShowModal(false)}
      onConfirm={handleConfirmDelete}>
      <p>¿Are you sure you want to delete this product??</p>
      </Modal>
    </div>
  );
};
