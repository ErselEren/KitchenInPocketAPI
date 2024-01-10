package com.RecipeAPI.RecipeAPI.controller;

import com.RecipeAPI.RecipeAPI.entity.Ingredient;
import com.RecipeAPI.RecipeAPI.entity.Recipe;
import com.RecipeAPI.RecipeAPI.entity.RecipeIngredient;
import com.RecipeAPI.RecipeAPI.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private RecipeService recipeService;
    
    //get all recipes
    @GetMapping("/recipes")
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    //get a recipe by id
    @GetMapping("/recipes/{id}")
    public Optional<Recipe> getRecipeById(@PathVariable String id) {
        return recipeService.getRecipeById(id);
    }

    //get all ingredients for a recipe
    @GetMapping("/recipes/{id}/ingredients")
    public List<Ingredient> getIngredientsByRecipeId(@PathVariable String id) {
        return recipeService.getIngredientsByRecipeId(id);
    }

    //create a recipe
    @PostMapping("/recipes")
    public Recipe createRecipe(@RequestBody Recipe recipe) {
        return recipeService.createRecipe(recipe);
    }

    //add an ingredient to a recipe
    @PutMapping("/recipes/{id}/ingredients")
    public void createIngredientByRecipeId(@PathVariable String id, @RequestBody Ingredient ingredient) {
        recipeService.addIngredientByRecipeId(id, ingredient);
    }

    @PutMapping("/recipes/{id}/ingredients/{ingredientId}")
    public void addIngredientByIngredientId(@PathVariable String id,@PathVariable String ingredientId) {
        recipeService.addIngredientByIngredientId(id, ingredientId);
    }

    //delete a recipe
    @DeleteMapping("/recipes/{id}")
    public void deleteRecipeById(@PathVariable String id) {
        recipeService.deleteRecipeById(id);
    }

    //delete an ingredient from a recipe
    @DeleteMapping("/recipes/{id}/ingredients/{ingredientId}")
    public void deleteIngredientByRecipeId(@PathVariable String id, @PathVariable String ingredientId) {
        recipeService.deleteIngredientByRecipeId(id, ingredientId);
    }

    //update a recipe
    @PutMapping("/recipes/{id}")
    public void updateRecipeById(@PathVariable String id, @RequestBody Recipe recipe) {
        recipeService.updateRecipeById(id, recipe);
    }

    //get all recipe ingredients
    @GetMapping("/recipes/{id}/recipeIngredients")
    public List<RecipeIngredient> getAllRecipeIngredients(@PathVariable String id) {
        return recipeService.getAllRecipeIngredients(id);
    }

    //get a recipe ingredient by id
    @GetMapping("/recipes/{id}/recipeIngredients/{recipeIngredientId}")
    public RecipeIngredient getRecipeIngredientById(@PathVariable String id, @PathVariable String recipeIngredientId) {
        return recipeService.getRecipeIngredientById(id, recipeIngredientId);
    }

    //create a recipe ingredient
    @PostMapping("/recipes/{id}/recipeIngredients")
    public void createRecipeIngredient(@PathVariable String id, @RequestBody RecipeIngredient recipeIngredient) {
        recipeService.createRecipeIngredient(id, recipeIngredient);
    }

    //delete a recipe ingredient by id
    @DeleteMapping("/recipes/{id}/recipeIngredients/{recipeIngredientId}")
    public void deleteRecipeIngredientById(@PathVariable String id, @PathVariable String recipeIngredientId) {
        System.out.println("Deleting recipe ingredient with id: " + recipeIngredientId + " from recipe with id: " + id);
        recipeService.deleteRecipeIngredientById(id, recipeIngredientId);
    }

    //update a recipe ingredient by id
    @PutMapping("/recipes/{id}/recipeIngredients/{recipeIngredientId}")
    public void updateRecipeIngredientById(@PathVariable String id, @PathVariable String recipeIngredientId, @RequestBody RecipeIngredient recipeIngredient) {
        recipeService.updateRecipeIngredientById(id, recipeIngredientId, recipeIngredient);
    }

    @PutMapping("/recipes/{id}/recipeIngredients")
    public void updateAllRecipeIngredients(@PathVariable String id, @RequestBody List<RecipeIngredient> recipeIngredients) {
        recipeService.updateAllRecipeIngredients(id, recipeIngredients);
    }

}
