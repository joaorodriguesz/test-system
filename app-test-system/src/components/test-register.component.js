import React, { useState, useEffect } from 'react';

const TestComponent = () => {
  const [tests, setTests] = useState([]);

  const save = () => {
    let testDescricao = document.getElementById('test-descricao').value;

    let newTest = {
      title: testDescricao,
      questions: [],
    };

    testDescricao = '';

    fetch("http://localhost:8080/api/tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTest),
    })
    .then(() => {
      loadPage();
    });
  };

  const modify = (id) => {
    let testDescricao = document.getElementById('test-descricao-' + id).value;

    let testeEditado = {
      title: testDescricao,
      questions: [],
    };

    testDescricao = '';

    fetch(`http://localhost:8080/api/tests/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testeEditado),
    })
    .then(() => {
      loadPage();
    });
  };

  const loadPage = () => {
    fetch(`http://localhost:8080/api/tests`, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
      setTests(data);
    });
  };

const deleteTeste = (id) => {
  fetch(`http://localhost:8080/api/tests/${id}`, {
    method: 'DELETE'
  })
  .then((response) => response.json())
  .then((data) => {
    loadPage();
  });
};

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <div className="container-fluid mt-3">
      <h2 className="text-center">Testes</h2>
      <hr />
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="col-md-12">
            <button type="button" class="btn btn-primary btn-sm me-3" data-bs-toggle="modal" data-bs-target="#cadModal">
            Cadastrar
            </button>
            <a className="btn btn-sm btn-secondary" href="/">Voltar</a>
          </div>
        </div>
        <hr style={{ width: '90%' }} />
        <div id="contTable">
          <div className="text-center mt-4 mb-4 d-none" id="loading">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          <table className="table table-sm table-striped table-hover table-bordered mb-3" id="main-table">
            <thead>
              <tr>
                <th width="10%">Código</th>
                <th width="75%">Descrição</th>
                <th width="15%"></th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test._id}>
                  <td className="text-center">{test._id}</td>
                  <td>{test.title}</td>
                  <td className="text-center">
                    <a type="button" href={`test/${test._id}/question`} title="Cadastrar" className="btn btn-sm btn-success m-1">
                      <i class="bi bi-plus-circle-fill"></i>
                    </a>
                    <button type="button" className="btn btn-sm btn-primary m-1" data-bs-toggle="modal" data-bs-target={`#cadModal-${test._id}`}>
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button type="button" onClick={() => deleteTeste(test._id)} className="btn btn-sm btn-danger">
                      <i class="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="modal fade" id="cadModal" tabIndex="-1" role="dialog" aria-labelledby="cadModal" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="cadModal">Cadastrar Teste</h5>  
            </div>
            <div className="modal-body">
              <label htmlFor="descricao">Nome do Teste</label>
              <input type="text" name="descricao" id="test-descricao" className="form-control form-control-sm" />
            </div>
            <div className="modal-footer">
              <button type="button" onClick={save} data-bs-dismiss="modal" className="btn btn-primary">Salvar</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div>
                
      {tests.map((test) => (
        <div className="modal fade" id={`cadModal-${test._id}`} tabIndex="-1" role="dialog" aria-labelledby={`cadModal-${test._id}`} aria-hidden="true" key={test._id}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`cadModal-${test._id}`}>Editar Nome do Teste</h5>
              </div>
              <div className="modal-body">
                <label htmlFor={`test-descricao-${test._id}`}>Nome do Teste</label>
                <input type="text" name="descricao" id={`test-descricao-${test._id}`} defaultValue={test.title} className="form-control form-control-sm" />
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => modify(test._id)} data-bs-dismiss="modal" className="btn btn-primary">Salvar</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestComponent;
