import jwt from "jsonwebtoken";
import config from "../config";
import { Usuario } from "../models/Usuario";

export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;
    const user = await Usuario.findByPk(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    console.log(user);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const isUser = async (req, res, next) => {
  const user = await Usuario.findByPk(req.userId);
  if (
    user.rol === "usuario" ||
    user.rol === "editor" ||
    user.rol === "administrador"
  ) {
    next();
    return;
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
};

export const isEditor = async (req, res, next) => {
  const user = await Usuario.findByPk(req.userId);
  if (user.rol === "editor" || user.rol === "administrador") {
    next();
    return;
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
};

export const isAdmin = async (req, res, next) => {
  const user = await Usuario.findByPk(req.userId);
  if (user.rol === "administrador") {
    next();
    return;
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
};
