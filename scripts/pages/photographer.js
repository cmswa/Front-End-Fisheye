//Mettre le code JavaScript lié à la page photographer.html
// const photographerBanner = document.querySelector(".photograph-header");
const urlParams = new URLSearchParams(window.location.search); //récupère l'url et la met dans urlParams
console.log(urlParams);
const id = urlParams.get('id'); //récupère la valeur du champ id dans urlParams et la met dans la const id
console.log(id);

//profil
// async function getProfil() {
//     let profil = [];
//     await fetch('./data/photographers.json')
//         .then((response) => response.json())
//         .then((data) => {
//             profil = data.photographers.find(
//                 (photographer) => photographer.id === +id
//             );
//         });

//     return profil;
// }

//profil
async function getProfil() {
    // let profil = [];
    const jsonPath = './data/photographers.json';
    const response = await fetch(jsonPath);
    const data = await response.json();
    return data.photographers.find((photographer) => photographer.id === +id);
}

async function displayProfil(profil) {
    const profilSection = document.querySelector('.photograph-header');
    const profilModel = profilFactory(profil);
    const profilDOM = profilModel.getUserPageCardDOM();
    profilSection.appendChild(profilDOM);
}

//medias
async function getMedias() {
    const jsonPath = './data/photographers.json';
    const response = await fetch(jsonPath);
    const data = await response.json();
    return data.media.filter((m) => m.photographerId === +id);
}

function insertMedias(medias, photographerName) {
    const content = document.querySelector('.photograph-content');
    medias.forEach((media) => {
        const section = document.createElement('section');
        const title = document.createElement('h3');
        title.textContent = media.title;
        if (media.image) {
            const image = document.createElement('img');
            image.className = 'photograph-content__img';
            image.src = 'assets/medias/' + photographerName + '/' + media.image;
            image.alt = media.title;
            section.append(image);

            let like = document.createElement('div');
            like.className = 'photograph-content__likes';
            like.textContent = media.likes;
            title.append(like);

            const heart = document.createElement('i');
            heart.className = 'fas fa-heart photograph-content__hearts';
            heart.content = '\f004';
            like.append(heart);

            // ajout +1 compteur de like
            like = media.likes;
            heart.addEventListener('click', likeCounter); //event
            function likeCounter() {
                console.log(like);
            }
            for (let i = like; i < like++; i++) {}
        }
        if (media.video) {
            const video = document.createElement('video');
            video.className = 'photograph-content__video';
            const mediaSource = document.createElement('source');
            mediaSource.src =
                'assets/medias/' + photographerName + '/' + media.video;
            const type = document.createAttribute('type');
            type.value = 'video/mp4';
            mediaSource.setAttributeNode(type);
            video.appendChild(mediaSource);
            section.append(video);
        }
        section.append(title);
        content.append(section);
    });
}

// lightbox-modal
const lightbox = document.createElement('div');
lightbox.id = 'lightbox-modal';


// async function displayProfil(profils) {
//     const profilSection = document.querySelector(
//         '.photograph-header'
//     );

//     profils.forEach((profil) => {
//         const profilModel = profilFactory(profil);
//         const profilDOM = profilModel.getUserPageCardDOM();
//         profilSection.appendChild(profilDOM);
//     });
// }

async function init() {
    const profil = await getProfil();
    displayProfil(profil);
    const medias = await getMedias();
    insertMedias(medias, profil.name);
}

init();
