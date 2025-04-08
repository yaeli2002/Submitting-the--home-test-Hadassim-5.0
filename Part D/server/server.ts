import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import orderRoutes from "./routes/order.routes";
import productRoutes from "./routes/product.routes";
import { connectDB } from "./database";
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

app.listen(5001, async () => {
  console.log("Listening on port 5001");
  await connectDB();
});
