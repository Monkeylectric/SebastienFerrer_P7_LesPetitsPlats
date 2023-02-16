import { normalizer } from '../js/utils.js';
import { displayCards } from '../js/cards.js';
import { displayFilters } from '../js/filter.js';
import { tagged_recipes } from '../js/tag.js';

export function checkRecipes(recipes, filter) {
    let find_recipes = [];

    for (const recipe of recipes) {
        //-- Verifie la recette
        if (normalizer(recipe.name).toLowerCase().trim().includes(filter.toLowerCase().trim())) {
            find_recipes.push(recipe);
            continue;
        }

        if (normalizer(recipe.description).toLowerCase().trim().includes(filter.toLowerCase().trim())) {
            find_recipes.push(recipe);
            continue;
        }

        if (normalizer(recipe.appliance).toLowerCase().trim().includes(filter.toLowerCase().trim())) {
            find_recipes.push(recipe);
            continue;
        }

        //-- Verifie les ustensils
        for (const ustensil of recipe.ustensils) {
            if (normalizer(ustensil).toLowerCase().includes(filter.toLowerCase())) {
                find_recipes.push(recipe);
                //continue;
            }

            continue;
        }

        //-- Verifie les ingredients
        for (const ingredient of recipe.ingredients) {
            if (normalizer(ingredient.ingredient).toLowerCase().trim().includes(filter.toLowerCase().trim())) {
                find_recipes.push(recipe);
                //continue;
            }
        }
    }

    //-- Supprime les doublons
    //find_recipes = [...new Set(find_recipes)];

    return find_recipes;
}

export function generalSearch(recipes) {
    //-- Champ de recherche principal
    const field_searched = document.querySelector("#search_field");

    //-- Suit ce que l'utilisateur rentre
    field_searched.addEventListener("input", (e) => {
        const chosed_filters = document.querySelectorAll("#chosed_filter span");
        //-- Au bout de trois inputs on déclenche la recherche
        if (field_searched.value.length > 2) {
            if (chosed_filters.length > 0) {
                const new_recipes = checkRecipes(tagged_recipes, normalizer(e.target.value))
                displayCards(new_recipes);
                displayFilters(new_recipes);
            } else {
                //console.log(e.target.value);
                const search_value = normalizer(e.target.value);
                const find_recipes = checkRecipes(recipes, search_value);

                displayCards(find_recipes);
                displayFilters(find_recipes);
                //console.log(find_recipes);
            }
        } else {
            if (chosed_filters.length > 0) {
                const new_recipes = checkRecipes(tagged_recipes, normalizer(e.target.value))
                displayCards(new_recipes);
                displayFilters(new_recipes);
            } else {
                displayCards(recipes);
                displayFilters(recipes);
            }
        }
    })
}

export function filtersSearch(recipes) {
    const filters_search = document.querySelectorAll(".filter_field");

    filters_search.forEach(filter_input => {
        filter_input.addEventListener("input", (e) => {
            const chosed_filters = document.querySelectorAll("#chosed_filter span");

            if (chosed_filters.length > 0) {
                const new_recipes = checkRecipes(tagged_recipes, normalizer(e.target.value))
                displayCards(new_recipes);
                displayFilters(new_recipes);
            }else {
                //console.log(e.target.value);
                const filter_value = normalizer(e.target.value);
                const find_recipes = checkRecipes(recipes, filter_value);

                displayCards(find_recipes);
                displayFilters(find_recipes);
                console.log(find_recipes);
            }
        })
    })
}