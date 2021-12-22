const express = require("express");
const cors = require("cors");
const posts = require("./routes/users");
const orders = require("./routes/orders");
const mongoose = require("mongoose");
const app = express();
const port = 8080;

mongoose.connect(
  "mongodb+srv://123:123@cluster0.ieg5j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);
// Middlewares

app.use(express.json());

// Routers
app.use("/", posts);
app.use("/orders",orders)

app.listen(port, () => {
});