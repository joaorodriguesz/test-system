import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TestListComponent = () => {
  const [tests, setTests] = useState([]);

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
    <div className="container-fluid mt-3">
      <h2 className="text-center mb-4">Resolver Teste</h2>
      <div className="container-fluid">
        <div id="contTable">
          <div className="text-center mt-4 mb-4 d-none" id="loading">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          <table className="table table-sm table-striped table-hover table-bordered mb-3" id="main-table">
            <thead>
              <tr>
                <th width="15%">Código</th>
                <th width="80%">Descrição</th>
                <th width="5%" className='text-center'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test._id}>
                  <td className="text-center">{test._id}</td>
                  <td>{test.title}</td>
                  <td className="text-center">
                    <Link to={`/test-question/${test._id}`} className="btn btn-sm btn-secondary m-1">
                      <i className="bi bi-file-earmark-medical"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TestListComponent;
