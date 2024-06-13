document.getElementById('notaForm').addEventListener('submit', adicaoNota);

function obterNotas() {
    fetch('http://127.0.0.1:5000/')
        .then(response => response.json())
        .then(data => {
            const listaNotas = document.getElementById('listaNotas');
            listaNotas.innerHTML = '';
            data.Notas.forEach(nota => {
                const row = document.createElement('tr');
                row.setAttribute('data-id', nota.id);
                row.innerHTML = `
                    <td contenteditable="true">${nota.titulo}</td>
                    <td contenteditable="true">${nota.texto}</td>
                    <td><button onclick="edicaoNota(${nota.id})">Salvar</button></td>
                    <td><button onclick="remocaoNota(${nota.id})">Deletar</button></td>
                `;
                listaNotas.appendChild(row);
            });
        })
        .catch(error => console.error('Erro:', error));
}

function adicaoNota(event) {
    event.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const texto = document.getElementById('texto').value;

    fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo, texto }),
    })
    .then(response => {
        if (response.ok) {
            response.json()
            alert('Nota adicionada!');
            obterNotas();
        } else {
                alert('Erro ao adicionar nota.');
        }
    })
    .catch(error => console.error('Erro:', error));
}

function edicaoNota(id) {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    const titulo = row.querySelector('td:nth-child(1)').innerText;
    const texto = row.querySelector('td:nth-child(2)').innerText;
        
    fetch(`http://127.0.0.1:5000/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, titulo: titulo, texto: texto }),
    })
    .then(response => {
        if (response.ok) {
            response.json()
            alert('Nota editada!');
            obterNotas();
        } else {
            alert('Erro ao editar nota.');
        }
    })
    .catch(error => console.error('Error:', error));
}

function remocaoNota(id) {
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
            obterNotas();
        } else {
            alert('Erro ao deletar nota.');
        }
    })
    .catch(error => console.error('Erro:', error));
}

// Carregar as notas ao carregar da pagina
window.onload = obterNotas;