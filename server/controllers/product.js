const product = require("../Models/product");
const fs = require("fs");

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
    let data = req.body;
    if (req.file) {
      data.file = req.file.filename;
    }
    // console.log(data);
    const productCreate = await product(data).save();
    res.send(productCreate);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    let newDataProduct = req.body;

    if (typeof req.file !== "undefined") {
      newDataProduct.file = req.file.filename
      const filePath = "./uploads/" + newDataProduct.fileold;
      await fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Edit successfully");
        }
      });

    }
    const productUpdate = await product
      .findOneAndUpdate({ _id: id }, newDataProduct, { new: true })
      .exec();
    res.send(productUpdate);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// exports.remove = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const productRemove = await product.findOneAndDelete({ _id: id }).exec();
//     if (productRemove?.file) {
//       await fs.unlink("./uploads" + productRemove.file, (err) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("Removed successfully");
//         }
//       });
//     }

//     res.send(productRemove);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Server Error");
//   }
// };

exports.remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    const productRemove = await product.findOneAndDelete({ _id: id }).exec();
    if (productRemove?.file) {
      const filePath = "./uploads/" + productRemove.file;
      await fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Removed successfully");
        }
      });
    }

    res.send(productRemove);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
