import React from "react";
import createOrder from "../../Assets/createorder.png";
import addSupplier from "../../Assets/addsupplier.png";
import addProduct from "../../Assets/addproduct.png";
import exportProduct from "../../Assets/export.png";
import { Link } from "react-router-dom";
import "./QuickActions.css";

export const QuickActions = () => {
  return (
    <div className="QuickActions">
      <div className="quickActionsContainer">
        {/*  <div className="quickAction">
          <img src={createOrder} alt="Create Order Icon" />
          <span>Create Order</span>
        </div> */}
        <div className="quickAction">
          <img src={addSupplier} alt="Add Supplier Icon" />
          <Link to="/agregar/supliers">Add Supplier</Link>
        </div>
        <div className="quickAction">
          <img src={addProduct} alt="Add Product Icon" />
          <Link to="/addProduct">Add Product</Link>
        </div>
        {/*    <div className="quickAction">
          <img src={exportProduct} alt="Export Icon" />
          <span>Export</span>
        </div> */}
      </div>
    </div>
  );
};
