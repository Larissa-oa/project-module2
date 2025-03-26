import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdateRecipeForm.css";

const UpdateRecipeForm = ({ onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    ingredients: [""],
    instructions: [""],
    country: "",
  });

  const [submitStatus, setSubmitStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch recipe data when component mounts
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/recipes/${id}`);
        const recipeData = response.data;

        setFormData({
          name: recipeData.name,
          image: recipeData.image,
          ingredients:
            recipeData.ingredients.length > 0 ? recipeData.ingredients : [""],
          instructions:
            recipeData.instructions.length > 0 ? recipeData.instructions : [""],
          country: recipeData.country,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setSubmitStatus("error");
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = value;
    setFormData({
      ...formData,
      ingredients: updatedIngredients,
    });
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index] = value;
    setFormData({
      ...formData,
      instructions: updatedInstructions,
    });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ""],
    });
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, ""],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out any empty ingredients or instructions
    const filteredIngredients = formData.ingredients.filter(
      (item) => item.trim() !== ""
    );

    const filteredInstructions = formData.instructions.filter(
      (item) => item.trim() !== ""
    );

    // Create updated recipe object
    const updatedRecipe = {
      ...formData,
      ingredients: filteredIngredients,
      instructions: filteredInstructions,
    };

    try {
      // Send PUT request to update the recipe
      const response = await axios.put(
        `http://localhost:4000/recipes/${id}`,
        updatedRecipe
      );

      // Log the updated recipe
      console.log("Recipe updated:", response.data);

      setSubmitStatus("success");
    } catch (error) {
      console.error("Error updating recipe:", error);
      setSubmitStatus("error");
    }
  };

  const handleBackgroundClick = (e) => {
    // Close the popup if the background is clicked
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="recipe-form-popup">
        <div className="recipe-form-content">
          <div className="recipe-form-container">
            <h2>Loading Recipe...</h2>
          </div>
        </div>
      </div>
    );
  }

  // Success message view
  if (submitStatus === "success") {
    return (
      <div className="recipe-form-popup" onClick={handleBackgroundClick}>
        <div className="recipe-form-content">
          <div className="recipe-form-container">
            <div className="success-message">
              <h2>Recipe updated successfully!</h2>
              <p>Would you like to view the updated recipe?</p>
              <div className="button-group">
                <button
                  onClick={() => {
                    onClose();
                    navigate(`/recipe/${id}`);
                  }}
                  className="yes-button"
                >
                  View Recipe
                </button>
                <button onClick={onClose} className="no-button">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error message view
  if (submitStatus === "error") {
    return (
      <div className="recipe-form-popup" onClick={handleBackgroundClick}>
        <div className="recipe-form-content">
          <div className="recipe-form-container">
            <div className="error-message">
              <h2>Error updating recipe</h2>
              <p>There was a problem saving your recipe. Please try again.</p>
              <button
                onClick={() => setSubmitStatus(null)}
                className="try-again-button"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default form view
  return (
    <div className="recipe-form-popup" onClick={handleBackgroundClick}>
      <div className="recipe-form-content">
        <div className="recipe-form-container">
          <h2>Update Recipe</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Recipe Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Image URL:</label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Ingredients:</label>
              {formData.ingredients.map((ingredient, index) => (
                <input
                  key={index}
                  type="text"
                  value={ingredient}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  }
                  placeholder={`Ingredient ${index + 1}`}
                  className="ingredient-input"
                />
              ))}
              <button
                type="button"
                onClick={addIngredient}
                className="add-button"
              >
                Add another ingredient
              </button>
            </div>

            <div className="form-group">
              <label>Instructions:</label>
              {formData.instructions.map((instruction, index) => (
                <textarea
                  key={index}
                  value={instruction}
                  onChange={(e) =>
                    handleInstructionChange(index, e.target.value)
                  }
                  placeholder={`Step ${index + 1}`}
                  className="instruction-input"
                />
              ))}
              <button
                type="button"
                onClick={addInstruction}
                className="add-button"
              >
                Add another instruction
              </button>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">
                Update Recipe
              </button>
              <button type="button" onClick={onClose} className="cancel-button">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRecipeForm;
