
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    role VARCHAR(100) NOT NULL
);

INSERT INTO employees (name, email, role)
VALUES
('Rahul', 'rahul@company.com', 'Developer'),
('Priya', 'priya@company.com', 'Designer');

SELECT * FROM employees;
