import { db } from "./authModule.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const btnSave = document.getElementById("btn-save-recipe");
btnSave.addEventListener("click", createRecipe);

document.getElementById('backButton').addEventListener('click', function () {
  var confirmExit = confirm('Tem certeza que deseja voltar? Suas mudanças não salvas serão perdidas.');

  if (confirmExit) {
    window.history.back();
  }
});

async function createRecipe() {
  const recipeName = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const imageURL = document.getElementById("imageURL").value;
  const ingredients = document.getElementById("ingredients").value;
  const preparation = document.getElementById("preparation").value;
  const time = document.getElementById("time").value;

  if (!recipeName || !category || !imageURL || !ingredients || !preparation || !time) {
    alert("Por favor, preencha todos os campos antes de cadastrar a receita.");
    return;
  }

  const newRecipe = {
    name: recipeName,
    category,
    imgURL: imageURL,
    preparation: preparation.split(";").map((o) => o.trim()),
    createdAt: new Date(),
    time,
    creator: localStorage.getItem("@user"),
    ingredients: ingredients.split(";").map((o) => o.trim()),
    likes: 0,
  };

  const recipesCollection = collection(db, "recipes");
  try {
    const novoDocRef = await addDoc(recipesCollection, newRecipe);
    alert("Receita cadastrada");
    window.location.href = "../index.html";
  } catch (err) {
    alert("Aconteceu um erro inesperado!");
  }
}