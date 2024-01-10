package com.RecipeAPI.RecipeAPI.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "recipes")
public class Recipe {

    @Id
    private String id;

    private String title;

    private String photo_url;

    private String description;

    private List<Ingredient> ingredients = new ArrayList<>();

    private List<RecipeIngredient> recipeIngredients;

    public Recipe() {
        ingredients = new ArrayList<>();
        recipeIngredients = new ArrayList<>();
    }

    public Recipe(String title, String description, List<Ingredient> ingredients, String photo_url, List<RecipeIngredient> recipeIngredients) {
        this.title = title;
        this.description = description;
        this.ingredients = ingredients;
        this.photo_url = photo_url;
        this.recipeIngredients = recipeIngredients;
    }

    public List<RecipeIngredient> getRecipeIngredients() {
        return recipeIngredients;
    }

    public void setRecipeIngredients(List<RecipeIngredient> ingredientIds) {
        this.recipeIngredients = ingredientIds;
    }

    public String getId() {
        return id;
    }

    public String getPhoto_url() {
        return photo_url;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public void setPhoto_url(String photo_url) {
        this.photo_url = photo_url;
    }

    @Override
    public String toString() {
        return "Recipe{" +
            "id=" + id +
            ", name='" + title + '\'' +
            ", description='" + description + '\'' +
            ", ingredients='" + ingredients + '\'' +
            '}';
    }

}
