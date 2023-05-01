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
      console.log(result);
      result.perguntas = result.perguntas.filter((perguntas) => perguntas.descricao !== descricao);

      put(id, result);
    });
}

function modify(id, descricao) {
  const descPergunta = document.querySelector("#pergunta-descricao-mod");
  const opcaoA = document.querySelector("#desc-a-mod");
  const opcaoB = document.querySelector("#desc-b-mod");
  const opcaoC = document.querySelector("#desc-c-mod");
  const opcaoD = document.querySelector("#desc-d-mod");
  const opcaoE = document.querySelector("#desc-e-mod");
  const opcaoCorreta = document.querySelector("#opcao-correta-mod");

  fetch(`http://localhost:3000/tests/${id}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => {
      let perguntaEdit = result.perguntas.filter((perguntas) => perguntas.descricao === descricao);
      result.perguntas = result.perguntas.filter((perguntas) => perguntas.descricao !== descricao);

      perguntaEdit = {
        idTeste: result.id,
        descricao: descPergunta.value ? perguntaEdit : perguntaEdit[0].descricao,
        A: opcaoA.value ? opcaoA.value : perguntaEdit[0].opcaoA,
        B: opcaoB.value ? opcaoB.value : perguntaEdit[0].opcaoB,
        C: opcaoC.value ? opcaoC.value : perguntaEdit[0].opcaoC,
        D: opcaoD.value ? opcaoD.value : perguntaEdit[0].opcaoD,
        E: opcaoE.value ? opcaoE.value : perguntaEdit[0].opcaoE,
        opcaoCorreta: opcaoCorreta.value ? opcaoCorreta.value : perguntaEdit[0].opcaoCorreta,
      };

      console.log(perguntaEdit);

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
