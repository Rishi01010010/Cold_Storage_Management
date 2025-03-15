document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const buyerId = urlParams.get('id');

    fetch(`/api/buyers/${buyerId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('buyer_id').value = data.id;
            document.getElementById('name').value = data.name;
            document.getElementById('identity_number').value = data.identity_number;
            document.getElementById('email').value = data.email;
            document.getElementById('phone_number').value = data.phone_number || '';
            document.getElementById('address').value = data.address || '';
        });

    document.getElementById('editForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        fetch(`/api/buyers/${buyerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            alert('Buyer Updated Successfully');
            window.location.href = `/buyers.html?id=${buyerId}`;
        })
        .catch(error => {
            alert(`Error: ${error.message}`);
        });
    });
});
