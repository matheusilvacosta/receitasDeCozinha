import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from './authModule.js';

function redirectIfAuthenticated() {
  onAuthStateChanged(auth, function (user) {
    if (user) {
      window.location.href = '../index.html';
    }
  });
}

document.addEventListener('DOMContentLoaded', redirectIfAuthenticated);

function register() {
  var email = document.getElementById('loginEmail').value;
  var password = document.getElementById('loginPassword').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(function () {
      window.location.href = '../index.html';
    })
    .catch(function (error) {
      document.getElementById('registerError').innerText = 'Erro ao registrar usuário: ' + error.message;
    });
}

function login() {
  var email = document.getElementById('loginEmail').value;
  var password = document.getElementById('loginPassword').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(function () {
      window.location.href = '../index.html';
    })
    .catch(function (error) {
      document.getElementById('loginError').innerText = 'Erro ao fazer login: ' + error.message;
    });
}

function signInWithGoogle() {
  var provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then(function () {
      window.location.href = '../index.html';
    })
    .catch(function (error) {
      document.getElementById('googleError').innerText = 'Erro ao autenticar com Google: ' + error.message;
    });
}

const btnRegister = document.getElementById("btnRegister");
btnRegister.addEventListener("click", register);

const btnLogin = document.getElementById("btnLogin");
btnLogin.addEventListener("click", login);

const btnGoogle = document.getElementById("btnGoogle");
btnGoogle.addEventListener("click", signInWithGoogle);
