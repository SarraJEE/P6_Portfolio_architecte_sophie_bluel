document.addEventListener('DOMContentLoaded', function () {
    const api_url_works = 'http://localhost:5678/api/works';
    const api_url_categories = 'http://localhost:5678/api/categories';
    let works = [];
    let categories = [];
    const sectionWorks = document.querySelector(".gallery");
    const sectionFiltreBtns = document.querySelector(".btns");
    const boutonTous = document.querySelector(".btnTous");
    // boutonTous.classList.add("btn_active");
    async function main() {
        // Appeler la fonction pour récupérer et afficher les données
        await displayWorks();
        await displayCategories(); // Ajout de l'appel pour afficher les catégories

        await Admin();
    }

    main();

    async function displayWorks(categoryId) {
        try {
            // Effectuer la requête pour récupérer les Works 
            const response = await fetch(api_url_works);
            if (!response.ok) {
                throw new Error('La requête a échoué');
            }
            // Extraire les données au format JSON
            works = await response.json();

            //Supprimez la galerie actuelle
            sectionWorks.innerHTML = '';
            // Parcourir les données et afficher chaque projet
            works.forEach((work) => {
                //console.log(work.category.id + "//" +categoryId)            
                if (work.category.id == categoryId || categoryId == null) {
                    createWork(work);
                }
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des données : ", error);
        }
    }
    // Créer un work dans la galerie
    function createWork(work) {
        const figure = document.createElement("figure");
        sectionWorks.appendChild(figure);
        const img = document.createElement("img");
        img.src = work.imageUrl;
        figure.appendChild(img);
        img.alt = work.title;
        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML = work.title;
        figure.appendChild(figcaption);
    }
    // Créer un bouton pour chaque catégorie
    function createCategory(category) {
        const bouton = document.createElement("button");
        bouton.innerText = category.name;
        bouton.classList.add("btn");
        bouton.classList.add("btn" + category.id);
        sectionFiltreBtns.appendChild(bouton);
        bouton.addEventListener("click", () => {
            const categoryId = category.id; // Récupérer l'ID de la catégorie
            const categoryButtons = document.querySelectorAll(".btn");
            // Supprimer la classe active de tous les boutons
            categoryButtons.forEach((button) => button.classList.remove("btn_active"));
            // Ajouter la classe active au bouton cliqué 
            bouton.classList.add("btn_active");
            //console.log(categoryId);
            displayWorks(categoryId);
        });
    }
    async function displayCategories() {
        try {
            // Effectuer la requête pour récupérer les catégories
            const response = await fetch(api_url_categories);

            if (!response.ok) {
                throw new Error("La requête a échoué");
            }
            // Extraire les catégories au format JSON
            categories = await response.json();
            // Parcourir les catégories et créer un bouton pour chaque catégorie
            categories.forEach((category) => {
                createCategory(category);
            });
            //clic sur le boton tous
            boutonTous.addEventListener("click", () => {
                const categoryButtons = document.querySelectorAll('.btn');
                // Supprimer la classe active de tous les boutons
                categoryButtons.forEach((button) => button.classList.remove("btn_active"));
                // Ajouter la classe active au bouton cliqué 
                boutonTous.classList.add("btn_active");
                displayWorks();

            });
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories : ", error);
        }
    }

});

//Partie Admin connecté
const adminToken=sessionStorage.getItem("token");

function Admin(){
if (adminToken){
    const connect=document.querySelector(".loginAdmin");
    connect.innerHTML= "<a href='#'>logout</a>";
    connect.addEventListener("click",(e) => {
        e.preventDefault(); 
        sessionStorage.removeItem("token");
        window.location.href="index.html";
    });

    adminDisplay();
    modaleProjets();
    
};


};
function adminDisplay(){
 //Création de la banniére
 const banner = document.querySelector(".banner");
 banner.innerHTML = '<i class="fa-solid fa-pen-to-square" style="color: white;"></i>' + '<h2>Mode édition</h2>';
 banner.classList.add("visibleBanner");
 
//On masque les filtres 
const sectionFiltreBtns = document.querySelector(".btns");
sectionFiltreBtns.classList.add("invisible");
//Ajout du bouton modifie
// Sélectionnez l'élément du modal
const modal = document.getElementById("modal1");
const portfolio =document.getElementById("portfolio");
const boutonEdit=document.createElement("a");
boutonEdit.innerHTML='<i class="fa-solid fa-pen-to-square" style="color:black;";></i>'+'<h2 >modifier<h2/>';
boutonEdit.addEventListener("click", ouvrirModal);

boutonEdit.classList.add("boutonEdit");
portfolio.appendChild(boutonEdit);
/**************************************************************** */

// Fonction pour ouvrir le modal
function ouvrirModal() {
  modal.style.display = "block";
}



}

// Génère les projets dans la modale admin
async function modaleProjets() {
    try {
      const response = await fetch('http://localhost:5678/api/works');
      const dataAdmin = await response.json();
      const modalContenu = document.querySelector(".gallery-modal"); // Sélectionnez le contenu de la modale
  
      for (let i = 0; i < dataAdmin.length; i++) {
        const fig = document.createElement("figure");
        fig.classList.add("gallery-modale");
        modalContenu.appendChild(fig); // Ajoutez le div à modal-contenu
  
        const img = document.createElement("img");
        img.src = dataAdmin[i].imageUrl;
        fig.appendChild(img); // Ajoutez l'image à la figure
        img.classList.add("gallery-modale-img");
        const p = document.createElement("p"); // Créez un élément p pour contenir l'icône
        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-trash-can");
        p.appendChild(icon);
        fig.appendChild(p); // Ajoutez p avec l'icône à la figure
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données admin : ", error);
    }
  }
  