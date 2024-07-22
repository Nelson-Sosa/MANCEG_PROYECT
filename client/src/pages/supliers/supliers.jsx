
import '../supliers/supliers.css'
import Modal from 'components/Modal/Modal';
import "../supliers/supliers.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { QuickActions, AvatarSection, SuplierChart } from "components";
import axios from "axios";
import { SupliersSearchBar } from "components/SupliersSearchBar/SupliersSearchBar";


export const Supliers = ({ removeFromDom }) => {
  const [supliers, setSuplier] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentSupliersId, setCurrentSupliersId] = useState(null);


  const deleteSupliers = (suplierId)=>{
    axios.delete('http://localhost:8000/api/eliminar/supliers/' +suplierId)
    .then(res =>{
      if(removeFromDom){
        removeFromDom(suplierId);
      }else{
        setSuplier(supliers.filter(suplier => suplier._id !== suplierId));
      }
    })
    .catch(error => console.error('Error al eliminar proveedor', error))
  }

  const handleDeleteClick = (suplierId) =>{
    setCurrentSupliersId(suplierId);
    setShowModal(true);
  }

  const handleConfirmDelete = () =>{
    deleteSupliers(currentSupliersId);
    setShowModal(null);
    setCurrentSupliersId(null);
  }
 
  useEffect(() => {
    const fetchSupliers = async () => {
      try {
        setLoaded(true);
        const response = await fetch("http://localhost:8000/api/supliers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setSuplier(data);
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoaded(false);
      }
    };

    fetchSupliers();
  }, []);

  if (loaded) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="supliersContainer">
      <SupliersSearchBar setSearchResultados={setSuplier} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>RUC</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Mail</th>
            <th>Postal Code</th>
            <th>Sitio Web</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {supliers.map((suplier, index) => (
            <tr key={index}>
              <td>{suplier.name}</td>
              <td>{suplier.ruc}</td>
              <td>{suplier.phone}</td>
              <td>{suplier.address}</td>
              <td>{suplier.mail}</td>
              <td>{suplier.postalCode}</td>
              <td>{suplier.sitioWep}</td>
              <td>
                <div className="table-buttons">
              <Link to={`/actualizar/supliers/${suplier._id}`}>
              <button className="edit-button">Edit</button>
              </Link>
              
                <button className='delete-button' onClick={()=> handleDeleteClick(suplier._id)}>
                  Delete
                </button>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={showModal}
      onClose={() => setShowModal(false)}
      onConfirm={handleConfirmDelete}>
      <p>¿Are you sure you want to remove this provider?</p>
      </Modal>
    </div>
  );
};
