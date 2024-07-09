const express = require("express");
const connectDB = require("./config/dbConnection");
const { port } = require("./config/vars");
const router = require("./routes/post.route");
const app = express();

connectDB();
app.use(express.json());

// Mount Routes
app.use("/api", router);

app.listen(port, () => {
  console.log(`App is listening to the Port ${port}`);
});
