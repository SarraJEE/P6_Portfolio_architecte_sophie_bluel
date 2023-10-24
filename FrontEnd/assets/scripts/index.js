
const api_url_works = 'http://localhost:5678/api/works';
const api_url_categories = 'http://localhost:5678/api/categories';
let works = [];
let categories = [];
const sectionWorks = document.querySelector(".gallery");
const sectionFiltreBtns = document.querySelector(".btns");
const boutonTous = document.querySelector(".btnTous");
boutonTous.classList.add("btn_active");


async function main() {
    // Appeler la fonction pour récupérer et afficher les données
    await displayWorks();
    await displayCategories(); // Ajout de l'appel pour afficher les catégories
}

main();


async function displayWorks() {
    try {
        // Effectuer la requête pour récupérer les Works 
        const response = await fetch(api_url_works);
        if (!response.ok) {
            throw new Error('La requête a échoué');
        }
        // Extraire les données au format JSON
        works = await response.json();
        // Parcourir les données et afficher chaque projet
        works.forEach((work) => {
            createWork(work);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des données : ', error);
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
    const bouton = document.createElement('button');
    bouton.innerText = category.name;
    bouton.classList.add("btn");
    bouton.classList.add("btn" + category.id);
    sectionFiltreBtns.appendChild(bouton);
    bouton.addEventListener('click', () => {
        const categoryId = category.id; // Récupérer l'ID de la catégorie
        const categoryButtons = document.querySelectorAll('.btn');
        // Supprimer la classe active de tous les boutons
        categoryButtons.forEach((button) => button.classList.remove("btn_active"));
        // Ajouter la classe active au bouton cliqué 
        bouton.classList.add("btn_active");
        filterWorksByCategory(categoryId);
    });
}
async function displayCategories() {
    try {
        // Effectuer la requête pour récupérer les catégories
        const response = await fetch(api_url_categories);

        if (!response.ok) {
            throw new Error('La requête a échoué');
        }

        // Extraire les catégories au format JSON
        categories = await response.json();

        // Parcourir les catégories et créer un bouton pour chaque catégorie
        categories.forEach((category) => {
            createCategory(category);
        });
        //clic sur le boton tous
        boutonTous.addEventListener('click', () => {
            //Supprimez la galerie actuelle
            sectionWorks.innerHTML = '';
            const categoryButtons = document.querySelectorAll('.btn');
            // Supprimer la classe active de tous les boutons
            categoryButtons.forEach((button) => button.classList.remove("btn_active"));
            // Ajouter la classe active au bouton cliqué 
            boutonTous.classList.add("btn_active");
            displayWorks();

        });
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories : ', error);
    }
}
function filterWorksByCategory(category) {
    // Supprimez la galerie actuelle
    sectionWorks.innerHTML = '';
    // Parcourez les travaux et affichez ceux qui correspondent à la catégorie sélectionnée
    works.forEach((work) => {
        if (work.category.id == category) {
            createWork(work);
        }
    });
}


//ok