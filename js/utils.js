/**
 * Formatage du texte unicode
 * @param {String} data 
 * @returns data formaté
 */
export const normalizer = (data) => {
    data = data.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    data = data.replace(/[.,!;:?]/g, "");
    data = data.toLowerCase();
    return data;
}

/**
 * Formatage du texte en kebab-case
 * @param {String} data 
 * @returns data formaté
 */
export const kebabCase = (data) => {
    data = data.split(" ").join("-");
    data = data.replace("'", "-");
    return data;
}

/**
 * Ouverture du filtre en fonction du type selectionné
 * @param {String} type 
 */
export const openFilter = (type) => {
    //-- Réinitialise les boutons et filtres
    const filters_btn = document.querySelectorAll(".filter_btn");
    filters_btn.forEach(btn => {
        btn.classList.remove("btn-cacher");
        btn.classList.add("btn-afficher");
    });

    const filters = document.querySelectorAll(".filter_search");
    filters.forEach(filter => {
        filter.classList.remove("display_filter_search");
        filter.classList.add("hide_filter_search");
    });
    
    //-- Apparence du bouton et filtre en question
    const type_btn      = document.getElementById(`${type}_btn`);
    const type_searched = document.getElementById(`${type}_search`);
    const filter_input  = type_searched.querySelector("input");
    
    type_btn.classList.add("btn-cacher");
    type_searched.classList.add("display_filter_search");
    filter_input.focus();
}

/**
 * Fermeture du filtre en fonction du type
 * @param {String} type 
 */
export const closeFilter = (type) => {
    let type_btn = document.getElementById(`${type}_btn`);
    let type_searched = document.getElementById(`${type}_search`);

    type_btn.classList.remove("btn-cacher");
    type_btn.classList.add("btn-afficher");
    type_searched.classList.remove("display_filter_search");
    type_searched.classList.add("hide_filter_search");
}