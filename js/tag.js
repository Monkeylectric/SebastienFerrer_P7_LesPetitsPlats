import { recipes } from '../data/recipes.js';
import { displayCards } from './cards.js';
import { displayFilters } from './filter.js';
import { kebabCase } from "./utils.js";
// import { checkRecipes } from '../function/search.js';
import { checkRecipes } from '../native/search.js';

export let tagged_recipes = [];
//let tagged_recipes_back = [];

export function tagListener() {
    const all_filters = document.querySelectorAll(".filter_name");

    all_filters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            let type = e.target.id.split("-")[0];
            let name = e.target.id.split("-");
            name.shift();
            name = name.join("-");

            console.log(type, name);

            addTag(type, name);
        })
    });
}

function addTag(type, name) {
    const id_name = kebabCase(name);
    const display_name = name.replaceAll("-", " ");

    const tag_html = `
        <span class="filter ${type}_filter" id="${type}-${id_name}_filter" data-tag-name="${name}" data-tag-type="${type}">
            ${display_name}
            <span id="close_tag_${type}-${name}"><i class="far fa-times-circle"></i></span>
        </span>
    `;

    document.getElementById("chosed_filter").insertAdjacentHTML("beforeend", tag_html);

    document.getElementById(`close_tag_${type}-${name}`).addEventListener('click', (e) => {
        deleteTag(type, name);
    });

    const chosed_filters = document.querySelectorAll("#chosed_filter .filter");
    //console.log(chosed_filters);

    if (chosed_filters.length > 1) {
        //console.log(tagged_recipes);
        tagged_recipes = checkRecipes(tagged_recipes, display_name);
        displayCards(tagged_recipes);
        displayFilters(tagged_recipes);
    } else {
        tagged_recipes = checkRecipes(recipes, display_name);
        displayCards(tagged_recipes);
        displayFilters(tagged_recipes);
    }
}

function deleteTag(type, name) {
    const id_name = kebabCase(name);
    //console.log(target_id);
    document.querySelector(`#${type}-${id_name}_filter`).remove();

    const field_searched = document.querySelector("#search_field");
    const chosed_filters = document.querySelectorAll("#chosed_filter .filter");
    
    if (chosed_filters.length > 0) {
        let recipes_tagged_find;

        chosed_filters.forEach((tag, id) => {
            const tag_name = tag.dataset.tagName;

            if (id > 0) {
                recipes_tagged_find = checkRecipes(tagged_recipes, tag_name);
            } else {
                recipes_tagged_find = checkRecipes(recipes, tag_name);
            }
            
            tagged_recipes = [...recipes_tagged_find];

            displayCards(tagged_recipes);
            displayFilters(tagged_recipes);
        });
    } else {
        if (field_searched.value.length > 0) {
            tagged_recipes = checkRecipes(recipes, field_searched.value);
            displayCards(tagged_recipes);
            displayFilters(tagged_recipes);
        } else {
            displayCards(recipes);
            displayFilters(recipes);
        }
    }
}