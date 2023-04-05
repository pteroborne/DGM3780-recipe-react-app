import React from 'react';

const Recipe = ({recipe, onEdit, onDelete, onFavorite}) => {
    const {idMeal, strMeal, strMealThumb, strInstructions} = recipe;
    const instructions = strInstructions || '...';


    return (
        <div className="box">
            <div className="media">
                <div className="media-left">
                    <figure className="image is-64x64">
                        <img src={strMealThumb} alt={strMeal}/>
                    </figure>
                </div>
                <div className="media-content">
                    <p className="title is-5">{strMeal}</p>
                </div>
            </div>
            <div className="content">
                <p>{instructions.substring(0, 100)}...</p>
            </div>
            <div className="buttons">
                <button
                    className="button is-small is-primary"
                    onClick={() => onEdit(recipe)}
                >
                    Edit
                </button>
                <button
                    className="button is-small is-danger"
                    onClick={() => onDelete(idMeal)}
                >
                    Delete
                </button>
                <button
                    className="button is-small is-info"
                    onClick={() => onFavorite(recipe)}
                >
                    Favorite
                </button>
            </div>
        </div>
    );
};

export default Recipe;
