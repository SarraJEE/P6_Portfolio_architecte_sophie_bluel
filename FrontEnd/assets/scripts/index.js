
const api_url_works = 'http://localhost:5678/api/works';
const api_url_categories = 'http://localhost:5678/api/categories';
let works = [];
let categories = [];
const sectionWorks = document.querySelector(".gallery");
const sectionFiltreBtns = document.querySelector(".btns");

async function main() {
    // Appeler la fonction pour récupérer et afficher les données
    await displayWorks();
    await displayCategories(); // Ajout de l'appel pour afficher les catégories
}

main();

async function displayWorks() {
    try {
        // Effectuer la requête pour récupérer les données
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
    bouton.classList.add('btn_'+category.id);
    sectionFiltreBtns.appendChild(bouton);
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
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories : ', error);
    }
}



