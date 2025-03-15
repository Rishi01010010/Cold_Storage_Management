document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const inventoryId = urlParams.get('id');

    fetch(`/api/inventory/${inventoryId}`)
        .then(response => response.json())
        .then(data => {
            let details = `<p>Inventory ID: ${data.id}</p>
                           <p>Storage Unit ID: ${data.storage_unit_id}</p>
                           <p>Vegetable Name: ${data.vegetable_name}</p>
                           <p>Variety: ${data.variety}</p>
                           <p>Quantity: ${data.quantity}</p>
                           <p>Date Stored: ${data.date_stored}</p>
                           <p>Expiry Date: ${data.expiry_date}</p>
                           <p>Buyer ID: ${data.buyer_id}</p>`;
            document.getElementById('inventoryDetails').innerHTML = details;
        });
});

function editInventory() {
    const urlParams = new URLSearchParams(window.location.search);
    const inventoryId = urlParams.get('id');
    window.location.href = `/edit-inventory.html?id=${inventoryId}`;
}

function deleteInventory() {
    const urlParams = new URLSearchParams(window.location.search);
    const inventoryId = urlParams.get('id');

    fetch(`/api/inventory/${inventoryId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert('Inventory Deleted Successfully');
        window.location.href = '/index.html';
    });
}