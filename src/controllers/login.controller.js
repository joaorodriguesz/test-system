
function togglePassword(){
    const senha = document.querySelector('.senha');
    if (senha.type === 'password') {
        senha.type = 'text';
    } else {
        senha.type = 'password';
    }
}