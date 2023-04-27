let testeId = 0;
let testes = [];

document.addEventListener('DOMContentLoaded', function() {
    const mainTable = document.querySelector('#mainTable');
    const alerta = document.querySelector('.alerta');

    if (mainTable.children.length > 1) {
        mainTable.style.display = 'table';
        alerta.style.display = 'none';
    } else {
        mainTable.style.display = 'none';
        alerta.style.display = 'block';
    }
});

function addTarefa(){
    const createTestInput = document.querySelector('#createTest');
    const mainTable = document.querySelector('#mainTable');
    const alerta = document.querySelector('.alerta');

    if (createTestInput.value !== '') {
        const nomeAtv = createTestInput.value;
        createTestInput.value = '';

        //----CRIANDO LINHAS DA TABELA----//
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.textContent = nomeAtv;
        const td2 = document.createElement('td');
        td2.classList.add('text-center');
        const btnCadastrar = document.createElement('button');
        btnCadastrar.classList.add('btn', 'btn-sm', 'btn-warning', 'btnCadastrar');
        const icon = document.createElement('i');
        icon.classList.add('fa', 'fa-plus-square-o');
        btnCadastrar.appendChild(icon);
        btnCadastrar.innerHTML += ' Cadastrar Perguntas';
        td2.appendChild(btnCadastrar);
        tr.appendChild(td1);
        tr.appendChild(td2);

        mainTable.style.display = 'table';
        alerta.style.display = 'none';
        mainTable.querySelector('tbody').appendChild(tr);
        testes.push({id: testeId++, descricao: nomeAtv});   
        verfiList();
        //-------------------------------//
    } else {
        alert('PREENCHA O CAMPO NOME DA TAREFA!');
    }
}

function salvarTudo (){
    fetch('https://joaorodriguesz-potential-fishstick-gwxj95gq7p6cwr4q-8081.preview.app.github.dev/test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(testes)
    })
}

function verfiList(){
    if(testes.length === 0){
        return document.getElementById('salvarTudo').disabled = true; 
    }

    document.getElementById('salvarTudo').disabled = false; 
}