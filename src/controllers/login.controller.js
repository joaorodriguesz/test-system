function logar(){
    var login = {
        username: document.querySelector('#email').value, 
        password: document.querySelector('#senha').value
    };

    const button = document.querySelector('#login');
    button.classList.add('spinner-border', 'spinner-border-sm');


    fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    })
    .then((response) => {
        fakeLoading().then(()=>{
            button.classList.remove('spinner-border', 'spinner-border-sm');
            loginValid(response.status);
        })
    });
    
}

function loginValid(status){
    if(status != 200){
        document.querySelector('#email').classList.add('is-invalid'); 
        document.querySelector('#senha').classList.add('is-invalid');
        return;
    };

    document.querySelector('#email').classList.add('is-valid'); 
    document.querySelector('#senha').classList.add('is-valid');
}

function fakeLoading() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }