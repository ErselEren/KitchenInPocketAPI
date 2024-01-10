package com.RecipeAPI.RecipeAPI.service.impl;

import com.RecipeAPI.RecipeAPI.entity.Ingredient;
import com.RecipeAPI.RecipeAPI.repository.IngredientRepository;
import com.RecipeAPI.RecipeAPI.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientServiceImpl implements IngredientService {

    @Autowired
    private IngredientRepository ingredientRepository;

    @Override
    public List<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    @Override
    public Optional<Ingredient> getIngredientById(String id) {
        return ingredientRepository.findById(id);
    }

    @Override
    public void createIngredient(Ingredient ingredient) {
        ingredientRepository.save(ingredient);
    }

    @Override
    public void deleteIngredientById(String id) {
        System.out.println("Deleting ingredient with id: " + id);
        ingredientRepository.deleteById(id);
    }

    @Override
    public void updateIngredientById(String id, Ingredient ingredient) {
        Ingredient ingredientToUpdate = ingredientRepository.findById(id).get();
        ingredientToUpdate.setName(ingredient.getName());
        ingredientToUpdate.setUnit(ingredient.getUnit());
        ingredientToUpdate.setUnitPrice(ingredient.getUnitPrice());
        ingredientRepository.save(ingredientToUpdate);
    }

    @Override
    public void updateAllIngredient(List<Ingredient> newIngredients) {
        // Step 1: Delete all existing ingredients
        ingredientRepository.deleteAll();

        // Step 2: Save the new ingredients
        ingredientRepository.saveAll(newIngredients);
    }

    @Override
    public void addIngredientByRecipeId(String id, String recipeId, Ingredient ingredient) {


    }


}
