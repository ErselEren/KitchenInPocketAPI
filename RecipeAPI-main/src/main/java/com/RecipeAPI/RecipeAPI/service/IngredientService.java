package com.RecipeAPI.RecipeAPI.service;

import com.RecipeAPI.RecipeAPI.entity.Ingredient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface IngredientService {
    List<Ingredient> getAllIngredients();

    Optional<Ingredient> getIngredientById(String id);

    void createIngredient(Ingredient ingredient);

    void deleteIngredientById(String id);

    void updateIngredientById(String id, Ingredient ingredient);

    void updateAllIngredient(List<Ingredient> ingredients);

    void addIngredientByRecipeId(String id, String recipeId, Ingredient ingredient);
}
