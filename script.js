document.getElementById('notaForm').addEventListener('submit', adicao_nota);

function obter_notas() {
    fetch('http://127.0.0.1:5000/')
        .then(response => response.json())
        .then(data => {
            const listaNotas = document.getElementById('listaNotas');
            listaNotas.innerHTML = '';
            data.Notas.forEach(nota => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${nota.titulo}</td>
                    <td>${nota.descricao}</td>
                    <td><button onclick="remocao_nota(${nota.id})">Deletar</button></td>
                `;
                listaNotas.appendChild(row);
            });
        })
        .catch(error => console.error('Erro:', error));
}

function adicao_nota(event) {
    event.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;

    fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo, descricao }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Nota adicionada!');
        obter_notas();
    })
    .catch(error => console.error('Error:', error));
}


function remocao_nota(id) {
    fetch(`http://127.0.0.1:5000/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
    })
    .then(response => {
        if (response.ok) {
            alert('Nota deletada!');
            obter_notas();
        } else {
            alert('Erro ao deletar nota.');
        }
    })
    .catch(error => console.error('Erro:', error));
}

// Carregar as notas ao carregar da pagina
window.onload = obter_notas;
