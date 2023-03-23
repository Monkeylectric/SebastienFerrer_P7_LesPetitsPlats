import { normalizer, kebabCase } from './utils.js';
import { tagListener } from './tag.js';

/**
 * Rempli les listes des filtres
 * @param {Array} recipes 
 * @param {String} type 
 */
function fillFilter(recipes, type) {
    const filter_list      = document.getElementById(`${type}_filter_list`);
    const selected_filters = document.querySelectorAll(`[data-tag-type="${type}"]`);
    let list = [];
    let tags = [];

    filter_list.innerHTML = "";

    //-- Verifie s'il y a des tags
    if (selected_filters.length > 0) {
        selected_filters.forEach(tag => {
            tags.push(tag.dataset.tagName);
        });
    }else {
        tags = [];
    }

    //-- Ajoute dans un tableau les données selon le type
    recipes.forEach(recipe => {
        switch(type) {
            case "ingredients":
                recipe.ingredients.map(data => list.push(normalizer(data.ingredient))).join("");
                break;
            case "appliance":
                list.push(normalizer(recipe.appliance));
                break;
            case "ustensils":
                recipe.ustensils.map(data => list.push(normalizer(data))).join("");
                break;
            default:
                break;
        }
    });

    //-- Tri par ordre alphabétique
    list = list.sort((a, b) => a.localeCompare(b));

    //-- Insert en éliminant les doublons dans le DOM
    const clean_list = new Set(list);

    clean_list.forEach(data => {
        //-- Supprime le filtre s'il est tag
        if (!tags.includes(data)) {
            const name = kebabCase(normalizer(data));
            const li = `<li class="filter_name" id="${type}-${name}" data-type="${type}">${data}</li>`;

            filter_list.insertAdjacentHTML("beforeend", li);
        }
    });
}

/**
 * Affiche les filtres
 * @param {*} recipes 
 */
export function displayFilters(recipes) {
    fillFilter(recipes, "ingredients");
    fillFilter(recipes, "appliance");
    fillFilter(recipes, "ustensils");

    tagListener();
}