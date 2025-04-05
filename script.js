let users = [];
let currentPage = 1;
const itemsPerPage = 5;

document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value; // Adicionando senha

    users.push({ nome, email, senha }); // Salvando todos os dados, incluindo senha
    this.reset();
    renderTable();
});

document.getElementById('search').addEventListener('input', function() {
    renderTable(this.value);
});

function renderTable(searchTerm = '') {
    const filteredUsers = users.filter(user => 
        user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const start = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = filteredUsers.slice(start, start + itemsPerPage);
    
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Limpa a lista antes de renderizar os dados

    paginatedUsers.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.nome}</td>
            <td>${user.email}</td>
            <td>
                <button class="edit-btn" onclick="editUser(${start + index})">Editar</button>
            </td>
        `;
        userList.appendChild(row);
    });

    document.getElementById('pageNumber').textContent = currentPage;
}

function editUser(index) {
    const user = users[index];
    document.getElementById('nome').value = user.nome;
    document.getElementById('email').value = user.email;
    users.splice(index, 1); 
    renderTable();
}

document.getElementById('prevPage').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
});

document.getElementById('nextPage').addEventListener('click', function() {
    const totalPages = Math.ceil(users.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
});



