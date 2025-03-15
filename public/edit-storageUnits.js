document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed'); // Log when the DOM is ready

    const urlParams = new URLSearchParams(window.location.search);
    const storageUnitId = urlParams.get('id');
    console.log('Storage Unit ID from URL:', storageUnitId); // Log the extracted ID

    // Fetch storage unit data
    fetch(`/api/storageUnits/${storageUnitId}`)
        .then(response => {
            console.log('Received response from server:', response.status); // Log the status of the response
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data); // Log the fetched data
            document.getElementById('storage_unit_id').value = data.id;
            document.getElementById('storage_unit_number').value = data.storage_number;
            document.getElementById('capacity').value = data.capacity;
            document.getElementById('location').value = data.location;
            document.getElementById('owner').value = data.owner;
            document.getElementById('ownership_Status').value = data.ownership_status;
            document.getElementById('temperature').value = data.temperature;
            document.getElementById('humidity').value = data.humidity;
        })
        .catch(err => {
            console.error('Error fetching storage unit data:', err); // Log if any error occurs
        });

    // Handle form submission for editing storage unit
    document.getElementById('editForm').addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Edit form submitted'); // Log form submission event

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log('Form data:', data); // Log the form data being sent to the server

        // Send updated data via PUT request
        fetch(`/api/storageUnits/${storageUnitId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log('Response from PUT request:', response.status); // Log the response status
            return response.json();
        })
        .then(data => {
            console.log('Server response after update:', data); // Log the server's response
            alert('Storage Unit Updated Successfully');
            window.location.href = `/storageUnits.html?id=${storageUnitId}`;
        })
        .catch(err => {
            console.error('Error updating storage unit:', err); // Log if any error occurs during the update
        });
    });
});
