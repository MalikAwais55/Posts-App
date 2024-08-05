const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConnection");
const { port } = require("./config/vars");
const router = require("./routes/index");
const {authorize} = require("./middlewares/authorization")
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

app.use(authorize)
// Mount Routes
app.use("/api", router);


app.listen(port, () => {
  console.log(`App is listening to the Port ${port}`);
});
