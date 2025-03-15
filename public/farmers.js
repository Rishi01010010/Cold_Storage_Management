document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const farmerId = urlParams.get('id');

    fetch(`/api/farmers/${farmerId}`)
        .then(response => response.json())
        .then(data => {
            let details = `<p>Farmer ID: ${data.id}</p>
                           <p>Name: ${data.name}</p>
                           <p>Identity Number: ${data.identity_number}</p>
                           <p>Email: ${data.email}</p>
                           <p>Phone Number: ${data.phone_number}</p>
                           <p>Address: ${data.address}</p>
                           <p>Farm Details: ${data.farm_details}</p>
                           <p>Production Records: ${data.production_records}</p>
                           <p>Equipment Assets: ${data.equipment_assets}</p>
                           <p>Land Ownership: ${data.land_ownership}</p>`;
            document.getElementById('farmerDetails').innerHTML = details;
        });
});

function editFarmer() {
    const urlParams = new URLSearchParams(window.location.search);
    const farmerId = urlParams.get('id');
    window.location.href = `/edit-farmers.html?id=${farmerId}`;
}

function deleteFarmer() {
    const urlParams = new URLSearchParams(window.location.search);
    const farmerId = urlParams.get('id');

    fetch(`/api/farmers/${farmerId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert('Farmer Deleted Successfully');
        window.location.href = '/index.html';
    });
}
