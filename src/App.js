import React, {useState, useEffect} from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import FavoriteList from './components/FavoriteList';

function App() {
    const [apiRecipes, setApiRecipes] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [editingRecipe, setEditingRecipe] = useState(null);
    const [isModalActive, setIsModalActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
                const data = await response.json();
                const recipeIds = data.meals.map((meal) => meal.idMeal);
                const recipeDetailsPromises = recipeIds.map((id) =>
                    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((res) => res.json()),
                );
                const recipeDetailsList = await Promise.all(recipeDetailsPromises);
                const detailedRecipes = recipeDetailsList.map((details) => details.meals[0]);
                setApiRecipes(detailedRecipes);
            } catch (error) {
                console.error('Failed to fetch recipes:', error);
            }
        };


        fetchRecipes();

        const storedRecipes = localStorage.getItem('recipes');
        const storedFavorites = localStorage.getItem('favorites');

        if (storedRecipes) {
            setRecipes(JSON.parse(storedRecipes));
        }
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }, [recipes]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const handleEdit = (recipe) => {
        setEditingRecipe(recipe);
        setIsModalActive(true);
    };

    const handleDelete = (idMeal) => {
        setRecipes(recipes.filter((recipe) => recipe.idMeal !== idMeal));
    };

    const handleFavorite = (recipe) => {
        if (!favorites.find((fav) => fav.idMeal === recipe.idMeal)) {
            setFavorites([...favorites, recipe]);
        }
    };

    const handleRemoveFavorite = (idMeal) => {
        setFavorites(favorites.filter((favorite) => favorite.idMeal !== idMeal));
    };

    const handleFormSubmit = (recipe) => {
        if (editingRecipe) {
            setRecipes(
                recipes.map((r) => (r.idMeal === recipe.idMeal ? recipe : r)),
            );
            setEditingRecipe(null);
        } else {
            setRecipes([...recipes, {...recipe, idMeal: Date.now().toString()}]);
        }
        setIsModalActive(false);
    };

    const handleCancelEdit = () => {
        setEditingRecipe(null);
        setIsModalActive(false);
    };

    const openAddRecipeModal = () => {
        setIsModalActive(true);
    };

    return (
        <div className="App">
            <div className="container">
                <h1 className="title">Recipe App</h1>
                <button className="button is-primary" onClick={openAddRecipeModal}>
                    Add New Recipe
                </button>
                <input
                    className="input"
                    type="text"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <RecipeList
                    apiRecipes={apiRecipes}
                    recipes={recipes}
                    searchTerm={searchTerm}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onFavorite={handleFavorite}
                />

                {isModalActive && (
                    <RecipeForm
                        recipe={editingRecipe}
                        onSubmit={handleFormSubmit}
                        onCancel={handleCancelEdit}
                    />
                )}
                <FavoriteList
                    favorites={favorites}
                    onRemove={handleRemoveFavorite}
                />
            </div>
        </div>
    );
}

export default App;
