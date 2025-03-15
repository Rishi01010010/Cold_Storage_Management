document.getElementById('addContractForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Log the data in JSON format before sending it to the server
    const jsonData = JSON.stringify(data);
    console.log('JSON Data Being Sent:', jsonData);

    fetch('/api/contracts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => {
        // Log the response status
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            return response.text().then(text => {
                // Log the error text from the response
                console.log('Response Error Text:', text);
                throw new Error(text);
            });
        }
        return response.json();
    })
    .then(data => {
        // Log the successful response data
        console.log('Response Data:', data);

        alert('Contract Added Successfully');
        window.location.href = '/index.html';
    })
    .catch(error => {
        // Log the error message
        console.error('Error:', error.message);

        alert(`Error: ${error.message}`);
    });
});
