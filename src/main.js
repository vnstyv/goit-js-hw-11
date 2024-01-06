import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const pageForm = document.querySelector(".form");
const pageInput = document.querySelector("input");
const pageGalleryBox = document.querySelector(".gallery-box");
const pageLoader = document.querySelector(".loader");
const pageGallery = document.querySelector(".gallery");

const searchParamsDefaults = {
  key: "34228101-50b55348103eeb6dd10b59f8d",
  q: "cat",
  image_type: "photo",
  orientation: "horizontal",
  safesearch: true,
};

const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
    nav: true,
    close: true,
    enableKeyboard: true,
    docClose: true
    });

function searchImg(params) {
    pageLoader.style.display = 'block';
    return fetch(`https://pixabay.com/api/?${params}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(({ hits }) => {
            if (hits.length > 0) {
                const renderImg = hits.reduce((html, hit) => {
                    return (
                        html +
                        `<li class="gallery-item">
                        <a href=${hit.largeImageURL}>
                        <img class="gallery-img" src=${hit.webformatURL} alt=${hit.tags}>
                        </a>
                        <div class="gallery-text-box">
                        <p>Likes: <span class="text-value">${hit.likes}</span></p>
                        <p>Views: <span class="text-value">${hit.views}</span></p>
                        <p>Comments: <span class="text-value">${hit.comments}</span></p>
                        <p>Downloads: <span class="text-value">${hit.downloads}</span></p>
                        </div>
                        </li>`
                
                    );
                }, '');

                pageGallery.innerHTML = renderImg;

                lightbox.refresh();

            } else {
                iziToast.error({
                    position: 'topRight',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                });
            }
        })
    
        .catch(error => {
            console.log(error.message);
        })
        .finally(() => {
            pageLoader.style.display = 'none';
        });
}

pageForm.addEventListener("submit", event => {
    event.preventDefault();
    pageGallery.innerHTML = '';
    searchParamsDefaults.q = event.target.elements.search.value.trim();
    const searchParams = new URLSearchParams(searchParamsDefaults);
    searchImg(searchParams.toString());
    event.currentTarget.reset();
});