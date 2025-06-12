import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
 import products from "../data/products.js";
import {validateProduct } from "../middleware/validateProduct.js"; 
const router = Router();


// GET all products
router.get("/", (req, res) => {
  let result = [...products];

  // Filtering
  if (req.query.category) {
    result = result.filter((p) => p.category === req.query.category);
  }

  // Search
  if (req.query.search) {
    const q = req.query.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = result.slice(start, end);

  res.json({
    total: result.length,
    page,
    limit,
    data: paginated,
  });
});

// GET product by ID
router.get("/:id", (req, res, next) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    const error = new Error("Product not found");
    error.status = 404;
    return next(error);
  }
  res.json(product);
});

// POST create product
router.post("/", validateProduct, (req, res) => {
  const product = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString(),
  };
  products.push(product);
  res.status(201).json(product);
});

// PUT update product
router.put("/:id", validateProduct, (req, res, next) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    const error = new Error("Product not found");
    error.status = 404;
    return next(error);
  }

  products[index] = {
    ...products[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  res.json(products[index]);
});

// DELETE product
router.delete("/:id", (req, res, next) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    const error = new Error("Product not found");
    error.status = 404;
    return next(error);
  }

  products.splice(index, 1);
  res.status(204).send();
});

export default router;
