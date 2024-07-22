import "./Header.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../../Assets/Logo.png";
import UsFlag from "../../Assets/estados unidos.svg";
import BrFlag from "../../Assets/Bandera Brasil.png";
import ArFlag from "../../Assets/argentina.svg";
import Modal from "react-modal";

const flags = [UsFlag, BrFlag, ArFlag];
const currencyNames = ["USD", "R$", "ARS"];

export const Header = () => {
  const location = useLocation();
  const [exchangeMoney, setExchangeMoney] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [product, setProduct] = useState([]);
  const [showProduct, setShowProduct] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleExchangeMoney = async () => {
    const URL = "https://www.cambioschaco.com.py/api/branch_office/1/exchange";
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setExchangeMoney(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleExchangeMoney();

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3); // Cambia cada 3 segundos
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const imgElement = document.querySelector(".flag");
    const titleChangesMonetaryElement = document.querySelector(
      ".titleChangesMonetary"
    );
    if (imgElement && imgElement.alt === "ARS Flag") {
      titleChangesMonetaryElement.style.gap = "142px";
    } else if (imgElement && imgElement.alt === "USD Flag") {
      titleChangesMonetaryElement.style.gap = "105px";
    } else {
      titleChangesMonetaryElement.style.gap = "160px";
    }
  }, [currentIndex]);

  console.log("Exchange Money:", exchangeMoney);

  useEffect(() => {
    const searchGeneral = async () => {
      const response = await fetch("http://localhost:8000/api/products");
      const data = await response.json();
      setProduct(data);
      console.log("dato productos", data);
    };

    searchGeneral();
  }, []);

  const search = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setShowProduct([]);
    } else {
      const searchProduct = product.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setShowProduct(searchProduct);
      console.log("Producto encontrado:", searchProduct);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe y recargue la página
    search(e);
  };

  return (
    <div className="headerContainer">
      <div className="headerTitle">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="headerChangesMonetary">
        <div className="titleChangesMonetary">
          <p> PURCHASE</p>
          <p> SALE</p>
        </div>
        <div className="headerExchange">
          <div className="exchange purchase">
            {exchangeMoney.length > 0 && (
              <p>
                <img
                  className="flag"
                  src={flags[currentIndex]}
                  alt={`${currencyNames[currentIndex]} Flag`}
                />
                {currencyNames[currentIndex]}:{" "}
                {exchangeMoney[currentIndex]?.purchasePrice} Gs
              </p>
            )}
          </div>
          <div className="exchange sale">
            {exchangeMoney.length > 0 && (
              <p>
                <img
                  className="flag"
                  src={flags[currentIndex]}
                  alt={`${currencyNames[currentIndex]} Flag`}
                />
                {currencyNames[currentIndex]}:{" "}
                {exchangeMoney[currentIndex]?.salePrice} Gs
              </p>
            )}
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {location.pathname === "/" ? (
          <>
            <button
              type="button"
              onClick={openModal}
              className="btn btn-primary"
            >
              Search
            </button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Bill Information"
              className="modal"
              overlayClassName="overlay"
            >
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={search}
              />
              <div className="buttons-modal">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
              {showProduct.length > 0 && (
                <div className="searchResult">
                  {showProduct.map((p) => (
                    <p key={p.id}>{p.name}</p>
                  ))}
                </div>
              )}
            </Modal>
          </>
        ) : null}
      </form>
    </div>
  );
};
