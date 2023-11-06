/*function genererPhotosModal(photosModal) {
    //Création d'une boucle qui va prendre toutes les photos
    for (let i = 0; i < photosModal.length; i++) {
      // Création des balises
      const article = photosModal[i];
  
      const sectionGallery = document.querySelector(".galleryModal");
  
      const articleElement = document.createElement("article");
      articleElement.classList.add("photosRealisation");
      articleElement.dataset.id = [i];
  
      const idElement = document.createElement("p");
      idElement.innerText = article.id;
  
      const titleElement = document.createElement("p");
      titleElement.innerText = "editer";
  
      //Ajout de l'icone supprimé-----------
      const iconeElement = document.createElement("div");
      iconeElement.classList.add("deletePhoto");
      iconeElement.innerHTML =
        '<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.6 1.8V0.9C6.6 0.402944 6.19704 0 5.7 0H3.3C2.80294 0 2.4 0.402944 2.4 0.9V1.8H0V2.4H0.6V8.1C0.6 8.59704 1.00294 9 1.5 9H7.5C7.99704 9 8.4 8.59704 8.4 8.1V2.4H9V1.8H6.6ZM3 0.9C3 0.734316 3.13432 0.6 3.3 0.6H5.7C5.86568 0.6 6 0.734316 6 0.9V1.8H3V0.9ZM4.2 4.2V7.2H4.8V4.2H4.2ZM2.4 7.2V5.4H3V7.2H2.4ZM6 5.4V7.2H6.6V5.4H6Z" fill="white"/></svg>';
  
      const imageElement = document.createElement("img");
      imageElement.src = article.imageUrl;
  
      const categoryIdElement = document.createElement("p");
      categoryIdElement.innerText = article.categoryId;
  
      //Ajout de articleElement dans sectionGallery
  
      sectionGallery.appendChild(articleElement);
  
      //Ajout de nos balises au DOM
      articleElement.appendChild(imageElement);
      articleElement.appendChild(titleElement);
      articleElement.appendChild(iconeElement);
  
      //--------------Suppression photo--------------------------------
      iconeElement.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const iconeElement = article.id;
        let monToken = localStorage.getItem("token");
        console.log(iconeElement);
        let response = await fetch(
          `http://localhost:5678/api/works/${iconeElement}`,
          {
            method: "DELETE",
            headers: {
              
              Authorization: `Bearer ${monToken}`,
            },
          }
        );
        if (response.ok) {
          return false;
          // if HTTP-status is 200-299
          //alert("Photo supprimé avec succes");
          // obtenir le corps de réponse (la méthode expliquée ci-dessous)
        } else {
          alert("Echec de suppression");
        }
      });
  
      //---------------FIN DE GENERER PHOTO--------------------
    }


    */