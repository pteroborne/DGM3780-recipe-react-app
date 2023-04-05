import React from 'react';

const Favorite = ({ favorite, onRemove }) => {
    const { idMeal, strMeal, strMealThumb } = favorite;

    return (
        <div className="box">
            <div className="media">
                <div className="media-left">
                    <figure className="image is-64x64">
                        <img src={strMealThumb} alt={strMeal} />
                    </figure>
                </div>
                <div className="media-content">
                    <p className="title is-5">{strMeal}</p>
                </div>
            </div>
            <div className="buttons">
                <button
                    className="button is-small is-danger"
                    onClick={() => onRemove(idMeal)}
                >
                    Remove from favorites
                </button>
            </div>
        </div>
    );
};

export default Favorite;
