import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/db.js";
import ProductRoutes from "./routes/product.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/products", ProductRoutes);



app.listen(3000, async () => {
  await connectDB();
  console.error("Server is running on http://localhost:3000");
});
