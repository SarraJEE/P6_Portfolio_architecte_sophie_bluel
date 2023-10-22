   
const api_url = 'http://localhost:5678/api/works';
let works = [];
const sectionProjets = document.querySelector(".gallery");

async function Projects() {
  try {
    // Effectuer la requête pour récupérer les données
    const response = await fetch(api_url);

    if (!response.ok) {
      throw new Error('La requête a échoué');
    }

    // Extraire les données au format JSON
    works = await response.json();

    // Parcourir les données et afficher chaque projet
    works.forEach((project) => {
      const figure = document.createElement("figure");
      sectionProjets.appendChild(figure);
      figure.classList.add(`js-projet-${project.id}`);
      
      const img = document.createElement("img");
      img.src = project.imageUrl;
      img.alt = project.title;
      figure.appendChild(img);

      const figcaption = document.createElement("figcaption");
      figcaption.innerHTML = project.title;
      figure.appendChild(figcaption);
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des données : ', error);
  }
}

// Appeler la fonction Projects pour récupérer et afficher les données
Projects();
const divBtns = document.querySelector(".btns");

//Ajoutez des bouton pour les projets
for (let i = 1; i <= 4; i++) {
    // Créez un élément btn
    const nouveauBtn = document.createElement("button");
    // Ajoutez la classe "btn" à l'élément
    nouveauBtn.className = "btn_" + i;

    // Sélectionnez l'élément avec la classe "btns" et ajoutez l'élément btn comme enfant
    divBtns.appendChild(nouveauBtn);
    // Définissez le contenu du bouton en fonction de l'index
    const bouton = document.querySelector(".btn_" + i);
    if (i === 1) {
        bouton.textContent = "Tous";
        
    } else if (i === 2) {
        bouton.textContent = "Objets";
    } else if (i === 3) {
        bouton.textContent = "Appartements";
    }
 else if (i === 4) {
    bouton.textContent = "Hôtels & restaurants";
}

}





