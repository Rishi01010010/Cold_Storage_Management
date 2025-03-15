-- Drop the database
DROP DATABASE IF EXISTS railway_db;

-- Create the database
CREATE DATABASE railway_db;

-- Use the created database
USE railway_db;

-- Create cruises table
CREATE TABLE cruises (
    cruise_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255),
    capacity INT,
    route_details TEXT,
    speed INT,
    operational_status VARCHAR(255)
);

-- Create Passengers table
CREATE TABLE Passengers (
    passenger_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    identity_number VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    age INT,
    gender VARCHAR(10)
);

-- Create Routes table
CREATE TABLE Routes (
    route_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
    route_number INT NOT NULL UNIQUE,
    source VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    distance DECIMAL(10, 2) NOT NULL,
    travel_time INT,
    stops TEXT,
    fare DECIMAL(10, 2)
);

-- Create Bookings table
CREATE TABLE Bookings (
    booking_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
    booking_date DATE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    passenger_id VARCHAR(255),
    cruise_id VARCHAR(255),
    route_id VARCHAR(255),
    seat_number VARCHAR(10),
    status VARCHAR(255),
    FOREIGN KEY (passenger_id) REFERENCES Passengers(passenger_id),
    FOREIGN KEY (cruise_id) REFERENCES cruises(cruise_id),
    FOREIGN KEY (route_id) REFERENCES Routes(route_id)
);

-- Insert sample data into cruises table
INSERT INTO cruises (cruise_id, name, type, capacity, route_details, speed, operational_status)
VALUES 
('T123', 'Express 1', 'Express', 500, 'Details about Express 1', 120, 'Operational'),
('T124', 'Express 2', 'Express', 600, 'Details about Express 2', 130, 'Operational'),
('T125', 'Local 1', 'Local', 300, 'Details about Local 1', 80, 'Operational'),
('T126', 'Local 2', 'Local', 350, 'Details about Local 2', 90, 'Operational'),
('T127', 'Superfast 1', 'Superfast', 700, 'Details about Superfast 1', 150, 'Operational');

-- Insert sample data into Passengers table
INSERT INTO Passengers (passenger_id, name, identity_number, email, phone_number, address, age, gender)
VALUES 
('P123', 'John Doe', 'ID123456', 'john.doe@example.com', '1234567890', '123 Main St', 30, 'Male'),
('P124', 'Jane Smith', 'ID123457', 'jane.smith@example.com', '1234567891', '124 Main St', 25, 'Female'),
('P125', 'Jim Brown', 'ID123458', 'jim.brown@example.com', '1234567892', '125 Main St', 40, 'Male'),
('P126', 'Jake White', 'ID123459', 'jake.white@example.com', '1234567893', '126 Main St', 35, 'Male'),
('P127', 'Lucy Black', 'ID123460', 'lucy.black@example.com', '1234567894', '127 Main St', 28, 'Female');

-- Insert sample data into Routes table
INSERT INTO Routes (route_id, route_number, source, destination, distance, travel_time, stops, fare)
VALUES 
('R123', 123, 'City A', 'City B', 150.75, 150, 'Stop1, Stop2', 100.00),
('R124', 124, 'City B', 'City C', 200.25, 195, 'Stop3, Stop4', 150.00),
('R125', 125, 'City C', 'City D', 300.50, 285, 'Stop5, Stop6', 200.00),
('R126', 126, 'City D', 'City E', 400.75, 370, 'Stop7, Stop8', 250.00),
('R127', 127, 'City E', 'City F', 500.00, 445, 'Stop9, Stop10', 300.00);

-- Insert sample data into Bookings table
INSERT INTO Bookings (booking_id, booking_date, amount, passenger_id, cruise_id, route_id, seat_number, status)
VALUES 
('B123', '2024-01-01', 50.00, 'P123', 'T123', 'R123', 'A1', 'Confirmed'),
('B124', '2024-01-02', 60.00, 'P124', 'T124', 'R124', 'B2', 'Confirmed'),
('B125', '2024-01-03', 70.00, 'P125', 'T125', 'R125', 'C3', 'Confirmed'),
('B126', '2024-01-04', 80.00, 'P126', 'T126', 'R126', 'D4', 'Cancelled'),
('B127', '2024-01-05', 90.00, 'P127', 'T127', 'R127', 'E5', 'Confirmed');

-- Select all data from Bookings table
SELECT * FROM Bookings;

-- Select all data from Routes table
SELECT * FROM Routes;

-- Select all data from Passengers table
SELECT * FROM Passengers;

-- Select all data from cruises table
SELECT * FROM cruises;
