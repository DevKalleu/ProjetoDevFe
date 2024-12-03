document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('compra-form')?.addEventListener('submit', function(event) {
        event.preventDefault();

        const materialName = document.getElementById('material-name').value;
        
        // Obter o preço e substituir vírgula por ponto, caso necessário
        let materialPrice = document.getElementById('material-price').value.replace(',', '.');
        materialPrice = parseFloat(materialPrice); // Tentar converter o preço para float

        const materialQuantity = parseInt(document.getElementById('material-quantity').value);

        // Verificar se os valores estão corretos
        if (materialName && !isNaN(materialPrice) && !isNaN(materialQuantity)) {
            addItemToLocalStorage(materialName, materialPrice, materialQuantity);
        } else {
            // Se os dados estiverem incorretos, você pode mostrar uma mensagem de erro para o usuário
            alert('Por favor, insira um preço e quantidade válidos.');
        }

        // Limpa os campos após o envio
        document.getElementById('material-name').value = '';
        document.getElementById('material-price').value = '';
        document.getElementById('material-quantity').value = '';
    });

    function addItemToLocalStorage(name, price, quantity) {
        let items = JSON.parse(localStorage.getItem('items')) || [];
        const newItem = {
            name: name,
            price: price,
            quantity: quantity
        };
        items.push(newItem);
        localStorage.setItem('items', JSON.stringify(items));
    }
});
