document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const storageUnitId = urlParams.get('id');

    fetch(`/api/storageUnits/${storageUnitId}`)
        .then(response => response.json())
        .then(data => {
            let details = `<p>Storage Unit ID: ${data.id}</p>
                           <p>Storage_Unit Number: ${data.storage_number}</p>
                           <p>Capacity: ${data.capacity}</p>
                           <p>Location: ${data.location}</p>
                           <p>Owner: ${data.owner}</p>
                           <p>Ownership Status: ${data.ownership_status}</p>
                           <p>Temperature: ${data.temperature}</p>
                           <p>Humidity: ${data.humidity}</p>`;
                           
            document.getElementById('storageUnitDetails').innerHTML = details;
        });
});

function editStorageUnit() {
    const urlParams = new URLSearchParams(window.location.search);
    const storageUnitId = urlParams.get('id');
    window.location.href = `/edit-storageUnits.html?id=${storageUnitId}`;
}

function deleteStorageUnit() {
    const urlParams = new URLSearchParams(window.location.search);
    const storageUnitId = urlParams.get('id');

    fetch(`/api/storageUnits/${storageUnitId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert('Storage Unit Deleted Successfully');
        window.location.href = '/index.html';
    });
}
