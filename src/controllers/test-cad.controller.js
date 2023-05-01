function save() {
    const testDescricao = document.querySelector("#test-descricao");

    let tests = {
      id: 0,
      descricao: testDescricao.value,
      perguntas: [],
    };

    testDescricao.value = null;

    fetch("http://localhost:3000/tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tests),
    })
    .then(()=>{
      loadPage();
    });
}

function remove(id) {
  fetch(`http://localhost:3000/tests/${id}`, {
    method: 'DELETE'
  }).then(()=>{
    loadPage()
  });
}

function modify(id) {
  const testDescricao = document.querySelector("#test-descricao-mod");

  let tests = {
    id: 0,
    descricao: testDescricao.value,
    pergunta: [],
  };

  testDescricao.value = null;

  fetch(`http://localhost:3000/tests/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tests)
  }).then(()=>{
    loadPage()
  });
}

function loadPage(){
  const table = document.querySelector("#main-table");
  const loading = document.querySelector("#loading");

  table.classList.add('d-none');
  loading.classList.remove('d-none');

  setTimeout(()=>{
    location.reload();
  }, 1000)
}
