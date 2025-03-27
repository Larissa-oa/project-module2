import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { uploadToCloudinary } from "../utils/cloudinaryConfig";
import "./RecipeForm.css";

const RecipeForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    image: "",
    ingredients: [""],
    instructions: [""],
    country: "",
    timestamp: "",
  });

  // State for image upload
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [submitStatus, setSubmitStatus] = useState(null);

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

  // URL Image Preview Handler
  const handleUrlPreview = () => {
    if (formData.image) {
      setFormData((prev) => ({
        ...prev,
        image: formData.image,
      }));
      setImagePreview(formData.image);
    }
  };

  // Cloudinary image upload handler
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const uploadedImageUrl = await uploadToCloudinary(file);

      // Update form data with Cloudinary image URL
      setFormData((prev) => ({
        ...prev,
        image: uploadedImageUrl,
      }));
      setImagePreview(uploadedImageUrl);
      setIsUploading(false);
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Failed to upload image. Please try again.");
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      image: "",
      ingredients: [""],
      instructions: [""],
      country: "",
      timestamp: "",
    });
    setImagePreview("");
    setSubmitStatus(null);
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

    // Create new recipe object
    const newRecipe = {
      id: uuidv4(),
      name: formData.name,
      image: formData.image,
      ingredients: filteredIngredients,
      instructions: filteredInstructions,
      country: formData.country,
      timestamp: new Date().toISOString(),
    };

    try {
      // Send POST request to the backend
      const response = await axios.post(
        "http://localhost:4000/recipes",
        newRecipe
      );

      // Log the added recipe
      console.log("Recipe added:", response.data);

      setSubmitStatus("success");
    } catch (error) {
      console.error("Error adding recipe:", error);
      setSubmitStatus("error");
    }
  };

  const handleBackgroundClick = (e) => {
    // Close the popup if the background is clicked
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Success message view
  if (submitStatus === "success") {
    return (
      <div className="recipe-form-popup" onClick={handleBackgroundClick}>
        <div className="recipe-form-content">
          <div className="recipe-form-container">
            <div className="success-message">
              <h2>Recipe added successfully!</h2>
              <p>Would you like to add another recipe?</p>
              <div className="button-group">
                <button onClick={resetForm} className="yes-button">
                  Yes
                </button>
                <button onClick={onClose} className="no-button">
                  No
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
              <h2>Error adding recipe</h2>
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
          <h2>Add New Recipe</h2>
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
              <label>Image</label>
              <p>Enter a URL</p>
              <div className="image-upload-container">
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Paste image URL here"
                />
                <button
                  type="button"
                  onClick={handleUrlPreview}
                  disabled={!formData.image}
                >
                  Preview your URL image
                </button>
              </div>

              <p>Or</p>
              <div className="file-upload-container">
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("imageUpload").click()}
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Upload Image"}
                </button>
              </div>

              {imagePreview && (
                <div className="image-preview">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                </div>
              )}
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
                Add Recipe
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

export default RecipeForm;
