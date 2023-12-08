-- Create a database
CREATE DATABASE IF NOT EXISTS members_db;
USE members_db;

-- Create a table of user information
CREATE TABLE IF NOT EXISTS user (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL UNIQUE,
    password VARCHAR(16) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    firebaseUid VARCHAR (50) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);
-- Validation code for users table in file folder seeds> user.js