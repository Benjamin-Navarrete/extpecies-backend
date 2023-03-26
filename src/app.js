import express from "express";
import morgan from "morgan";
import cors from "cors";

import usuariosRoutes from "./routes/usuarios.routes";
import ubicacionesRoutes from "./routes/ubicaciones.routes";
import especiesRoutes from "./routes/especies.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/ubicaciones", ubicacionesRoutes);
app.use("/api/especies", especiesRoutes);
app.use("/api/auth", authRoutes);

export default app;
