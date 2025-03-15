
DROP DATABASE IF EXISTS cruise_db;


CREATE DATABASE cruise_db;


USE cruise_db;


CREATE TABLE Cruises (
    cruise_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255),
    capacity INT,
    sea_route_details TEXT,
    speed INT,
    operational_status VARCHAR(255)
);


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


CREATE TABLE Sea_routes (
    sea_route_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
    sea_route_number INT NOT NULL UNIQUE,
    source VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    distance DECIMAL(10, 2) NOT NULL,
    travel_time INT,
    ports TEXT,
    fare DECIMAL(10, 2)
);


CREATE TABLE Bookings (
    booking_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
    booking_date DATE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    passenger_id VARCHAR(255),
    cruise_id VARCHAR(255),
    sea_route_id VARCHAR(255),
    berth_number VARCHAR(10),
    status VARCHAR(255),
    FOREIGN KEY (passenger_id) REFERENCES Passengers(passenger_id),
    FOREIGN KEY (cruise_id) REFERENCES Cruises(cruise_id),
    FOREIGN KEY (sea_route_id) REFERENCES Sea_routes(sea_route_id)
);


CREATE TABLE Employees (
    employee_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(255),
    salary DECIMAL(10, 2),
    hire_date DATE,
    cruise_id VARCHAR(255),
    employee_type ENUM('White Collar', 'Blue Collar') NOT NULL,
    FOREIGN KEY (cruise_id) REFERENCES Cruises(cruise_id)
);



INSERT INTO Cruises (cruise_id, name, type, capacity, sea_route_details, speed, operational_status)
VALUES 
('C001', 'Caribbean Explorer', 'Luxury', 2000, 'Miami - San Juan - St. Maarten - Barbados', 25, 'Operational'),
('C002', 'Mediterranean Odyssey', 'Standard', 1500, 'Barcelona - Rome - Athens - Istanbul', 22, 'Operational'),
('C003', 'Pacific Adventure', 'Luxury', 2500, 'Sydney - Fiji - Hawaii - San Francisco', 28, 'Operational');


INSERT INTO Passengers (passenger_id, name, identity_number, email, phone_number, address, age, gender)
VALUES 
('P001', 'Alice Johnson', 'ID123456', 'alice.johnson@example.com', '1234567890', '123 Sea St', 30, 'Female'),
('P002', 'Bob Smith', 'ID123457', 'bob.smith@example.com', '1234567891', '124 Sea St', 45, 'Male'),
('P003', 'Charlie Brown', 'ID123458', 'charlie.brown@example.com', '1234567892', '125 Sea St', 35, 'Male');


INSERT INTO Sea_routes (sea_route_id, sea_route_number, source, destination, distance, travel_time, ports, fare)
VALUES 
('R001', 101, 'Miami', 'Barbados', 1500.75, 72, 'Miami, San Juan, St. Maarten, Barbados', 1200.00),
('R002', 102, 'Barcelona', 'Istanbul', 2000.50, 96, 'Barcelona, Rome, Athens, Istanbul', 1500.00),
('R003', 103, 'Sydney', 'San Francisco', 8000.00, 168, 'Sydney, Fiji, Hawaii, San Francisco', 2500.00);


INSERT INTO Bookings (booking_id, booking_date, amount, passenger_id, cruise_id, sea_route_id, berth_number, status)
VALUES 
('B001', '2024-01-01', 1000.00, 'P001', 'C001', 'R001', 'A1', 'Confirmed'),
('B002', '2024-02-01', 1200.00, 'P002', 'C002', 'R002', 'B2', 'Confirmed'),
('B003', '2024-03-01', 1500.00, 'P003', 'C003', 'R003', 'C3', 'Cancelled');

INSERT INTO Employees (employee_id, name, role, department, email, phone_number, salary, hire_date, cruise_id, employee_type) VALUES
('E001', 'John Smith', 'Captain', 'Operations', 'john.smith@cruise.com', '555-1234', 85000.00, '2020-05-15', 'C001', 'White Collar'),
('E002', 'Jane Doe', 'Chief Engineer', 'Engineering', 'jane.doe@cruise.com', '555-5678', 78000.00, '2019-08-01', 'C002', 'White Collar'),
('E003', 'Emily Clark', 'HR Manager', 'Human Resources', 'emily.clark@cruise.com', '555-8765', 65000.00, '2021-01-12', 'C003', 'White Collar'),
('E004', 'Michael Brown', 'Finance Manager', 'Finance', 'michael.brown@cruise.com', '555-2345', 72000.00, '2018-11-10', 'C001', 'White Collar'),
('E005', 'Sarah Wilson', 'Operations Manager', 'Operations', 'sarah.wilson@cruise.com', '555-3456', 69000.00, '2022-03-07', 'C002', 'White Collar'),
('E006', 'Carlos Hernandez', 'Cleaner', NULL, 'Carlos@cruise.com', '555-1011', 32000.00, '2018-12-20', 'C001', 'Blue Collar'),
('E007', 'Ana Rodriguez', 'Mechanic', NULL, 'Ana@cruise.com', '555-2022', 35000.00, '2019-02-15', 'C002', 'Blue Collar'),
('E008', 'Mohammed Ali', 'Cook', NULL, 'Mohammed@cruise.com', '555-3033', 31000.00, '2020-09-07', 'C003', 'Blue Collar'),
('E009', 'Huang Lee', 'Electrician', NULL, 'Huang@cruise.com', '555-4044', 37000.00, '2021-04-10', 'C001', 'Blue Collar'),
('E010', 'Kumar Patel', 'Security Guard', NULL, 'Kumar@cruise.com', '555-5055', 29000.00, '2019-11-20', 'C002', 'Blue Collar');


SELECT * FROM Cruises;


SELECT * FROM Passengers;


SELECT * FROM Sea_routes;


SELECT * FROM Bookings;

SELECT * FROM employees;
