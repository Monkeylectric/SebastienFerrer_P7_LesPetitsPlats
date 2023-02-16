export function displayCards(recipes) {
    const recipe_list = document.getElementById("recipes_list");

    recipe_list.innerHTML = "";

    if (recipes.length > 0) {
        recipes.forEach(recipe => {
            //-- Crée un article dans lequel sera afficher la recette
            let article = document.createElement("article");
            //-- Ajoute un id et une classe à l'article
            article.setAttribute("id", `${recipe.id}`);
            article.classList.add("recipe");

            //-- Creation du template pour la recette
            const recipeTemplate = `
                <div class="recipe_img"></div>
                <div class="recipe_content">
                    <h1 class="recipe_title">${recipe.name}</h1>
                    <span class="preparation_time">${recipe.time}</span>
                    <div class="ingredients_list">
                        ${recipe.ingredients.map(ingredient =>
                            `<span class="ingredient_type">${ingredient.ingredient}<span class="ingredient_number">${ingredient.quantity || ''}${ingredient.quantite || ''} ${ingredient.unit || ''}</span></span>`
                        ).join(" ")}
                    </div>
                    <div class="recipe_description">
                        <p>${recipe.description}</p>
                    </div>
                </div>
            `;

            article.innerHTML = recipeTemplate;
            recipe_list.appendChild(article);
        })
    } else {
        recipe_list.innerHTML = `
            <span id="recipe_empty">Aucune recette ne correspond à votre recherche... vous pouvez chercher «Salade de riz», «Poulet», etc...</span>
        `;
    }
}