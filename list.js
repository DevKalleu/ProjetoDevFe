document.addEventListener('DOMContentLoaded', function() {
    let isEditing = false;
    let editIndex = null;

    document.getElementById('compra-form')?.addEventListener('submit', function(event) {
        event.preventDefault();

        const materialName = document.getElementById('material-name').value;
        let materialPrice = document.getElementById('material-price').value.replace(',', '.');
        materialPrice = parseFloat(materialPrice);
        const materialQuantity = parseInt(document.getElementById('material-quantity').value);

        if (materialName && !isNaN(materialPrice) && !isNaN(materialQuantity)) {
            if (isEditing) {
                // Quando estiver editando, chamar a função de update
                updateItem(editIndex, materialName, materialPrice, materialQuantity);
            } else {
                addItemToLocalStorage(materialName, materialPrice, materialQuantity);
            }
        } else {
            alert('Por favor, insira um preço e quantidade válidos.');
        }

        // Limpar campos
        document.getElementById('material-name').value = '';
        document.getElementById('material-price').value = '';
        document.getElementById('material-quantity').value = '';
        document.getElementById('compra-form').querySelector('button').textContent = 'Adicionar ao Carrinho'; // Restaura o texto do botão
    });

    // Função para adicionar item ao Local Storage
    function addItemToLocalStorage(name, price, quantity) {
        let items = JSON.parse(localStorage.getItem('items')) || [];
        const newItem = { name, price, quantity };
        items.push(newItem);
        localStorage.setItem('items', JSON.stringify(items));
        renderItems();
    }

    // Função para atualizar item no Local Storage
    function updateItem(index, name, price, quantity) {
        let items = JSON.parse(localStorage.getItem('items')) || [];
        items[index] = { name, price, quantity };
        localStorage.setItem('items', JSON.stringify(items));
        renderItems(); // Re-renderiza a lista de itens
    }

    // Função para renderizar a lista de itens
    function renderItems() {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        const tableBody = document.getElementById('item-table')?.getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Limpa o corpo da tabela

        let total = 0;
        items.forEach((item, index) => {
            const newRow = tableBody.insertRow();

            const cellName = newRow.insertCell(0);
            const cellPrice = newRow.insertCell(1);
            const cellQuantity = newRow.insertCell(2);
            const cellTotal = newRow.insertCell(3);
            const cellActions = newRow.insertCell(4);

            cellName.textContent = item.name;
            cellPrice.textContent = `R$ ${item.price.toFixed(2)}`;
            cellQuantity.textContent = item.quantity;
            cellTotal.textContent = `R$ ${(item.price * item.quantity).toFixed(2)}`;

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.onclick = function() {
                editItem(index);
            };

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.onclick = function() {
                deleteItem(index);
            };

            cellActions.appendChild(editButton);
            cellActions.appendChild(deleteButton);

            total += item.price * item.quantity;
        });

        if (document.getElementById('total-geral')) {
            document.getElementById('total-geral').textContent = total.toFixed(2);
        }
    }

    // Função para editar item
    function editItem(index) {
        // Redireciona para a página de edição com o índice do item
        window.location.href = `editar.html?index=${index}`;
    }

    // Função para excluir item
    function deleteItem(index) {
        let items = JSON.parse(localStorage.getItem('items')) || [];
        items.splice(index, 1); // Remove o item selecionado
        localStorage.setItem('items', JSON.stringify(items));
        renderItems(); // Re-renderiza a lista de itens
    }

    // Renderiza os itens inicialmente
    renderItems();
});

// Função para editar item
function editItem(index) {
    // Redireciona para a página de edição com o índice do item
    window.location.href = `editar.html?index=${index}`;
}

