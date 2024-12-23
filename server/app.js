import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/db.js";
import ProductRoutes from "./routes/product.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/products", ProductRoutes);



app.listen(PORT, async () => {
  await connectDB();
  console.error("Server is running on http://localhost:"+PORT);
});
