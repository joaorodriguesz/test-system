import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const TestResultComponent = () => {
  const [loading, setLoading] = useState(false);
  const [tests, setTests] = useState([]);
  const { id } = useParams();

  const submit = (id) => {
    setLoading(true);
    fetch(`http://localhost:3000/tests/${id}`)
      .then((response) => response.json())
      .then((response) => {
        let resultado = validateTest(response);
        save(resultado);
      });
  };

  const validateTest = (test) => {
    let qtdPerguntasResp = 0;
    let qtdPerguntasCorretas = 0;

    test.perguntas.forEach((pergunta, index) => {
      document.getElementsByName(index).forEach((element) => {
        if (!element.checked) {
          return;
        }
        qtdPerguntasResp++;

        if (element.value === pergunta.opcaoCorreta) {
          qtdPerguntasCorretas++;
        }
      });
    });

    return {
      id: 0,
      testId: test.id,
      teste: test.descricao,
      qtdPerguntasResp: qtdPerguntasResp,
      qtdPerguntasCorretas: qtdPerguntasCorretas,
      qtdPerguntas: test.perguntas.length,
    };
  };

  const save = (resultado) => {
    fetch("http://localhost:3001/results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resultado),
    }).then(() => {
      setTimeout(() => {
        loadPage();
      }, 200);
    });
  };

  const loadPage = () => {
    fetch(`http://localhost:8080/api/tests/${id}`, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
      setTests(data);
    });
  };

  useEffect(() => {
    loadPage();
    console.log(tests);
  }, []);

  if (tests.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div class="spinner-border m-5" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center mt-4">
        <div className="col-md-8">
          <h2 className="text-center mb-4">Perguntas e Respostas</h2>
          <div className={`text-center mt-4 mb-4 ${loading ? "" : "d-none"}`} id="loading">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          <div id="main">
            <form id="form">
              <label>Studant Name</label>
              <input type="text" name="studantName" id='studant-name' className="form-control form-control-sm" />
              <hr></hr>
              {tests.questions.map((question, index) => (
                <div className="card" key={index}>
                  <div className="card-body" name={index}>
                    <p className="card-text">{question.description}</p>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={index}
                        id={`${index}-A`}
                        value="A"
                      />
                      <label className="form-check-label" htmlFor={`${index}-A`}>
                        (A) {question.optionA}
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={index}
                        id={`${index}-B`}
                        value="B"
                      />
                      <label className="form-check-label" htmlFor={`${index}-B`}>
                        (B) {question.optionB}
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={index}
                        id={`${index}-C`}
                        value="C"
                      />
                      <label className="form-check-label" htmlFor={`${index}-C`}>
                        (C) {question.optionC}
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={index}
                        id={`${index}-D`}
                        value="D"
                      />
                      <label className="form-check-label" htmlFor={`${index}-D`}>
                        (D) {question.optionD}
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={index}
                        id={`${index}-E`}
                        value="E"
                      />
                      <label className="form-check-label" htmlFor={`${index}-E`}>
                        (E) {question.optionE}
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-3"></div>
            </form>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => submit(test.id)}
                className="btn btn-primary"
                disabled={loading}
              >
                Enviar Respostas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResultComponent;
