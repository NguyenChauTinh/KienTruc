import { Request, Response } from 'express';
import Product, { IProduct } from '../models/Product';

// Get all products
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.json({
      errorCode: 200,
      errorMessage: "Success",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      errorCode: 500,
      errorMessage: "Server Error",
      data: null,
    });
  }
};

// Get product by ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({
        errorCode: 404,
        errorMessage: "Product not found",
        data: null,
      });
      return;
    }
    res.json({
      errorCode: 200,
      errorMessage: "Success",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      errorCode: 500,
      errorMessage: "Server Error",
      data: null,
    });
  }
};

// Create new product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({
      errorCode: 201,
      errorMessage: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      errorCode: 500,
      errorMessage: "Server Error",
      data: null,
    });
  }
};

// Update product
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      res.status(404).json({
        errorCode: 404,
        errorMessage: "Product not found",
        data: null,
      });
      return;
    }
    res.json({
      errorCode: 200,
      errorMessage: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      errorCode: 500,
      errorMessage: "Server Error",
      data: null,
    });
  }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({
        errorCode: 404,
        errorMessage: "Product not found",
        data: null,
      });
      return;
    }
    res.json({
      errorCode: 200,
      errorMessage: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      errorCode: 500,
      errorMessage: "Server Error",
      data: null,
    });
  }
};