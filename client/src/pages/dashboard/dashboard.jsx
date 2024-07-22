import {
  AvatarSection,
  QuickActions,
  BarChart,
  SuplierChart,
} from "components";
import { useEffect, useState } from "react";
import "./dashboard.css";

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("Products", products);
  const countProducts = () => {
    let count = 0;
    products.map((product) => {
      console.log("Product quantity", product.quantity);
      count += Number(product.quantity);
      return count;
    });
    return count;
  };
  const currencyFormat = (num) => {
    return (
      Number(num)
        .toFixed(0)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " GS"
    );
  };

  const calculateNetIncome = () => {
    let total = 0;
    products.map((product) => {
      total += product.price * product.quantity;
      return total;
    });
    return total;
  };

  const calculateTotalSales = () => {
    let total = 0;
    products.map((product) => {
      if (product.quantity === 0) {
        total += product.price;
      }
      return total;
    });
    return total;
  };

  console.log("Products quantity", countProducts());
  return (
    <div className="dashboardContainer">
      <div className="leftPanel">
        <div className="salesSumary">
          <span>
            <b>Monthly Total Sales</b>
            {currencyFormat(calculateTotalSales())}
          </span>
          <span>
            <b>Net Income</b>
            {currencyFormat(calculateNetIncome())}
          </span>
          <span>
            <b>Products</b>
            <p>{countProducts()}</p>
          </span>
        </div>
        <div className="salesReport">
          <span>
            <b>Sales Report</b>
            <p></p>
          </span>
          <span className="barChartDashboard">
            <BarChart />
          </span>
        </div>
        <div className="lastestProductsDashboard">
          <div className="lastestProducts">
            <span>
              <b>Lastest Products</b>
            </span>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Ref</th>
                </tr>
              </thead>
              <tbody>
                {products
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 5)
                  .map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>{product.ref}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="rightPanel">
        <AvatarSection />
        <QuickActions />
        <SuplierChart />
      </div>
    </div>
  );
};
