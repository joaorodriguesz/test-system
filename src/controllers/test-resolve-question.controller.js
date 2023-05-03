function submit(id) {
    fetch(`http://localhost:3000/tests/${id}`, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((response) => {
            let resultado = validateTest(response);
            save(resultado);
        });
}

function validateTest(test) {
    let qtdPerguntasResp = 0;
    let qtdPerguntasCorretas = 0;

    test.perguntas.forEach((pergunta, index) => {
        document.getElementsByName(index).forEach((element) => {
            if (!element.checked) {
                return;
            }
            qtdPerguntasResp++;

            if (element.value === pergunta.opcaoCorreta) {
                qtdPerguntasCorretas++
            }
        });
    });

    return {
        id: 0,
        testId: test.id,
        teste: test.descricao,
        qtdPerguntasResp: qtdPerguntasResp,
        qtdPerguntasCorretas: qtdPerguntasCorretas,
        qtdPerguntas: test.perguntas.length
    }
}

function save(resultado) {
    fetch("http://localhost:3001/results", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(resultado),
    })
        .then(() => {
            setTimeout(() => {
                loadPage();
            }, 200);
        });
}

function loadPage() {
    const form = document.querySelector("#main");
    const loading = document.querySelector("#loading");

    form.classList.add('d-none');
    loading.classList.remove('d-none');

    setTimeout(() => {
        location.href = "/"
    }, 1000)
}
