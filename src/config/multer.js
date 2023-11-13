// Archivo src\config\multer.js
// Importar multer para subir archivos
import multer from 'multer';

// Configurar multer para guardar las imágenes en una carpeta llamada uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Puedes usar otro nombre si quieres
  },
});

// Crear una instancia de multer con la configuración anterior
const upload = multer({ storage: storage });

export default upload;
