package com.RecipeAPI.RecipeAPI.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "recipeIngredients")
public class RecipeIngredient {

    @Id
    private String id;

    private String ingredientId;

    private double quantity;

    public RecipeIngredient() {
    }

    public RecipeIngredient(double quantity, String ingredientId) {
        this.quantity = quantity;
        this.ingredientId = ingredientId;
    }

    public String getId() {
        return id;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public String getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(String ingredientId) {
        this.ingredientId = ingredientId;
    }
}
