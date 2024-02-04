import searchImages from "./api";
import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
// const target = document.querySelector('.js-guard');

let currentValue ='';
let curPage = 1;
// let totalPages = null;

form.addEventListener('submit', onFormSubmit);
loadMore.addEventListener('click', onLoad);

function onLoad() {
    curPage +=1;
    sendFatch(currentValue);
}


function onFormSubmit(evt) {
    evt.preventDefault()
    const inputValue = evt.currentTarget.elements.searchQuery.value.trim();
    currentValue = inputValue;

    if (currentValue !== "") {
        curPage = 1;
        sendFatch(currentValue)
    }
}


async function sendFatch(currentValue) {
    const { hits, totalHits } = await searchImages(currentValue, curPage);
    const markup = createMarkup(hits);
    // const allPages = Math.ceil(totalHits / 40)
    // totalPages = allPages;

    if (curPage === 1) {
        gallery.innerHTML = markup;
        
    } else {
        gallery.innerHTML += markup;
    }

    if (hits.length === 40) {
        loadMore.hidden = false; // Показуємо кнопку, якщо є ще картинки
    } else {
        loadMore.hidden = true; // Ховаємо кнопку, якщо картинок немає
    }

    if (curPage * 40 >= totalHits) {
        loadMore.hidden = true; // Ховаємо кнопку, якщо дійшли до кінця колекції
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }

    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

    // observer.observe(target);
}

function createMarkup(hits) {
    return hits
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
            `<div class="photo-card">
            <a class="gallery__link" href="${largeImageURL}">
                <img class="img-card" src="${webformatURL}" alt="${tags}" loading="lazy" data-source="${largeImageURL}"/>
            </a>
            <div class="info">
                <p class="info-item">
                    <b class="bb">Likes<span class="span-opt">${likes}</span></b>
                </p>
                <p class="info-item">
                    <b class="bb">Views<span class="span-opt">${views}</span></b>
                </p>
                <p class="info-item">
                    <b class="bb">Comments<span class="span-opt">${comments}</span></b>
                </p>
                <p class="info-item">
                    <b class="bb">Downloads<span class="span-opt">${downloads}</span></b>
                </p> 
            </div>
        </div>`
        )
        .join('');
}


// var options = {
//     root: null,
//     rootMargin: "300px",
//     threshold: 1.0,
// };

// var observer = new IntersectionObserver(onLoad, options);

// function onLoad(entries, observer) {
//     entries.forEach((entry) => {
//         if (entry.isIntersecting && curPage < totalPages) {
//             curPage += 1;
//             sendFatch(currentValue);

//             if (curPage === totalPages) {
//                 observer.unobserve(target);
//             }
//         }
//     })
// }
