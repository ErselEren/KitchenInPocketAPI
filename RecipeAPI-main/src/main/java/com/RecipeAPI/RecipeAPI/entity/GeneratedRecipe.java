package com.RecipeAPI.RecipeAPI.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;


public class GeneratedRecipe {

    private String title;

    private String description;

    private List<Ingredient> ingredients;

    private String photo_url;

    public GeneratedRecipe() {
        ingredients = new ArrayList<Ingredient>();
    }

    public GeneratedRecipe(String title, String instructions, List<Ingredient> ingredients, String photo_url) {
        this.title = title;
        this.description = instructions;
        this.ingredients = ingredients;
        this.photo_url = photo_url;
    }

    public String getPhoto_url() {
        return photo_url;
    }

    public void setPhoto_url(String photo_url) {
        this.photo_url = photo_url;
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

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String instructions) {
        this.description = instructions;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public void addIngredient(Ingredient ingredient) {
        this.ingredients.add(ingredient);
    }


}
