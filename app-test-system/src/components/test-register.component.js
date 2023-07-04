import React, { useState, useEffect } from 'react';

const TestComponent = () => {
  const [tests, setTests] = useState([]);

  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    const newQuestion = {
      description: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      optionE: '',
      correctOption: ''
    };

    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const save = () => {
    let testDescricao = document.getElementById('test-descricao').value;

    let newTest = {
      title: testDescricao,
      questions: questions,
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

  const modify = (teste) => {

    let testeEditado = {
      title: teste.description,
      questions: teste.questions,
    };

    fetch(`http://localhost:8080/api/tests/${teste._id}`, {
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
                <th width="80%">Descrição</th>
                <th width="10%" className='text-center'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test._id}>
                  <td className="text-center">{test._id}</td>
                  <td>{test.title}</td>
                  <td className="text-center">
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
      <div className="modal fade custom-modal" id="cadModal" tabIndex="-1" role="dialog" aria-labelledby="cadModal" aria-hidden="true">
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="cadModal">Cadastrar Teste</h5>
          </div>
          <div className="modal-body">
            <label>Nome do Teste</label>
            <input type="text" name="descricao" id='test-descricao' className="form-control form-control-sm" />
          </div>
          <div className='row p-2'>
            <div className='col-2'>
              <button type="button" className="btn btn-success btn-sm" onClick={addQuestion}>Adicionar Questão</button>
            </div>
          </div>
          <div className='table-responsive p-2'>
            <table className='table table-sm table-striped table-hover font-12 table-bordered m-auto'>
              <thead className='thead-dark'>
                <tr>
                  <th width="40%">Descrição</th>
                  <th width="10%">Opção A</th>
                  <th width="10%">Opção B</th>
                  <th width="10%">Opção C</th>
                  <th width="10%">Opção D</th>
                  <th width="10%">Opção E</th>
                  <th width="10%">Opção Correta</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question, index) => (
                  <tr key={question.id}>
                    <td><input className='form-control form-control-sm' value={question.description} onChange={(e) => handleQuestionChange(index, 'description', e.target.value)} /></td>
                    <td><input className='form-control form-control-sm' value={question.optionA} onChange={(e) => handleQuestionChange(index, 'optionA', e.target.value)} /></td>
                    <td><input className='form-control form-control-sm' value={question.optionB} onChange={(e) => handleQuestionChange(index, 'optionB', e.target.value)} /></td>
                    <td><input className='form-control form-control-sm' value={question.optionC} onChange={(e) => handleQuestionChange(index, 'optionC', e.target.value)} /></td>
                    <td><input className='form-control form-control-sm' value={question.optionD} onChange={(e) => handleQuestionChange(index, 'optionD', e.target.value)} /></td>
                    <td><input className='form-control form-control-sm' value={question.optionE} onChange={(e) => handleQuestionChange(index, 'optionE', e.target.value)} /></td>
                    <td><input className='form-control form-control-sm' value={question.correctOption} onChange={(e) => handleQuestionChange(index, 'correctOption', e.target.value)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={save} data-bs-dismiss="modal" className="btn btn-primary">Salvar</button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
                
      {tests.map((test) => (
        <div className="modal fade" id={`cadModal-${test._id}`} tabIndex="-1" role="dialog" aria-labelledby={`cadModal-${test._id}`} aria-hidden="true" key={test._id}>
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`cadModal-${test._id}`}>Editar Teste</h5>
              </div>
              <div className="modal-body">
                <div className='row justify-content-center'>
                  <div className='col-8'>
                    <label htmlFor={`test-descricao-${test._id}`}>Nome do Teste</label>
                    <input type="text" name="descricao" id={`test-descricao-${test._id}`} defaultValue={test.title} className="form-control form-control-sm" />
                  </div>
                </div>
                  <div className='table-responsive p-2'>
                    <hr></hr>
                  <table className='table table-sm table-striped table-hover font-12 table-bordered m-auto'>
                    <thead className='thead-dark'>
                      <tr>
                        <th width="40%">Descrição</th>
                        <th width="10%">Opção A</th>
                        <th width="10%">Opção B</th>
                        <th width="10%">Opção C</th>
                        <th width="10%">Opção D</th>
                        <th width="10%">Opção E</th>
                        <th width="10%">Opção Correta</th>
                      </tr>
                    </thead>
                    <tbody>
                    {test.questions.map((question, index) => (
                      <tr key={question._id}>
                        <td><input className='form-control form-control-sm' id={`description-${index}`} defaultValue={question.description} /></td>
                        <td><input className='form-control form-control-sm' id={`optionA-${index}`} defaultValue={question.optionA} /></td>
                        <td><input className='form-control form-control-sm' id={`optionB-${index}`} defaultValue={question.optionB} /></td>
                        <td><input className='form-control form-control-sm' id={`optionC-${index}`} defaultValue={question.optionC} /></td>
                        <td><input className='form-control form-control-sm' id={`optionD-${index}`} defaultValue={question.optionD} /></td>
                        <td><input className='form-control form-control-sm' id={`optionE-${index}`} defaultValue={question.optionE} /></td>
                        <td><input className='form-control form-control-sm' id={`correctOption-${index}`} defaultValue={question.correctOption} /></td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => modify(test)} data-bs-dismiss="modal" className="btn btn-primary">Salvar</button>
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
