// server.js

require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json()); // Built-in middleware for parsing JSON
app.use(express.static('public'));

// Connect to MongoDB
async function main() {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/cold_storage_db", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
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
}, { timestamps: true });

const Contract = mongoose.model("Contract", contractSchema, "Contracts");

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
}, { timestamps: true });

const Farmer = mongoose.model('Farmer', farmerSchema, "Farmers");

// Buyers Schema
const buyerSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    identity_number: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: /^.+@.+\..+$/ },
    phone_number: { type: String, required: true },
    address: { type: String },
}, { timestamps: true });

const Buyer = mongoose.model('Buyer', buyerSchema, "Buyers");

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
}, { timestamps: true });

const StorageUnit = mongoose.model('StorageUnit', storageUnitSchema, "StorageUnits");

// Inventory Schema
const inventorySchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    storage_unit_id: { type: String, required: true },
    vegetable_name: { type: String, required: true },
    variety: { type: String },
    quantity: { type: Number, required: true, min: 0 },
    date_stored: { type: Date, required: true },
    expiry_date: { type: Date, required: true },
    buyer_id: { type: String, required: true },
}, { timestamps: true });

const Inventory = mongoose.model('Inventory', inventorySchema, "Inventory");

// User Validation (Authentication)
// **Note:** For production, consider using a more secure authentication method like JWT or OAuth.

const validUsername = process.env.VALID_USERNAME || 'admin';
const validPassword = process.env.VALID_PASSWORD || 'password';

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
        res.json(contracts);
    } catch (err) {
        console.error('Error fetching contracts:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a single contract by ID
app.get('/api/contracts/:id', async (req, res) => {
    try {
        const contract = await Contract.findOne({ id: req.params.id });
        if (!contract) {
            return res.status(404).json({ error: 'Contract not found' });
        }
        res.json(contract);
    } catch (err) {
        console.error('Error fetching contract:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new contract
app.post('/api/contracts', async (req, res) => {
    try {
        const newContract = new Contract(req.body);
        await newContract.save();
        res.status(201).json(newContract);
    } catch (err) {
        console.error('Error creating contract:', err);
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
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
            return res.status(404).json({ error: 'Contract not found' });
        }
        res.json(updatedContract);
    } catch (err) {
        console.error('Error updating contract:', err);
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Delete a contract by ID
app.delete('/api/contracts/:id', async (req, res) => {
    try {
        const deletedContract = await Contract.findOneAndDelete({ id: req.params.id });
        if (!deletedContract) {
            return res.status(404).json({ error: 'Contract not found' });
        }
        res.json({ message: 'Contract deleted successfully', affectedRows: 1 });
    } catch (err) {
        console.error('Error deleting contract:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Farmers Endpoints

// Get all farmers
app.get('/api/farmers', async (req, res) => {
    try {
        const farmers = await Farmer.find();
        res.json(farmers);
    } catch (err) {
        console.error('Error fetching farmers:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a single farmer by ID
app.get('/api/farmers/:id', async (req, res) => {
    try {
        const farmer = await Farmer.findOne({ id: req.params.id });
        if (!farmer) {
            return res.status(404).json({ error: 'Farmer not found' });
        }
        res.json(farmer);
    } catch (err) {
        console.error('Error fetching farmer:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new farmer
app.post('/api/farmers', async (req, res) => {
    try {
        const newFarmer = new Farmer(req.body);
        await newFarmer.save();
        res.status(201).json(newFarmer);
    } catch (err) {
        console.error('Error creating farmer:', err);
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
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
            return res.status(404).json({ error: 'Farmer not found' });
        }
        res.json(updatedFarmer);
    } catch (err) {
        console.error('Error updating farmer:', err);
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Delete a farmer by ID
app.delete('/api/farmers/:id', async (req, res) => {
    try {
        const deletedFarmer = await Farmer.findOneAndDelete({ id: req.params.id });
        if (!deletedFarmer) {
            return res.status(404).json({ error: 'Farmer not found' });
        }
        res.json({ message: 'Farmer deleted successfully', affectedRows: 1 });
    } catch (err) {
        console.error('Error deleting farmer:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Buyers Endpoints

// Get all buyers
app.get('/api/buyers', async (req, res) => {
    try {
        const buyers = await Buyer.find();
        res.json(buyers);
    } catch (err) {
        console.error('Error fetching buyers:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a single buyer by ID
app.get('/api/buyers/:id', async (req, res) => {
    try {
        const buyer = await Buyer.findOne({ id: req.params.id });
        if (!buyer) {
            return res.status(404).json({ error: 'Buyer not found' });
        }
        res.json(buyer);
    } catch (err) {
        console.error('Error fetching buyer:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new buyer
app.post('/api/buyers', async (req, res) => {
    try {
        const newBuyer = new Buyer(req.body);
        await newBuyer.save();
        res.status(201).json(newBuyer);
    } catch (err) {
        console.error('Error creating buyer:', err);
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Update a buyer by ID
app.put('/api/buyers/:id', async (req, res) => {
    try {
        console.log("Request parameters:", req.params.id);  // Debugging: check if id is being passed correctly
        console.log("Request body:", req.body);  // Debugging: log the update data
        
        const updatedBuyer = await Buyer.findOneAndUpdate(
            { id: req.params.id },  // Ensure this field is named `id` in your schema
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedBuyer) {
            console.log("No matching buyer found");  // Debugging: check if a match is found
            return res.status(404).json({ error: 'Buyer not found' });
        }
        
        res.json(updatedBuyer);
    } catch (err) {
        console.error('Error updating buyer:', err);
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});



// Delete a buyer by ID
app.delete('/api/buyers/:id', async (req, res) => {
    try {
        const deletedBuyer = await Buyer.findOneAndDelete({ id: req.params.id });
        if (!deletedBuyer) {
            return res.status(404).json({ error: 'Buyer not found' });
        }
        res.json({ message: 'Buyer deleted successfully', affectedRows: 1 });
    } catch (err) {
        console.error('Error deleting buyer:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Storage Units Endpoints

// Get all storage units
app.get('/api/storageunits', async (req, res) => {
    try {
        const storageUnits = await StorageUnit.find();
        res.json(storageUnits);
    } catch (err) {
        console.error('Error fetching storage units:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a single storage unit by ID
app.get('/api/storageunits/:id', async (req, res) => {
    try {
        const storageUnit = await StorageUnit.findOne({ id: req.params.id });
        if (!storageUnit) {
            return res.status(404).json({ error: 'Storage Unit not found' });
        }
        res.json(storageUnit);
    } catch (err) {
        console.error('Error fetching storage unit:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new storage unit
app.post('/api/storageunits', async (req, res) => {
    try {
        const newStorageUnit = new StorageUnit(req.body);
        await newStorageUnit.save();
        res.status(201).json(newStorageUnit);
    } catch (err) {
        console.error('Error creating storage unit:', err);
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
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
            return res.status(404).json({ error: 'Storage Unit not found' });
        }
        res.json(updatedStorageUnit);
    } catch (err) {
        console.error('Error updating storage unit:', err);
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Delete a storage unit by ID
app.delete('/api/storageunits/:id', async (req, res) => {
    try {
        const deletedStorageUnit = await StorageUnit.findOneAndDelete({ id: req.params.id });
        if (!deletedStorageUnit) {
            return res.status(404).json({ error: 'Storage Unit not found' });
        }
        res.json({ message: 'Storage Unit deleted successfully', affectedRows: 1 });
    } catch (err) {
        console.error('Error deleting storage unit:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Inventory Endpoints

// Get all inventory items
app.get('/api/inventories', async (req, res) => {
    try {
        const inventory = await Inventory.find();
        res.json(inventory);
    } catch (err) {
        console.error('Error fetching inventory:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a single inventory item by ID
app.get('/api/inventory/:id', async (req, res) => {
    console.log('Received request to fetch inventory item with ID:', req.params.id); // Log request ID

    try {
        const inventoryItem = await Inventory.findOne({ id: req.params.id });
        
        if (!inventoryItem) {
            console.warn('No inventory item found with ID:', req.params.id); // Log if item not found
            return res.status(404).json({ error: 'Inventory Item not found' });
        }

        console.log('Inventory item found:', inventoryItem); // Log found item
        res.json(inventoryItem);
    } catch (err) {
        console.error('Error fetching inventory item:', err); // Log error details
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Create a new inventory item
app.post('/api/inventory', async (req, res) => {
    try {
        const newInventoryItem = new Inventory(req.body);
        await newInventoryItem.save();
        res.status(201).json(newInventoryItem);
    } catch (err) {
        console.error('Error creating inventory item:', err);
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Update an inventory item by ID
app.put('/api/inventory/:id', async (req, res) => {
    try {
        const updatedInventoryItem = await Inventory.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedInventoryItem) {
            return res.status(404).json({ error: 'Inventory Item not found' });
        }
        res.json(updatedInventoryItem);
    } catch (err) {
        console.error('Error updating inventory item:', err);
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Delete an inventory item by ID
app.delete('/api/inventory/:id', async (req, res) => {
    try {
        const deletedInventoryItem = await Inventory.findOneAndDelete({ id: req.params.id });
        if (!deletedInventoryItem) {
            return res.status(404).json({ error: 'Inventory Item not found' });
        }
        res.json({ message: 'Inventory Item deleted successfully', affectedRows: 1 });
    } catch (err) {
        console.error('Error deleting inventory item:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
