# ❄️ Cold Storage Management System: Efficient Vegetable Storage ❄️

Welcome to the *Cold Storage Management System*, a comprehensive solution developed by Mohd Maaz (BITS ID: 2024MT12175) to streamline vegetable storage operations. This project replaces paper-based systems with a digital platform that tracks vegetable bags, manages lot numbers, calculates storage rent, and generates invoices for farmers. Built using JavaScript, MongoDB, and a web-based frontend, it ensures efficient management, accurate billing, and traceability in cold storage facilities.

## 🔍 Project Overview

Cold storage facilities often face challenges in tracking vegetable storage, calculating rent, and managing billing manually. The *Cold Storage Management System* addresses these issues by providing a digital solution to record inboarding/outboarding of vegetable bags, categorize them as "Seed" or "Vegetable," assign lot numbers, calculate rent based on storage duration, and generate detailed reports. It improves accounting accuracy and enhances operational efficiency for farmers and storage managers.

### ✨ Key Features:

- *Farmer Management:* Store and manage farmer details (ID, name, contact, address).
- *Inboarding/Outboarding:* Track vegetable bags with dates and lot numbers.
- *Vegetable Categorization:* Differentiate between "Seed" and "Vegetable" for rent calculation.
- *Rent Calculation:* Compute storage rent based on category, duration, and predefined rates.
- *Report Generation:* Create detailed billing and storage reports for farmers.
- *Web Interface:* User-friendly dashboard for managing storage operations.

## 🚀 Getting Started

### 1. *Prerequisites:*
- Node.js and npm installed on your system.
- MongoDB installed and running locally or on a cloud instance.
- A modern web browser (e.g., Chrome, Firefox).

### 2. *Setting Up:*

- Clone the repository (if hosted on GitHub):
  ```bash
  git clone https://github.com/your-username/Cold_Storage_Management_System.git
  cd Cold_Storage_Management_System
  ```

- Install dependencies:
  ```bash
  npm install
  ```

- Configure MongoDB:
  - Start your MongoDB server: `mongod`.
  - Run the MongoDB commands from `mongo_commands.txt` or `new_mongo_com.txt` to set up the database (`cold_storage_db`) and collections:
    ```bash
    mongo < mongo_commands.txt
    ```

- Start the server:
  ```bash
  node server.js
  ```

- Open a web browser and navigate to `http://localhost:3000` to access the application.

### 3. *Using the System:*

- **Login:** Access the dashboard via `public/login.html`.
- **Manage Farmers:** Add or edit farmer details using `public/add-farmers.html` or `public/edit-farmers.html`.
- **Track Inventory:** Add vegetable bags with `public/add-inventory.html` and view them in `public/inventory.html`.
- **Generate Reports:** View storage and billing reports for farmers.

### 4. *Sample Output:*
- **Adding a Farmer:**
  ```
  Farmer FARM123456 added with name John Doe
  ```
- **Adding Inventory:**
  ```
  Added 500 kg of Carrots to Storage Unit COLD-001
  ```
- **Contract Creation:**
  ```
  Contract ID 1234 created between Farmer FARM123456 and Storage Unit COLD-001
  ```

## 💾 Directory Structure

```
Cold_Storage_Management_System/
│
├── commands.sql              # SQL commands (for reference or migration)
├── dummy server.js           # Test server script
├── farmers.txt               # Sample farmer data
├── mongo_commands.txt        # MongoDB setup commands
├── new-commands.sql          # Updated SQL commands
├── new_mongo_com.txt         # Updated MongoDB commands
├── package-lock.json         # npm dependency lock file
├── package.json              # Project dependencies and scripts
├── README.md                 # Project documentation
├── server.js                 # Main backend server script
│
└── public/                   # Frontend assets
    ├── add-buyers.html       # Add new buyers page
    ├── add-buyers.js         # Script for add buyers
    ├── add-contract.html     # Add contract page
    ├── add-contract.js       # Script for add contract
    ├── add-farmers.html      # Add farmers page
    ├── add-farmers.js        # Script for add farmers
    ├── add-inventory.html    # Add inventory page
    ├── add-inventory.js      # Script for add inventory
    ├── add-storageUnits.html # Add storage units page
    ├── add-storageUnits.js   # Script for add storage units
    ├── agri.png              # Image asset (e.g., logo)
    ├── buyers.html           # View buyers page
    ├── buyers.js             # Script for buyers page
    ├── edit-buyers.html      # Edit buyers page
    ├── edit-buyers.js        # Script for edit buyers
    ├── edit-farmers.html     # Edit farmers page
    ├── edit-farmers.js       # Script for edit farmers
    ├── edit-inventory.html   # Edit inventory page
    ├── edit-inventory.js     # Script for edit inventory
    ├── edit-storageUnits.html # Edit storage units page
    ├── edit-storageUnits.js  # Script for edit storage units
    ├── edit.html             # Generic edit page
    ├── edit.js               # Generic edit script
    ├── farmers.html          # View farmers page
    ├── farmers.js            # Script for farmers page
    ├── index.html            # Main dashboard page
    ├── inventory.html        # View inventory page
    ├── inventory.js          # Script for inventory page
    ├── login.html            # Login page
    ├── scripts.js            # General frontend scripts
    ├── storageUnits.html     # View storage units page
    ├── storageUnits.js       # Script for storage units page
    └── style.css             # CSS styles for the frontend
```

### 📝 Code Explanation

1. **server.js**:
   - Sets up the backend server using Node.js and Express.
   - Connects to MongoDB and handles API requests for farmer management, inventory tracking, and rent calculation.

2. **public/add-farmers.html & add-farmers.js**:
   - Provides a form to add new farmers and sends data to the server via JavaScript.

3. **public/inventory.html & inventory.js**:
   - Displays inventory details and allows adding/editing of vegetable bags.

4. **mongo_commands.txt**:
   - Contains MongoDB commands to create collections (`Farmers`, `Buyers`, `StorageUnits`, `Contracts`, `Inventory`) with validation schemas.

## 🌐 System Design

- **Database:** MongoDB with collections for Farmers, Buyers, Storage Units, Contracts, and Inventory.
- **Relationships:**
  - Farmers (1) ↔ (N) Contracts
  - Contracts (1) ↔ (1) Storage Units
  - Storage Units (1) ↔ (N) Inventory
  - Buyers (1) ↔ (N) Inventory
- **Frontend:** HTML5, CSS, JavaScript for a responsive web interface.
- **Backend:** Node.js and Express for handling requests and database operations.

## 🛠️ How It Works

1. *Farmer Management:* Add and manage farmer details via the web interface.
2. *Inventory Tracking:* Record inboarding/outboarding of vegetable bags with lot numbers and categories.
3. *Rent Calculation:* Automatically compute rent based on storage duration and vegetable type.
4. *Report Generation:* Generate billing reports summarizing storage details and costs.

## 🎯 Project Intent

The *Cold Storage Management System* aims to modernize vegetable storage operations by replacing inefficient paper-based systems with a digital solution. It ensures accurate tracking, billing, and reporting, benefiting farmers and storage managers alike.

## 🔧 Customization

Enhance the project with these ideas:
- *Real-Time Notifications:* Add alerts for expiring inventory items.
- *Mobile App:* Develop a mobile version for on-the-go access.
- *Advanced Reporting:* Include visualizations (e.g., charts) for storage trends.
- *Multi-Language Support:* Add support for regional languages.
