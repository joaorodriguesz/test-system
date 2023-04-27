let testeId = 0;
let testes = [];

document.addEventListener('DOMContentLoaded', function() {
    verfiList()
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

function salvarTudo (){
    fetch('http://localhost:8081/test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(testes)
    })
    .then((a)=> console.log(a));
}

function addTarefa(){
    testes.push({id: testeId++, descricao: document.getElementById('createTest').value});   
    document.getElementById('createTest').value = '';
    verfiList()
}

function verfiList(){
    if(testes.length === 0){
        return document.getElementById('salvarTudo').disabled = true; 
    }

    document.getElementById('salvarTudo').disabled = false; 
}
