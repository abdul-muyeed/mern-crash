import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/db.js";
import ProductRoutes from "./routes/product.js";
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/products", ProductRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/dist")));
    
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    }
    
}



app.listen(PORT, async () => {
  await connectDB();
  console.error("Server is running on http://localhost:"+PORT);
});
