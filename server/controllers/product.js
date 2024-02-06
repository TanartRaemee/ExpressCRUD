const product = require("../Models/product");

exports.read = async (req, res, next) => {
  try {
    const id = req.params.id;
    const productRead = await product.findOne({ _id: id }).exec();
    res.send(productRead);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.list = async (req, res, next) => {
  try {
    const productList = await product.find({}).exec();
    res.send(productList);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.create = async (req, res, next) => {
  try {
    console.log(req.body);
    const productCreate = await product(req.body).save();
    res.send(productCreate);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id
    const productUpdate = await product
      .findOneAndUpdate({ _id: id }, req.body, {new: true})
      .exec()
    res.send(productUpdate);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.remove = async (req, res, next) => {
  try {
    const id = req.params.id
    const productRemove = await product.findOneAndDelete({_id: id}).exec()
    res.send(productRemove);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
