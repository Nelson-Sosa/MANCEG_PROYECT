import React from "react";
import "./InventorySearchBar.css";
import { Link } from "react-router-dom";
import { useState} from "react";
import axios from "axios";

export const InventorySearchBar = ({setSearchResultados}) => {
  const [consulta, setConsulta] = useState('');
  const [message, setMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await axios.get(`http://localhost:8000/api/products/search?name=${consulta}`)
      setSearchResultados(respuesta.data);
      setMessage('');
    } catch(err){
      setMessage('The product was not found');
    }
  }

  return (
    <div className="searchBar">
      <div className="searchBarContain">
        <span>Inventory</span>

        <form class="max-w-md mx-auto" onSubmit={handleSearch}>
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
              type="search"
              id="default-search"
              class="block w-80 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
            />
            <button
              type="submit"
              class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
       
            {message && <p className="message-text">{message}</p>}
          
        </form>
        <Link to="/addProduct">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            New Product
          </button>
        </Link>
      </div>
    </div>
  );
};
