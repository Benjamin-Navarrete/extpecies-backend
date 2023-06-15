-- Insertar Roles
INSERT INTO roles (nombre) VALUES ('administrador'), ('editor'), ('usuario');

-- Insertar Permisos
INSERT INTO permisos (codigo, descripcion) VALUES 
('ESP_01', 'crear especie'),
('ESP_02', 'editar especie'),
('ESP_03', 'eliminar especie'),
('USU_01', 'crear usuario'),
('USU_02', 'editar usuario'),
('USU_03', 'eliminar usuario'),
('MEN_01', 'gestionar usuarios'),
('MEN_02', 'gestionar especies');

-- Asignar permisos al Rol de Administrador
INSERT INTO rol_permisos (rol_id, permiso_id) VALUES 
('administrador', 'ESP_01'),
('administrador', 'ESP_02'),
('administrador', 'ESP_03'),
('administrador', 'USU_01'),
('administrador', 'USU_02'),
('administrador', 'USU_03'),
('administrador', 'MEN_01'),
('administrador', 'MEN_02');

-- Asignar permisos al Rol de Editor
INSERT INTO rol_permisos (rol_id, permiso_id) VALUES 
('editor', 'ESP_01'),
('editor', 'ESP_02'),
('editor', 'ESP_03'),
('editor', 'MEN_02');

-- Insertar Usuarios
INSERT INTO usuarios (nombre, nombres, apellidos, correo, password, pais) VALUES 
('administrador', 'Admin', 'User', 'admin@ejemplo.com', '$2b$10$7RsLxq4bigJohMB2ceECJOKBpBr1kQJ2XlMT0qRqU8/.pM2/08yGy', 'Chile'),
('editor', 'Editor', 'User', 'editor@ejemplo.com', '$2b$10$wsVM.M.qgtTB.nbUUsznP.eCN1RZYMSH8Lr4nVSnMNPO.YsQRVCZW', 'Chile'),
('usuario', 'Regular', 'User', 'user@ejemplo.com', '$2b$10$WKikwev3XwW5ZuM.XXfx9uxtJplQc.dhHdusPEMfdyAbzKNFi.4tq', 'Chile');
