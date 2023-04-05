import React, { useState, useEffect } from 'react';

const RecipeForm = ({ recipe, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        idMeal: '',
        strMeal: '',
        strMealThumb: '',
        strInstructions: '',
    });

    useEffect(() => {
        if (recipe) {
            setFormData(recipe);
        }
    }, [recipe]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={onCancel}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{recipe ? 'Edit Recipe' : 'Add Recipe'}</p>
                    <button className="delete" onClick={onCancel}></button>
                </header>
                <section className="modal-card-body">
                    <form className="recipe-form" onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">Name</label>
                            <input
                                className="input"
                                type="text"
                                name="strMeal"
                                value={formData.strMeal}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="field">
                            <label className="label">Image URL</label>
                            <input
                                className="input"
                                type="text"
                                name="strMealThumb"
                                value={formData.strMealThumb}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="field">
                            <label className="label">Instructions</label>
                            <textarea
                                className="textarea"
                                name="strInstructions"
                                value={formData.strInstructions}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </form>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-primary" onClick={handleSubmit}>
                        {recipe ? 'Save' : 'Add'}
                    </button>
                    <button className="button" onClick={onCancel}>
                        Cancel
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default RecipeForm;
