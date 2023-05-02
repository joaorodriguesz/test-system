let perguntas = [];

function save(id) {
  const descPergunta = document.querySelector("#pergunta-descricao");
  const opcaoA = document.querySelector("#desc-a");
  const opcaoB = document.querySelector("#desc-b");
  const opcaoC = document.querySelector("#desc-c");
  const opcaoD = document.querySelector("#desc-d");
  const opcaoE = document.querySelector("#desc-e");
  const opcaoCorreta = document.querySelector("#opcao-correta");

  fetch(`http://localhost:3000/tests/${id}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => {      
      result.perguntas.push({
        idTeste: result.id,
        descricao: descPergunta.value,
        A: opcaoA.value,
        B: opcaoB.value,
        C: opcaoC.value,
        D: opcaoD.value,
        E: opcaoE.value,
        opcaoCorreta: opcaoCorreta.value,
      });

      put(id, result);
    });
}

function remove(id, descricao) {
  fetch(`http://localhost:3000/tests/${id}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => {
      result.perguntas = result.perguntas.filter((perguntas) => perguntas.descricao !== descricao);
      put(id, result);
    });
}

function modify(id, descricao, index) {
  const descPergunta = document.querySelector("#pergunta-descricao-mod-"+index);
  const opcaoA = document.querySelector("#desc-a-mod-"+index);
  const opcaoB = document.querySelector("#desc-b-mod-"+index);
  const opcaoC = document.querySelector("#desc-c-mod-"+index);
  const opcaoD = document.querySelector("#desc-d-mod-"+index);
  const opcaoE = document.querySelector("#desc-e-mod-"+index);
  const opcaoCorreta = document.querySelector("#opcao-correta-mod-"+index);

  fetch(`http://localhost:3000/tests/${id}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => {
      let perguntaEdit = result.perguntas.filter((perguntas) => perguntas.descricao === descricao);
      result.perguntas = result.perguntas.filter((perguntas) => perguntas.descricao !== descricao);

      perguntaEdit = {
        idTeste: result.id,
        descricao: descPergunta.value,
        A: opcaoA.value,
        B: opcaoB.value,
        C: opcaoC.value,
        D: opcaoD.value,
        E: opcaoE.value,
        opcaoCorreta: opcaoCorreta.value,
      };

      result.perguntas.push(perguntaEdit);
      
      put(id, result);
    });
}

function put(id, object) {
  fetch(`http://localhost:3000/tests/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  }).then(() => {
    loadPage();
  });
}

function loadPage() {
  const table = document.querySelector("#main-table");
  const loading = document.querySelector("#loading");

  table.classList.add("d-none");
  loading.classList.remove("d-none");

  setTimeout(() => {
    location.reload();
  }, 1000);
}
