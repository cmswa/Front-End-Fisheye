async function getPhotographers() {
    const jsonPath = './data/photographers.json';
    // console.log(photographers);
   
    const response =  await fetch(jsonPath);
    const data = await response.json();
    const photographers = data.photographers;
    return photographers;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(
        '.photographer_section'
    );

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const  photographers  = await getPhotographers();
    displayData(photographers);
}

init();
