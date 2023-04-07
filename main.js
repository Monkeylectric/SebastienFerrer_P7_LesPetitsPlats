import { recipes } from './data/recipes.js';
import { openFilter, closeFilter } from './js/utils.js';
import { displayCards } from './js/cards.js';
import { displayFilters } from './js/filter.js';
import { generalSearch, filtersSearch } from './function/search.js';
//import { generalSearch, filtersSearch } from './native/search.js';

window.addEventListener("DOMContentLoaded", () => {
    displayCards(recipes);
    displayFilters(recipes);
    
    document.querySelectorAll(".filter_type").forEach(element => {
        const filter_btn = element.querySelector(".filter_btn");
        const close_filter_btn = element.querySelector(".close_filter");
        
        const type = filter_btn.id.split("_")[0];
        
        filter_btn.addEventListener('click', () => {
            openFilter(type);
        })
        
        close_filter_btn.addEventListener('click', () => {
            closeFilter(type);
        })
    });

    generalSearch(recipes);
    filtersSearch(recipes);
});
