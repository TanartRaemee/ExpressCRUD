const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const { readdirSync } = require("fs");

// const productRouters = require('./Routes/product')

const app = express();
const port = 5000;

connectDB();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

//Route 1
// app.get('/product', (req, res) => {
//     res.send("hello world")
// })

//Route 2
// app.use('/api', productRouters)

//Route 3
readdirSync("./Routes").map((r) => app.use("/api", require("./Routes/" + r)));

app.listen(port, () => {
  console.log("listening on port " + port);
});
