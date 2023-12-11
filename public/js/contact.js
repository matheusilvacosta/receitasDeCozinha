import { db } from "./authModule.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const btnSend = document.getElementById("btn-send-contact");
btnSend.addEventListener("click", sendContact);

async function sendContact() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !message) {
    alert("Por favor, preencha todos os campos antes de enviar.");
    return;
  }

  const newContact = {
    name,
    email,
    message,
  };

  const contactCollection = collection(db, "contact");
  try {
    const novoDocRef = await addDoc(contactCollection, newContact);
    alert("Mensagem enviada!");
    window.location.href = "../index.html";
  } catch (err) {
    alert("Aconteceu um erro inesperado!");
  }
}
