import { createCardsCatalog } from '../../common/card/card.js';
const catalogElement = document.querySelector('.catalog-section');

const catalogURL = 'https://api.themoviedb.org/3/trending/all/week?page=1';

createCardsCatalog(catalogURL, catalogElement);
