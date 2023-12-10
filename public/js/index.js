import { auth, onAuthStateChanged, signOut, db } from "./authModule.js";
import {
  collection,
  getDocs,
  query,
  orderBy,
  getDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

onAuthStateChanged(auth, function (user) {
  if (user) {
    showUserEmail(user.email);
    loadRecipes("name");
    addLogoutButton();
  } else {
    window.location.href = "./pages/auth.html";
  }
});

function showUserEmail(userEmail) {
  var userEmailElement = document.getElementById("userEmail");
  if (userEmailElement) {
    userEmailElement.innerText = "Bem-vindo: " + userEmail;
  }
}

function addLogoutButton() {
  var logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      signOut(auth)
        .then(() => {
          window.location.href = "./pages/auth.html";
        })
        .catch((error) => {
          console.error("Erro ao fazer logout:", error);
        });
    });
  }
}

function loadRecipes(orderByParams, order) {
  var recipeList = document.getElementById("recipeList");

  // Adicione a ordenação pela data de criação
  const q = query(collection(db, "recipes"), orderBy(orderByParams, order));

  getDocs(q)
    .then((querySnapshot) => {
      // Limpa a lista de receitas antes de adicionar novas
      recipeList.innerHTML = "";

      querySnapshot.forEach((data) => {
        var recipe = data.data();

        const recipeCard = document.createElement("div");
        recipeCard.className = "col-md-4 mb-4";

        const cardMain = document.createElement("div");
        cardMain.classList.add("card");

        const cardRecipe = document.createElement("div");
        cardRecipe.classList.add("card-body", "text-center");

        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = recipe.name;

        const tempo = document.createElement("p");
        tempo.classList.add("card-text");
        tempo.textContent = `Time: ${recipe.time}`;

        const categoria = document.createElement("p");
        categoria.classList.add("card-text");
        categoria.textContent = `Categoria: ${recipe.category}`;

        const curtidas = document.createElement("p");
        curtidas.classList.add("card-text");
        curtidas.textContent = `Curtidas: ${recipe.likes}`;

        const viewRecipe = document.createElement("button");
        viewRecipe.classList.add("btn", "btn-primary");
        viewRecipe.textContent = "Ver receita";
        viewRecipe.addEventListener("click", () => {
          const recipeURL = `./pages/recipe.html?id=${encodeURIComponent(
            data.id
          )}`;
          window.location.href = recipeURL;
        });

        const colorBtn = JSON.parse(localStorage.getItem(`@like-button-${data.id}`));

        const likeButton = document.createElement("button");
        likeButton.style.marginLeft = "1rem";
        likeButton.classList.add("like-button", "btn", "btn-primary");
        likeButton.style.backgroundColor =
          colorBtn && colorBtn.id === data.id ? colorBtn.color : "blue";

        likeButton.addEventListener("click", async () => {
          const color = localStorage.getItem(`@like-button-${data.id}`);

          if (!color) {
            localStorage.setItem(
              `@like-button-${data.id}`,
              JSON.stringify({ id: data.id, color: "red" })
            );
            const recipesCollection = collection(db, "recipes");
            const recipeDocRef = doc(recipesCollection, data.id);
            likeButton.style.backgroundColor = "red";
            const docSnapshot = await getDoc(recipeDocRef);
            await updateDoc(recipeDocRef, {
              likes: docSnapshot.data().likes + 1,
            });
            window.location.reload()
            return;
          }

          if (likeButton.style.backgroundColor === "red") {
            localStorage.removeItem(`@like-button-${data.id}`);
            likeButton.style.backgroundColor = "blue";
            const recipesCollection = collection(db, "recipes");
            const recipeDocRef = doc(recipesCollection, data.id);
            likeButton.style.backgroundColor = "red";
            const docSnapshot = await getDoc(recipeDocRef);
            await updateDoc(recipeDocRef, {
              likes: docSnapshot.data().likes - 1,
            });
            window.location.reload();
          } else {
            likeButton.style.backgroundColor = "red";
          }
        });

        const icon = document.createElement("img");
        icon.src = "./images/coracao.png";
        icon.style.maxHeight = "1rem";
        icon.style.maxHeight = "1rem";
        likeButton.appendChild(icon);

        cardRecipe.appendChild(title);
        cardRecipe.appendChild(tempo);
        cardRecipe.appendChild(categoria);
        cardRecipe.appendChild(curtidas);
        cardRecipe.appendChild(viewRecipe);
        cardRecipe.appendChild(likeButton);
        cardMain.appendChild(cardRecipe);

        recipeCard.appendChild(cardMain);

        recipeList.appendChild(recipeCard);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar receitas:", error);
    });
}

// Adicione event listeners para os botões de filtro
document
  .getElementById("recentesButton")
  .addEventListener("click", function () {
    loadRecipes("createdAt", "desc");
  });

document
  .getElementById("menorTempoButton")
  .addEventListener("click", function () {
    loadRecipes("time", "asc");
  });

document
  .getElementById("favoritasButton")
  .addEventListener("click", function () {
    loadRecipes("likes", "desc");
  });
