import { auth, onAuthStateChanged, signOut, db } from './authModule.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

onAuthStateChanged(auth, function (user) {
    if (user) {
        showUserEmail(user.email);
        loadRecipes();
        addLogoutButton();
    } else {
        window.location.href = 'auth.html';
    }
});

function showUserEmail(userEmail) {
    var userEmailElement = document.getElementById('userEmail');
    if (userEmailElement) {
        userEmailElement.innerText = 'Bem-vindo: ' + userEmail;
    }
}

function addLogoutButton() {
    var logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            signOut(auth).then(() => {
                window.location.href = 'auth.html';
            }).catch((error) => {
                console.error('Erro ao fazer logout:', error);
            });
        });
    }
}

function loadRecipes() {
    var recipeList = document.getElementById('recipeList');

    const recipesCollection = collection(db, 'recipes');

    getDocs(recipesCollection)
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var recipe = doc.data();
                var recipeCard = document.createElement('div');
                recipeCard.className = 'col-md-4 mb-4';

                recipeCard.innerHTML = `
                <div class="card">
                    <div class="card-body text-center">
                        <h5 class="card-title">${recipe.name}</h5>
                        <p class="card-text">Tempo: ${recipe.time}</p>
                        <p class="card-text">Categoria: ${recipe.category}</p>
                        <p class="card-text">Curtidas: ${recipe.likesBy.length}</p>
                        <button class="btn btn-primary" onclick="viewRecipe('${doc.id}')">Ver Receita</button>
                    </div>
                </div>
                `;

                recipeList.appendChild(recipeCard);
            });
        })
        .catch((error) => {
            console.error('Erro ao carregar receitas:', error);
        });
}

window.viewRecipe = function(recipeId) {
    const recipeURL = `recipe.html?id=${encodeURIComponent(recipeId)}`;
    window.location.href = recipeURL;
};
