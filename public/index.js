import { auth, onAuthStateChanged, signOut, db } from './authModule.js';
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

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

function loadRecipes(filter) {
    var recipeList = document.getElementById('recipeList');

    // Adicione a ordenação pela data de criação
    const q = query(collection(db, "recipes"), orderBy("createdAt", "desc"));

    getDocs(q)
        .then((querySnapshot) => {
            // Limpa a lista de receitas antes de adicionar novas
            recipeList.innerHTML = '';

            querySnapshot.forEach((doc) => {
                var recipe = doc.data();

                // Adiciona a verificação de filtro
                if (!filter || filter === 'recentes' || (filter === 'menor-tempo' && recipe.time < 30) || 
                (filter === 'favoritas' && recipe.likesBy.length > 0)) {
                    var recipeCard = document.createElement('div');
                    recipeCard.className = 'col-md-4 mb-4';

                    recipeCard.innerHTML = `
              <div class="card">
                <div class="card-body text-center">
                  <h5 class="card-title">${recipe.name}</h5>
                  <p class="card-text">Tempo: ${recipe.time}</p>
                  <p class="card-text">Categoria: ${recipe.category}</p>
                  <p class="card-text">Curtidas: ${recipe.likes}</p>
                  <button class="btn btn-primary" onclick="viewRecipe('${doc.id}')">Ver Receita</button>
                </div>
              </div>
            `;

                    recipeList.appendChild(recipeCard);
                }
            });
        })
        .catch((error) => {
            console.error('Erro ao carregar receitas:', error);
        });
}

// Adicione event listeners para os botões de filtro
document.getElementById('recentesButton').addEventListener('click', function () {
    loadRecipes('recentes');
});

document.getElementById('menorTempoButton').addEventListener('click', function () {
    loadRecipes('menor-tempo');
});

document.getElementById('favoritasButton').addEventListener('click', function () {
    loadRecipes('favoritas');
});


window.viewRecipe = function (recipeId) {
    const recipeURL = `recipe.html?id=${encodeURIComponent(recipeId)}`;
    window.location.href = recipeURL;
};
