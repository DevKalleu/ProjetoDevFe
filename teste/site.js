document.addEventListener('DOMContentLoaded', function() {
    let isEditing = false;
    let editIndex = null;

    // Adiciona o evento de submissão do formulário de compra
    document.getElementById('compra-form')?.addEventListener('submit', function(event) {
        event.preventDefault();

        const materialName = document.getElementById('material-name').value;
        let materialPrice = document.getElementById('material-price').value.replace(',', '.');
        materialPrice = parseFloat(materialPrice); // Tentar converter o preço para float
        const materialQuantity = parseInt(document.getElementById('material-quantity').value);

        if (materialName && !isNaN(materialPrice) && !isNaN(materialQuantity)) {
            if (isEditing) {
                // Atualiza o item se estiver no modo de edição
                updateItem(editIndex, materialName, materialPrice, materialQuantity);
            } else {
                // Adiciona um novo item ao LocalStorage
                addItemToLocalStorage(materialName, materialPrice, materialQuantity);
            }
        } else {
            alert('Por favor, insira um preço e quantidade válidos.');
        }

        // Limpa os campos após o envio
        document.getElementById('material-name').value = '';
        document.getElementById('material-price').value = '';
        document.getElementById('material-quantity').value = '';
        isEditing = false; // Resetar o modo de edição
        document.getElementById('compra-form').querySelector('button').textContent = 'Adicionar ao Carrinho'; // Restaura o texto do botão
    });

    // Função para adicionar um item ao Local Storage
    function addItemToLocalStorage(name, price, quantity) {
        let items = JSON.parse(localStorage.getItem('items')) || [];
        const newItem = { name, price, quantity };
        items.push(newItem);
        localStorage.setItem('items', JSON.stringify(items));
        renderItems(); // Re-renderiza a lista de itens
    }

    // Função para atualizar um item no Local Storage
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
            editButton.textContent = 'Editar Quantidade';
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

    // Função para editar o item (somente a quantidade)
    function editItem(index) {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        const item = items[index];

        // Preenche os campos do formulário com os dados do item
        document.getElementById('material-name').value = item.name;
        document.getElementById('material-price').value = item.price.toFixed(2); // Garantir que o preço seja formatado corretamente
        document.getElementById('material-quantity').value = item.quantity;

        // Marca o item como sendo editado
        isEditing = true;
        editIndex = index;

        // Modifica o texto do botão para "Confirmar Edição"
        document.getElementById('compra-form').querySelector('button').textContent = 'Confirmar Edição';
    }

    // Função para excluir o item
    function deleteItem(index) {
        let items = JSON.parse(localStorage.getItem('items')) || [];
        items.splice(index, 1); // Remove o item selecionado
        localStorage.setItem('items', JSON.stringify(items));
        renderItems(); // Re-renderiza a lista de itens
    }

    // Renderiza os itens inicialmente
    renderItems();
});
