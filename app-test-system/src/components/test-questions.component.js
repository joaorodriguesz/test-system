import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

const TestResultComponent = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate(); 
  const { id } = useParams();

  const submit = (id) => {
    fetch(`http://localhost:8080/api/tests/${id}`)
      .then((response) => response.json())
      .then((response) => {
        let resultado = validateTest(response);
        save(id, resultado);
      });
  };

  const validateTest = (test) => {
    let qtdPerguntasResp = 0;
    let qtdPerguntasCorretas = 0;

    test.questions.forEach((pergunta, index) => {
      document.getElementsByName(index).forEach((element) => {
        if (!element.checked) {
          return;
        }
        qtdPerguntasResp++;

        if (element.value === pergunta.correctOption) {
          qtdPerguntasCorretas++;
        }
      });
    });

    return {
      studantName: document.getElementById('studant-name').value,
      answeredQuestionsCount: qtdPerguntasResp,
      correctQuestionsCount: qtdPerguntasCorretas,
      questionsCount: test.questions.length,
    };
  };

  const save = (testId, resultado) => {
    fetch(`http://localhost:8080/api/tests/${testId}/results`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resultado),
    }).then(() => {
      navigate('/');
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
          <div id="main">
            <form id="form">
              <label>Nome</label>
              <input type="text" name="studantName" id='studant-name' className="form-control form-control-sm" />
              <hr className="m-4"></hr>
              {tests.questions.map((question, index) => (
                <div className="card m-2" key={index}>
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
                onClick={() => submit(tests._id)}
                className="btn btn-primary"
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
