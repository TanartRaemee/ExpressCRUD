const express = require("express");
const router = express.Router();

const {
  read,
  list,
  create,
  update,
  remove,
} = require("../controllers/product");

//Middleware
const { auth } = require("../Middleware/auth");
const { upload } = require("../Middleware/upload")


//http://localhost:5000/api/product
router.get("/product",auth,  list);

router.get("/product/:id", auth, read);

router.post("/product", auth, upload, create);

router.put("/product/:id", auth, update);

router.delete("/product/:id", auth, remove);

module.exports = router;
