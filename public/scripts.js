document.addEventListener('DOMContentLoaded', () => {
    fetchContracts();

    document.getElementById('deleteContractForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const contractId = document.getElementById('deleteContractId').value;

        fetch(`/api/contracts/${contractId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete contract');
            }
            return response.json();
        })
        .then(data => {
            alert('Contract deleted successfully');
            fetchContracts(); // Refresh the contract list after deletion
        })
        .catch(error => {
            alert(`Error: ${error.message}`);
        });
    });

    document.getElementById('viewContracts').addEventListener('click', () => {
        fetchContracts();
        toggleTables('contractsTable');
    });

    document.getElementById('viewInventories').addEventListener('click', () => {
        fetchInventories();
        toggleTables('inventoriesTable');
    });

    document.getElementById('viewFarmers').addEventListener('click', () => {
        fetchFarmers();
        toggleTables('farmersTable');
    });

    document.getElementById('viewStorageUnits').addEventListener('click', () => {
        fetchStorageUnits();
        toggleTables('storageUnitsTable');
    });

    document.getElementById('viewBuyers').addEventListener('click', () => {
        fetchBuyers();
        toggleTables('buyersTable');
    });
});

function toggleTables(activeTableId) {
    const tableIds = ['contractsTable', 'inventoriesTable', 'farmersTable', 'storageUnitsTable', 'buyersTable'];
    tableIds.forEach(id => {
        document.getElementById(id).style.display = (id === activeTableId) ? 'block' : 'none';
    });
}

function fetchContracts() {
    fetch('/api/contracts')
        .then(response => response.json())
        .then(data => {
            let table = '<table>';
            table += '<tr><th>Contract ID</th><th>Contract Number</th><th>Farmer ID</th><th>Storage Unit ID</th><th>Start Date</th><th>End Date</th><th>Terms</th><th>Amount</th></tr>';
            data.forEach(contract => {
                table += `<tr>
                            <td>${contract.id}</td>
                            <td>${contract.contract_number}</td>
                            <td><a href="/farmers.html?id=${contract.farmer_id}">${contract.farmer_id}</a></td>
                            <td><a href="/storageUnits.html?id=${contract.storage_unit_id}">${contract.storage_unit_id}</a></td>
                            <td>${formatDate(contract.start_date)}</td>
                            <td>${formatDate(contract.end_date)}</td>
                            <td>${contract.terms}</td>
                            <td>${contract.amount}</td>
                          </tr>`;
            });
            table += '</table>';
            document.getElementById('contractsTable').innerHTML = table;
        })
        .catch(error => {
            console.error('Error fetching contracts:', error);
        });
}

function fetchInventories() {
    fetch('/api/inventories')
        .then(response => response.json())
        .then(data => {
            let table = '<table>';
            table += '<tr><th>Inventory ID</th><th>Storage Unit ID</th><th>Vegetable Name</th><th>Variety</th><th>Quantity</th><th>Date Stored</th><th>Expiry Date</th><th>Buyer ID</th></tr>';
            data.forEach(inventory => {
                table += `<tr>
                            <td><a href="/inventory.html?id=${inventory.id}">${inventory.id}</a></td>
                            <td><a href="/storageUnits.html?id=${inventory.storage_unit_id}">${inventory.storage_unit_id}</a></td>
                            <td>${inventory.vegetable_name}</td>
                            <td>${inventory.variety}</td>
                            <td>${inventory.quantity}</td>
                            <td>${formatDate(inventory.date_stored)}</td>
                            <td>${formatDate(inventory.expiry_date)}</td>
                            <td><a href="/buyers.html?id=${inventory.buyer_id}">${inventory.buyer_id}</a></td>
                          </tr>`;
            });
            table += '</table>';
            document.getElementById('inventoriesTable').innerHTML = table;
        })
        .catch(error => {
            console.error('Error fetching inventories:', error);
        });
}

function fetchFarmers() {
    fetch('/api/farmers')
        .then(response => response.json())
        .then(data => {
            let table = '<table>';
            table += '<tr><th>Farmer ID</th><th>Name</th><th>Identity Number</th><th>Email</th><th>Phone Number</th><th>Address</th><th>Farm Details</th><th>Production Records</th><th>Equipment Assets</th><th>Land Ownership</th></tr>';
            data.forEach(farmer => {
                table += `<tr>
                            <td><a href="/farmers.html?id=${farmer.id}">${farmer.id}</a></td>
                            <td>${farmer.name}</td>
                            <td>${farmer.identity_number}</td>
                            <td>${farmer.email}</td>
                            <td>${farmer.phone_number}</td>
                            <td>${farmer.address}</td>
                            <td>${farmer.farm_details}</td>
                            <td>${farmer.production_records}</td>
                            <td>${farmer.equipment_assets}</td>
                            <td>${farmer.land_ownership}</td>
                          </tr>`;
            });
            table += '</table>';
            document.getElementById('farmersTable').innerHTML = table;
        })
        .catch(error => {
            console.error('Error fetching farmers:', error);
        });
}

function fetchStorageUnits() {
    fetch('/api/storageUnits')
        .then(response => response.json())
        .then(data => {
            let table = '<table>';
            table += '<tr><th>Storage Unit ID</th><th>Storage_Unit Number</th><th>Capacity</th><th>Location</th><th>Owner</th><th>Ownership Status</th><th>Temperature</th><th>Humidity</th></tr>';
            data.forEach(storageUnit => {
                table += `<tr>
                            <td><a href="/storageUnits.html?id=${storageUnit.id}">${storageUnit.id}</a></td>
                            <td>${storageUnit.storage_number}</td>
                            <td>${storageUnit.capacity}</td>
                            <td>${storageUnit.location}</td>
                            <td>${storageUnit.owner}</td>
                            <td>${storageUnit.ownership_status}</td>
                            <td>${storageUnit.temperature}</td>
                            <td>${storageUnit.humidity}</td>
                          </tr>`;
            });
            table += '</table>';
            document.getElementById('storageUnitsTable').innerHTML = table;
        })
        .catch(error => {
            console.error('Error fetching storage units:', error);
        });
}

function fetchBuyers() {
    fetch('/api/buyers')
        .then(response => response.json())
        .then(data => {
            let table = '<table>';
            table += '<tr><th>Buyer ID</th><th>Name</th><th>Identity Number</th><th>Email</th><th>Phone Number</th><th>Address</th></tr>';
            data.forEach(buyer => {
                table += `<tr>
                            <td><a href="/buyers.html?id=${buyer.id}">${buyer.id}</a></td>
                            <td>${buyer.name}</td>
                            <td>${buyer.identity_number}</td>
                            <td>${buyer.email}</td>
                            <td>${buyer.phone_number}</td>
                            <td>${buyer.address}</td>
                          </tr>`;
            });
            table += '</table>';
            document.getElementById('buyersTable').innerHTML = table;
        })
        .catch(error => {
            console.error('Error fetching buyers:', error);
        });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid Date';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
