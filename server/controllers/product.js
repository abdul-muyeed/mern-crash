import Product from "../models/product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: error.message });
  }
};
export const createProduct = async (req, res) => {
  try {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
      return res
        .status(400)
        .send({ success: false, message: "Please provide all fields" });
    }
    const newProduct = new Product(product);

    await newProduct.save();
    res.status(201).send({ success: true, data: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: error.message });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
      return res
        .status(400)
        .send({ success: false, message: "Please provide all fields" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    if (!updatedProduct) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }
    res.status(200).send({ success: true, data: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }
    res
      .status(200)
      .send({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: error.message });
  }
};
