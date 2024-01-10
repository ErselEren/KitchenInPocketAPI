package com.RecipeAPI.RecipeAPI.service;

import com.RecipeAPI.RecipeAPI.entity.Ingredient;
import com.RecipeAPI.RecipeAPI.entity.Recipe;
import com.RecipeAPI.RecipeAPI.entity.RecipeIngredient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface RecipeService {

    List<Recipe> getAllRecipes();

    Recipe createRecipe(Recipe recipe);

    Recipe createRecipeForUser(String id, Recipe recipe);

    Optional<Recipe> getRecipeById(String id);

    List<Ingredient> getIngredientsByRecipeId(String id);

    void updateRecipeById(String id, Recipe recipe);

    void deleteRecipeById(String id);

    void addIngredientByRecipeId(String id, Ingredient ingredient);

    void deleteIngredientByRecipeId(String id, String ingredientId);

    void addIngredientByIngredientId(String id, String ingredientId);

    List<RecipeIngredient> getAllRecipeIngredients(String id);

    RecipeIngredient getRecipeIngredientById(String id, String recipeIngredientId);

    void createRecipeIngredient(String id, RecipeIngredient recipeIngredient);

    void deleteRecipeIngredientById(String id, String recipeIngredientId);

    void updateRecipeIngredientById(String id, String recipeIngredientId, RecipeIngredient recipeIngredient);


    void updateAllRecipeIngredients(String id, List<RecipeIngredient> recipeIngredients);
}
