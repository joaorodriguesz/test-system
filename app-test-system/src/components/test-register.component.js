import React, { useState, useEffect } from 'react';

const TestComponent = () => {
  const [tests, setTests] = useState([]);

  const save = () => {
    const testDescricao = document.querySelector("#test-descricao");

    let newTest = {
      id: 0,
      descricao: testDescricao.value,
      perguntas: [],
    };

    testDescricao.value = '';

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

  const remove = (id) => {
    fetch(`http://localhost:8080/api/tests/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      loadPage();
    });
  };

  const modify = (id) => {
    const testDescricaoMod = document.querySelector("#test-descricao-mod-" + id);

    let descricao = testDescricaoMod.value;
    testDescricaoMod.value = '';

    fetch(`http://localhost:8080/api/tests/${id}`, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((response) => {
      response.descricao = descricao;

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
            <button type="button" className="btn btn-sm btn-primary" data-toggle="modal" data-target="#cadModal">
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
            <thead className="bg-dark text-white">
              <tr>
                <th width="5%">Código</th>
                <th width="85%">Descrição</th>
                <th width="10%"></th>
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
                    <button type="button" className="btn btn-sm btn-primary m-1" data-toggle="modal" data-target={`#modModal-${test._id}`}>
                      <i class="bi bi-pencil-fill"></i>
                    </button>
                    <button type="button" onClick={() => remove(test._id)} className="btn btn-sm btn-danger">
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
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <label htmlFor="descricao">Descrição</label>
              <input type="text" name="descricao" id="test-descricao" className="form-control form-control-sm" />
            </div>
            <div className="modal-footer">
              <button type="button" onClick={save} data-dismiss="modal" className="btn btn-primary">Salvar</button>
            </div>
          </div>
        </div>
      </div>

      {tests.map((test) => (
        <div className="modal fade" id={`modModal-${test._id}`} tabIndex="-1" role="dialog" aria-labelledby="modModal" aria-hidden="true" key={test._id}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modModal">Editar Teste</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <label htmlFor={`test-descricao-mod-${test._id}`}>Descrição</label>
                <input type="text" name="descricao" value={test.descricao} id={`test-descricao-mod-${test._id}`} className="form-control form-control-sm" />
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => modify(test._id)} data-dismiss="modal" className="btn btn-primary">Salvar</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestComponent;
