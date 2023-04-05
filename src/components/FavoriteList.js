import React from 'react';
import Favorite from './Favorite';

const FavoriteList = ({ favorites, onRemove }) => {
    return (
        <div className="favorite-list">
            <h2 className="subtitle">Favorites</h2>
            {favorites.length === 0 && <p>No favorites yet.</p>}
            <div className="columns is-multiline">
                {favorites.map((favorite) => (
                    <div key={favorite.idMeal} className="column is-one-third">
                        <Favorite favorite={favorite} onRemove={onRemove} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoriteList;
