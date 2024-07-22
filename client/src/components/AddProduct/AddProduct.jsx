import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddProduct.css";
import { AvatarSection, InventorySearchBar, QuickActions } from "components";
import backImg from "../../Assets/back.png"

export const AddProduct = ({ addProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [ref, setRef] = useState("");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/product/${id}`);
          const data = await response.json();
          setName(data.name);
          setPrice(data.price);
          setDescription(data.description);
          setRef(data.ref);
          setQuantity(data.quantity);
          setSize(data.size);
          setColor(data.color);
          setBrand(data.brand);
          setDate(data.date ? data.date.slice(0, 10) : "");
        } catch (error) {
          setError("Error fetching product details.");
        }
      };

      fetchProduct();
    }
  }, [id]);

  const procesarForm = async (e) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const URL = id
      ? `http://localhost:8000/api/update/product/${id}`
      : "http://localhost:8000/api/create/product";
    const configuracion = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        ref,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        size,
        color,
        brand,
        date,
      }),
    };

    try {
      const respuesta = await fetch(URL, configuracion);
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        console.log(datos);
        setError(datos.message);
      } else {
        if (method === "POST") {
          addProduct(datos);
        }
        setName("");
        setDescription("");
        setRef("");
        setColor("");
        setDate("");
        setPrice("");
        setQuantity("");
        setSize("");
        setBrand("");
        setError("");
        navigate("/inventory");
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };

  const mostRecentActivity = products.slice(0, 4);

  return (
    <>
      <div className="back">
        <Link to="/" >
          <img src={backImg} alt="Back Icon"></img>
          BACK
        </Link>
      </div>
      <div className="addProductContainer">
        <h1 className="addProductTitle"> Add Product </h1>
        <form onSubmit={procesarForm} className="addProductForm">
          <div className="formGroup">
            <label> Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label> Price: </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label> Quantity: </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label> Size: </label>
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label> Brand: </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label> Description: </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label> Reference: </label>
            <input
              type="text"
              value={ref}
              onChange={(e) => setRef(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label> Color: </label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label> Date: </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <button type="submit"> Add Product </button>
          </div>
        </form>
        {error && <p className="errorMessage">{error}</p>}
      </div>
    </>
  );
};
