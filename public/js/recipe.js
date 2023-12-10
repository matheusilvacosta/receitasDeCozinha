import { collection, doc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { db } from './authModule.js';

window.addEventListener('load', ()=> {
    const isAdmin = localStorage.getItem("@isAdmin");
    const btnDelete = document.getElementById("btn-delete");
    if(isAdmin === "false"){
        btnDelete.style.display = 'none'
    }
})

document.getElementById('btn-delete').addEventListener('click', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    var confirmExit = confirm('Tem certeza que deseja excluir?');
  
    if (confirmExit) {
        const docRef = doc(db, "recipes", recipeId);
        await deleteDoc(docRef);
        window.location.href = "../index.html"
    }
  });

// Função para carregar detalhes da receita
async function loadRecipeDetails() {
    // Obtém o ID da receita da URL
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    // Substitua 'recipes' pelo nome da sua coleção no Firestore
    const recipesCollection = collection(db, 'recipes');
    const recipeDocRef = doc(recipesCollection, recipeId);

    try {
        const docSnapshot = await getDoc(recipeDocRef);

        if (docSnapshot.exists()) {
            const recipe = docSnapshot.data();
            displayRecipeDetails(recipe);
        } else {
            console.error('Receita não encontrada.');
        }
    } catch (error) {
        console.error('Erro ao carregar detalhes da receita:', error);
    }
}

function displayRecipeDetails(recipe) {
    const recipeDetailsContainer = document.getElementById('recipeDetails');

    if (recipeDetailsContainer) {
        const imageUrl = recipe.imgURL ? `<img src="${recipe.imgURL}" alt="Imagem da Receita" class="img-fluid">` : '';

        recipeDetailsContainer.innerHTML = `
            <h2>${recipe.name}</h2>
            <p>Criador: ${recipe.creator}</p>
            <p>Curtidas: ${recipe.likes}</p>
            <p>Tempo: ${recipe.time}</p>
            <p>Categoria: ${recipe.category}</p>
            <p>Ingredientes:</p>
            <ul>
                ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <p>Modo de Preparo:</p>
            <ol>
                ${recipe.preparation.map(step => `<li>${step}</li>`).join('')}
            </ol>
            ${imageUrl}
        `;
    }
}

document.addEventListener('DOMContentLoaded', loadRecipeDetails);
