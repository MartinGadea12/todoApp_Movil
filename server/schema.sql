CREATE DATABASE todoapp;

USE todoapp;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);


CREATE TABLE tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    task_name VARCHAR(100) NOT NULL,
    user_id INT,
    status BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO users (username, email) VALUES
('usuario1', 'usuario1@example.com'),
('usuario2', 'usuario2@example.com');

INSERT INTO tasks (task_name, user_id) VALUES
('Hacer la compra', 1),
('Preparar informe', 2);