const api_url = 'http://localhost:5678/api/works';
fetch(api_url) // aller chercher la donnée
    .then(response => {
        return response.json(); // extraire toutes les données
    })
    .catch(error => console.error('Erreur lors de la récupération des données : ', error));


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

