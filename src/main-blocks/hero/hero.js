
import SimpleLightbox from "simplelightbox";
import * as basicLightbox from 'basiclightbox'
import {getUser, getTrailer} from "./API"
import {onOpenModal} from "../../common/modal/film-overview/overview"
console.log(onOpenModal);
const hero = document.querySelector(".hero")
const button = document.querySelector('.button-js');


window.addEventListener("resize", updateCinemaText);
button.addEventListener('click', ()=>{window.location.href = 'library.html'});
// if(button){
//     updateLibraryHero()
// }
function updateLibraryHero(){
    if (window.location.href.includes('library')) {
        hero.innerHTML = '';
        hero.classList.add("hero-library")
        const libMurkup = `
                <div class="hero-wrapper">
                    <div class="hero-wrapper-text library-hero-wrapper-text">
                        <h1 class="title">Create Your Dream Cinema</h1>
                        <p class="text" >Is a guide to designing a personalized movie theater experience with the right equipment, customized decor, and favorite films. This guide helps you bring the cinema experience into your own home with cozy seating, dim lighting, and movie theater snacks.</p>
                    </div>
                </div>        
        `;
        hero.innerHTML = libMurkup;
      }
}
getUser().then(res =>{
    console.log("res in getUser.then",res.results);
    console.log("res length in getUser.then",res.results.length);
    if(res.results.length === 0){
        updateCinemaText()
    } else{
        if(window.location.href.includes('library')){
            updateLibraryHero()
        }else{
            renderHero(res)
        }
    }
    }).catch(error=> console.log(error))

function renderHero({results}){
    const randomNumber = Math.floor(Math.random() * (results.length- 1)) ;
    const movieTheDay = results[randomNumber];
    // overview
    // original_name
    // backdrop_path
    // id

    hero.innerHTML="";
    hero.style.backgroundImage = `linear-gradient(86.77deg, #111111 30.38%, rgba(17, 17, 17, 0) 65.61%), url(https://image.tmdb.org/t/p/original${movieTheDay.backdrop_path})`;
    const markUp = `
        <div class="hero-wrapper">
            <div class="hero-wrapper-text" >
                <h1 class="title">${movieTheDay.original_title || movieTheDay.name }</h1>
                <div id="rating-stars"></div>
                <p class="text">${movieTheDay.overview.slice(0, 250) + '...'} </p>
            </div>
            <div class="hero-btn-wrapper" data-id=${movieTheDay.id}>
                <button type="button" class="button hero-btn hero-button-js">Watch trailer</button>
                <button type="button" class="button button-js modal-btn">More details</button>
            </div>
        </div>
    `
    hero.innerHTML = markUp;
    hero.classList.add(".hero-js")
    let rating = movieTheDay.vote_average;
    showRating(rating)

    const detailsButton = document.querySelector(".modal-btn")
    detailsButton.addEventListener("click", onOpenModal)

    console.log("movieTheDay.id",movieTheDay.id);
    // getTrailer(movieTheDay.id).then(watchTrailer).catch()
}
function showRating(rating) {
  console.log('rating inside showRating', rating);
  const filledStarsWidth = (rating / 10) * 100;
  let starsHTML =
    '<div class="star filled-star" style="width: ' + filledStarsWidth + '%;">';
  starsHTML += '&#9733;'.repeat(5);
  starsHTML += '</div>';
  const ratingStarsElement = document.getElementById('rating-stars');
  ratingStarsElement.innerHTML = starsHTML;
}
function updateCinemaText() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let cinemaText = document.getElementById("cinema-text");
    if(cinemaText = null){
        return
    }
  
    if (screenWidth >= 768) {
      cinemaText.textContent = "Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.";
    }  else {
      cinemaText.textContent = "Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers.";
    }
  }


// function watchTrailer({data}){
//     const watchButton = document.querySelector('.hero-button-js');
//     console.log("function watch trailer:",data);
//     const trailers = data.results;
//     if(trailers.length !== 0){
//         console.log("если не равно нулю",trailers);
//         const randomIndex = Math.floor(Math.random() * (trailers.length- 1)) ;
//         const randomTrailer = trailers[randomIndex]
//         console.log(randomTrailer);
//         console.log(randomTrailer.key);
//         watchButton.addEventListener("click", ()=>{
//             console.log("hello");
//             const instance = basicLightbox.create(`
//             <iframe width="560" height="315" src="https://www.youtube.com/embed/${randomTrailer.key}" frameborder="0"></iframe>
//             <iframe
//             id="vimeo-player"
//             src="https://player.vimeo.com/video/236203659"
//             width="640"
//             height="360"
//             frameborder="0"
//             allowfullscreen
//             allow="autoplay; encrypted-media"
//           ></iframe>
//             `);
        
//           instance.show();
//         })
//     }
// }
