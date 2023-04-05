import React from 'react';
import Recipe from './Recipe';

const RecipeList = ({ apiRecipes, recipes, searchTerm, onEdit, onDelete, onFavorite }) => {
    const combinedRecipes = [...apiRecipes, ...recipes];


    const filteredRecipes = combinedRecipes.filter((recipe) =>
        recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div>
            <h2 className="subtitle">Recipes</h2>
            <div className="columns is-multiline">
                {filteredRecipes.map((recipe) => (
                    <div className="column is-one-third" key={recipe.idMeal}>
                        <Recipe
                            recipe={recipe}
                            onEdit={() => onEdit(recipe)}
                            onDelete={() => onDelete(recipe.idMeal)}
                            onFavorite={() => onFavorite(recipe)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
