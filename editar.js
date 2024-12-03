
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = parseInt(urlParams.get('index'));

    const items = JSON.parse(localStorage.getItem('items')) || [];
    const item = items[index];

    if (item) {
        document.getElementById('material-name').value = item.name;
        document.getElementById('material-price').value = item.price.toFixed(2);
        document.getElementById('material-quantity').value = item.quantity;
    }

    document.getElementById('compra-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const materialName = document.getElementById('material-name').value;
        let materialPrice = document.getElementById('material-price').value.replace(',', '.');
        materialPrice = parseFloat(materialPrice);
        const materialQuantity = parseInt(document.getElementById('material-quantity').value);

        if (materialName && !isNaN(materialPrice) && !isNaN(materialQuantity)) {
            items[index] = { name: materialName, price: materialPrice, quantity: materialQuantity };
            localStorage.setItem('items', JSON.stringify(items));

            window.location.href = 'lista.html';
        } else {
            alert('Por favor, insira um preço e quantidade válidos.');
        }
    });
});

