import { auth, onAuthStateChanged} from './authModule.js';

onAuthStateChanged(auth, function (user) {
    if (!user) {
        window.location.href = 'auth.html';
    }
});

function submitForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    var formData = {
        name: name,
        email: email,
        message: message
    };

    fetch('https://formspree.io/matheus.sico@hotmail.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Adicionando um log para visualizar a resposta
            alert('Mensagem enviada com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao enviar mensagem:', error);
            alert('Erro ao enviar mensagem. Por favor, tente novamente mais tarde.');
        });
}
