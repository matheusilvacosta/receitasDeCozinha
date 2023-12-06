import { auth, onAuthStateChanged} from './authModule.js';

onAuthStateChanged(auth, function (user) {
    if (!user) {
        window.location.href = 'auth.html';
    }
});

function submitForm() {
    // Obter os dados do formulário
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Construir objeto com os dados do formulário
    var formData = {
        name: name,
        email: email,
        message: message
    };

    // Enviar dados do formulário para o endpoint do Formspree
    fetch('https://formspree.io/matheus.sico@hotmail.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            // Processar a resposta do servidor (pode exibir uma mensagem de sucesso, etc.)
            alert('Mensagem enviada com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao enviar mensagem:', error);
            alert('Erro ao enviar mensagem. Por favor, tente novamente mais tarde.');
        });
}
