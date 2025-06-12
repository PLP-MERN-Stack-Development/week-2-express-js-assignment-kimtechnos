import express from "express";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import productRoutes from "./routes/products.js"; 
import logger from "./middleware/logger.js";
import auth from "./middleware/auth.js";
import errorHandler from "./middleware/errorHandler.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(logger);
app.use(auth);

// Routes
app.use("/api/products", productRoutes)

// 404 Handler


// Error Handler
app.use(errorHandler);


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
