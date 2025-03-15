document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const inventoryId = urlParams.get('id');

    fetch(`/api/inventory/${inventoryId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('inventory_id').value = data.id;
            document.getElementById('storage_unit_id').value = data.storage_unit_id;
            document.getElementById('vegetable_name').value = data.vegetable_name;
            document.getElementById('variety').value = data.quantity;
            document.getElementById('quantity').value = data.quantity;
            document.getElementById('date_stored').value = data.expiry_date;
            document.getElementById('expiry_date').value = data.expiry_date;
            document.getElementById('buyer_id').value = data.buyer_id;
        });

    document.getElementById('editForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        fetch(`/api/inventory/${inventoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            alert('Inventory Updated Successfully');
            window.location.href = `/inventory.html?id=${inventoryId}`;
        });
    });
});
