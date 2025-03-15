// server.js

require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to MongoDB
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/cold_storage_db");
}


main()
    .then(() => console.log('MongoDB connected!'))
    .catch(err => {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    });

// Define Mongoose Schemas and Models

// Contracts Schema
const contractSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    contract_number: { type: String, required: true, unique: true },
    farmer_id: { type: String, required: true },
    storage_unit_id: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    terms: { type: String },
    amount: { type: Number, required: true, min: 0 },
});
const Contract = mongoose.model("Contract", contractSchema);

// Farmers Schema
const farmerSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    identity_number: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: /^.+@.+\..+$/ },
    phone_number: { type: String, required: true },
    address: { type: String },
    farm_details: { type: String },
    production_records: { type: String },
    equipment_assets: { type: String },
    land_ownership: { type: String },
});
const Farmer = mongoose.model('Farmer', farmerSchema);

// Buyers Schema
const buyerSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    identity_number: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: /^.+@.+\..+$/ },
    phone_number: { type: String, required: true },
    address: { type: String },
});
const Buyer = mongoose.model('Buyer', buyerSchema);

// StorageUnits Schema
const storageUnitSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    storage_number: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true, min: 0 },
    location: { type: String, required: true },
    owner: { type: String, required: true },
    ownership_status: { type: String, enum: ['Owned', 'Leased'], required: true },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    contract_id: { type: String },
});
const StorageUnit = mongoose.model('StorageUnit', storageUnitSchema);

// Inventory Schema
const inventorySchema = new mongoose.Schema({
    inventory_id: { type: String, required: true, unique: true },
    storage_unit_id: { type: String, required: true },
    vegetable_name: { type: String, required: true },
    variety: { type: String },
    quantity: { type: Number, required: true, min: 0 },
    date_stored: { type: Date, required: true },
    expiry_date: { type: Date, required: true },
    buyer_id: { type: String, required: true },
});
const Inventory = mongoose.model('Inventory', inventorySchema);

// User Validation (Authentication)
const validUsername = 'admin';
const validPassword = 'password';

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Login attempt: username=${username}`);
    if (username === validUsername && password === validPassword) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Contracts Endpoints

// Get all contracts
app.get('/api/contracts', async (req, res) => {
    try {
        const contracts = await Contract.find();
        console.log(contracts);
        res.json(contracts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Get a single contract by ID
app.get('/api/contracts/:id', async (req, res) => {
    try {
        const contract = await Contract.findOne({ id: req.params.id });
        if (!contract) {
            return res.status(404).send('Contract not found');
        }
        res.json(contract);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Create a new contract
app.post('/api/contracts', async (req, res) => {
    try {
        const newContract = new Contract(req.body);
        await newContract.save();
        res.status(201).json(newContract);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Update a contract by ID
app.put('/api/contracts/:id', async (req, res) => {
    try {
        const updatedContract = await Contract.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedContract) {
            return res.status(404).send('Contract not found');
        }
        res.json(updatedContract);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Delete a contract by ID
app.delete('/api/contracts/:id', async (req, res) => {
    try {
        const deletedContract = await Contract.findOneAndDelete({ id: req.params.id });
        if (!deletedContract) {
            return res.status(404).send('Contract not found');
        }
        res.json({ message: 'Contract deleted successfully', affectedRows: 1 });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Farmers Endpoints

// Get all farmers
app.get('/api/farmers', async (req, res) => {
    try {
        const farmers = await Farmer.find();
        res.json(farmers);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Get a single farmer by ID
app.get('/api/farmers/:id', async (req, res) => {
    try {
        const farmer = await Farmer.findOne({ id: req.params.id });
        if (!farmer) {
            return res.status(404).send('Farmer not found');
        }
        res.json(farmer);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Create a new farmer
app.post('/api/farmers', async (req, res) => {
    try {
        const newFarmer = new Farmer(req.body);
        await newFarmer.save();
        res.status(201).json(newFarmer);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Update a farmer by ID
app.put('/api/farmers/:id', async (req, res) => {
    try {
        const updatedFarmer = await Farmer.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedFarmer) {
            return res.status(404).send('Farmer not found');
        }
        res.json(updatedFarmer);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Delete a farmer by ID
app.delete('/api/farmers/:id', async (req, res) => {
    try {
        const deletedFarmer = await Farmer.findOneAndDelete({ id: req.params.id });
        if (!deletedFarmer) {
            return res.status(404).send('Farmer not found');
        }
        res.json({ message: 'Farmer deleted successfully', affectedRows: 1 });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Buyers Endpoints

// Get all buyers
app.get('/api/buyers', async (req, res) => {
    try {
        const buyers = await Buyer.find();
        res.json(buyers);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Get a single buyer by ID
app.get('/api/buyers/:id', async (req, res) => {
    try {
        const buyer = await Buyer.findOne({ id: req.params.id });
        if (!buyer) {
            return res.status(404).send('Buyer not found');
        }
        res.json(buyer);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Create a new buyer
app.post('/api/buyers', async (req, res) => {
    try {
        const newBuyer = new Buyer(req.body);
        await newBuyer.save();
        res.status(201).json(newBuyer);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Update a buyer by ID
app.put('/api/buyers/:id', async (req, res) => {
    try {
        const updatedBuyer = await Buyer.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedBuyer) {
            return res.status(404).send('Buyer not found');
        }
        res.json(updatedBuyer);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Delete a buyer by ID
app.delete('/api/buyers/:id', async (req, res) => {
    try {
        const deletedBuyer = await Buyer.findOneAndDelete({ id: req.params.id });
        if (!deletedBuyer) {
            return res.status(404).send('Buyer not found');
        }
        res.json({ message: 'Buyer deleted successfully', affectedRows: 1 });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Storage Units Endpoints

// Get all storage units
app.get('/api/storageunits', async (req, res) => {
    try {
        const storageUnits = await StorageUnit.find();
        res.json(storageUnits);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Get a single storage unit by ID
app.get('/api/storageunits/:id', async (req, res) => {
    try {
        const storageUnit = await StorageUnit.findOne({ id: req.params.id });
        if (!storageUnit) {
            return res.status(404).send('Storage Unit not found');
        }
        res.json(storageUnit);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Create a new storage unit
app.post('/api/storageunits', async (req, res) => {
    try {
        const newStorageUnit = new StorageUnit(req.body);
        await newStorageUnit.save();
        res.status(201).json(newStorageUnit);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Update a storage unit by ID
app.put('/api/storageunits/:id', async (req, res) => {
    try {
        const updatedStorageUnit = await StorageUnit.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedStorageUnit) {
            return res.status(404).send('Storage Unit not found');
        }
        res.json(updatedStorageUnit);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Delete a storage unit by ID
app.delete('/api/storageunits/:id', async (req, res) => {
    try {
        const deletedStorageUnit = await StorageUnit.findOneAndDelete({ id: req.params.id });
        if (!deletedStorageUnit) {
            return res.status(404).send('Storage Unit not found');
        }
        res.json({ message: 'Storage Unit deleted successfully', affectedRows: 1 });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Inventory Endpoints

// Get all inventory items
app.get('/api/inventory', async (req, res) => {
    try {
        const inventory = await Inventory.find();
        res.json(inventory);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Get a single inventory item by ID
app.get('/api/inventory/:id', async (req, res) => {
    try {
        const inventoryItem = await Inventory.findOne({ inventory_id: req.params.id });
        if (!inventoryItem) {
            return res.status(404).send('Inventory Item not found');
        }
        res.json(inventoryItem);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Create a new inventory item
app.post('/api/inventory', async (req, res) => {
    try {
        const newInventoryItem = new Inventory(req.body);
        await newInventoryItem.save();
        res.status(201).json(newInventoryItem);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Update an inventory item by ID
app.put('/api/inventory/:id', async (req, res) => {
    try {
        const updatedInventoryItem = await Inventory.findOneAndUpdate(
            { inventory_id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedInventoryItem) {
            return res.status(404).send('Inventory Item not found');
        }
        res.json(updatedInventoryItem);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Delete an inventory item by ID
app.delete('/api/inventory/:id', async (req, res) => {
    try {
        const deletedInventoryItem = await Inventory.findOneAndDelete({ inventory_id: req.params.id });
        if (!deletedInventoryItem) {
            return res.status(404).send('Inventory Item not found');
        }
        res.json({ message: 'Inventory Item deleted successfully', affectedRows: 1 });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
