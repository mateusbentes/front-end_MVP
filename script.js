document.getElementById('notaForm').addEventListener('submit', addNota);

function loadNotas() {
    fetch('http://127.0.0.1:5000/')
        .then(response => response.json())
        .then(data => {
            const notaList = document.getElementById('notaList');
            notaList.innerHTML = '';
            data.Notas.forEach(nota => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${nota.nome}</td>
                    <td>${nota.descricao}</td>
                    <td><button onclick="deletaNota(${nota.id})">Delete</button></td>
                `;
                notasList.appendChild(row);
            });
        })
        .catch(error => console.error('Erro:', error));
}

function addNota(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;

    fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, descricao }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Nota adicionada!');
        loadNotas();
    })
    .catch(error => console.error('Error:', error));
}


function deletaNota(id) {
    fetch(`http://127.0.0.1:5000/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            alert('Nota deletada!');
            loadNotas();
        } else {
            alert('Erro ao deletar nota.');
        }
    })
    .catch(error => console.error('Erro:', error));
}

// Carregar as notas ao carregar da pagina
window.onload = loadNotas;
