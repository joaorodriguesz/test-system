import React, { useState, useEffect } from 'react';

const Home = () => {
    const [tests, setTests] = useState([]);

    const loadPage = () => {
        fetch(`http://localhost:8080/api/results`, {
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

    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'ascending',
    });

    const sortResults = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        const sortedResults = [...tests].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });
        setTests(sortedResults);
        setSortConfig({ key, direction });
    };

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
        <main>
            <div className="mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                Resultados dos Testes
                            </div>
                            <div className="text-center mt-4 mb-4 d-none" id="loading">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            <div className="card-body" id="main">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" role="button" onClick={() => sortResults('_id')} className=''>
                                                #
                                            </th>
                                            <th scope="col" role="button" onClick={() => sortResults('studantName')}>
                                                Estudante
                                            </th>
                                            <th scope="col" role="button" onClick={() => sortResults('test.title')}>
                                                Test
                                            </th>
                                            <th scope="col" role="button" onClick={() => sortResults('questionsCount')}>
                                                Qtd Perguntas
                                            </th>
                                            <th scope="col" role="button" onClick={() => sortResults('answeredQuestionsCount')}>
                                                Qtd Prgts respondidas
                                            </th>
                                            <th scope="col" role="button" onClick={() => sortResults('correctQuestionsCount')}>
                                                Qtd Prgts corretas
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tests.map((result, index) => (
                                            <tr key={index}>
                                                <th scope="row">{result._id}</th>
                                                <td>{result.studantName}</td>
                                                <td>{result.test.title}</td>
                                                <td>{result.questionsCount}</td>
                                                <td>{result.answeredQuestionsCount}</td>
                                                <td>{result.correctQuestionsCount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;
