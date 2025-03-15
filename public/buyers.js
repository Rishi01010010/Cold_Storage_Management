document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const buyerId = urlParams.get('id');

    fetch(`/api/buyers/${buyerId}`)
        .then(response => response.json())
        .then(data => {
            let details = `<p>Buyer ID: ${data.id}</p>
                           <p>Name: ${data.name}</p>
                           <p>Identity Number: ${data.identity_number || 'N/A'}</p>
                           <p>Email: ${data.email}</p>
                           <p>Phone Number: ${data.phone_number || 'N/A'}</p>
                           <p>Address: ${data.address || 'N/A'}</p>`;
            document.getElementById('buyerDetails').innerHTML = details;
        });
});

function editBuyer() {
    const urlParams = new URLSearchParams(window.location.search);
    const buyerId = urlParams.get('id');
    window.location.href = `/edit-buyers.html?id=${buyerId}`;
}

function deleteBuyer() {
    const urlParams = new URLSearchParams(window.location.search);
    const buyerId = urlParams.get('id');

    fetch(`/api/buyers/${buyerId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert('Buyer Deleted Successfully');
        window.location.href = '/index.html';
    });
}
