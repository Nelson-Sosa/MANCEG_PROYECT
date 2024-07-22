require("dotenv").config();
const express = require("express");
const cors = require("cors");

const Inventory = require("./routes/inventory.routes");

const Supliers = require("./routes/supliers.routes");

const Auth = require("./routes/auth.routes");

const Sales = require("./routes/sales.routes");

const app = express();
const port = 8000;

require("./configuration/configuration.mongoose");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Inventory(app);

Supliers(app);

Auth(app);

Sales(app);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
