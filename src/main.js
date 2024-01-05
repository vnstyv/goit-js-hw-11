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
  key: '34228101-50b55348103eeb6dd10b59f8d',
  q: 'cat',
  image_type: 'photo',
  orientation: 'horizontal',
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
