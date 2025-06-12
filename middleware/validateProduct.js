// middleware/validateProduct.js

export function validateProduct(req, res, next) {
  const { name, description, price, category, inStock } = req.body;
  const errors = [];

  if (!name || typeof name !== "string")
    errors.push("Name must be a non-empty string");
  if (!description || typeof description !== "string")
    errors.push("Description must be a non-empty string");
  if (typeof price !== "number" || price <= 0)
    errors.push("Price must be a positive number");
  if (!category || typeof category !== "string")
    errors.push("Category must be a non-empty string");
  if (typeof inStock !== "boolean") errors.push("inStock must be a boolean");

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Invalid product data",
      details: errors,
    });
  }

  next();
}
