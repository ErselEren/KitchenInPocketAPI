package com.RecipeAPI.RecipeAPI.service.impl;

import com.RecipeAPI.RecipeAPI.entity.Ingredient;
import com.RecipeAPI.RecipeAPI.entity.Recipe;
import com.RecipeAPI.RecipeAPI.entity.RecipeIngredient;
import com.RecipeAPI.RecipeAPI.entity.User;
import com.RecipeAPI.RecipeAPI.repository.RecipeRepository;
import com.RecipeAPI.RecipeAPI.repository.UserRepository;
import com.RecipeAPI.RecipeAPI.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeServiceImpl implements RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;
    @Autowired
    private IngredientServiceImpl ingredientService;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    @Override
    public List<RecipeIngredient> getAllRecipeIngredients(String id) {
        return recipeRepository.findById(id).get().getRecipeIngredients();
    }

    @Override
    public RecipeIngredient getRecipeIngredientById(String id, String recipeIngredientId) {

        Recipe recipe = recipeRepository.findById(id).get();
        for (RecipeIngredient recipeIngredient : recipe.getRecipeIngredients()) {
            if (recipeIngredient.getId().equals(recipeIngredientId)) {
                return recipeIngredient;
            }
        }
        return null;

    }

    @Override
    public void createRecipeIngredient(String id, RecipeIngredient recipeIngredient) {
        Recipe recipeToUpdate = recipeRepository.findById(id).get();
        //generate unique id for recipeIngredient
        recipeIngredient.setId(java.util.UUID.randomUUID().toString());
        recipeToUpdate.getRecipeIngredients().add(recipeIngredient);
        recipeRepository.save(recipeToUpdate);
    }

    @Override
    public void deleteRecipeIngredientById(String id, String recipeIngredientId) {
        Recipe recipeToUpdate = recipeRepository.findById(id).get();
        recipeToUpdate.getRecipeIngredients().removeIf(recipeIngredient -> recipeIngredient.getId().equals(recipeIngredientId));
        recipeRepository.save(recipeToUpdate);
    }

    @Override
    public void updateRecipeIngredientById(String id, String recipeIngredientId, RecipeIngredient recipeIngredient) {
        Recipe recipeToUpdate = recipeRepository.findById(id).get();
        for (RecipeIngredient recipeIngredientInRecipe : recipeToUpdate.getRecipeIngredients()) {
            if (recipeIngredientInRecipe.getId().equals(recipeIngredientId)) {
                recipeIngredientInRecipe.setQuantity(recipeIngredient.getQuantity());
                recipeIngredientInRecipe.setIngredientId(recipeIngredient.getIngredientId());
                recipeRepository.save(recipeToUpdate);
                return;
            }
        }
    }

    @Override
    public void updateAllRecipeIngredients(String id, List<RecipeIngredient> recipeIngredients) {
        Recipe recipeToUpdate = recipeRepository.findById(id).get();
        recipeToUpdate.setRecipeIngredients(recipeIngredients);
        recipeRepository.save(recipeToUpdate);
    }

    @Override
    public Recipe createRecipe(Recipe recipe) {
        //print recipe to console
        System.out.println(recipe);
        if(recipe.getTitle() == null || recipe.getTitle().equals("")) {
            recipe.setTitle("İsimsiz Tarif");
        }

        if(recipe.getDescription() == null || recipe.getDescription().equals("")) {
            recipe.setDescription("Açıklama Yok");
        }

        recipeRepository.save(recipe);

        //Find the recipe that was just created
        Recipe recipeToReturn = recipeRepository.findByTitle(recipe.getTitle());
        System.out.println(recipeToReturn.getId());
        return recipeToReturn;

    }

    @Override
    public Recipe createRecipeForUser(String id, Recipe recipe) {
        //print recipe to console
        System.out.println(recipe);
        if(recipe.getTitle() == null || recipe.getTitle().equals("")) {
            recipe.setTitle("İsimsiz Tarif");
        }

        if(recipe.getDescription() == null || recipe.getDescription().equals("")) {
            recipe.setDescription("Açıklama Yok");
        }
        // Find the user by id
        User user = userRepository.findById(id).orElse(null);

        if (user != null) {
            // Add the created recipe to the user's list of recipes
            user.getRecipes().add(recipe);

            // Save the user to update the changes
            userRepository.save(user);

            // Find the recipe that was just created
            Recipe recipeToReturn = recipeRepository.findByTitle(recipe.getTitle());
            System.out.println(recipeToReturn.getId());
            return recipeToReturn;
        } else {
            // Handle the case where the user with the given id does not exist
            // You can throw an exception or return an appropriate response here
            return null;
        }

    }

    @Override
    public Optional<Recipe> getRecipeById(String id) {
        return recipeRepository.findById(id);
    }

    @Override
    public List<Ingredient> getIngredientsByRecipeId(String id) {
        return recipeRepository.findById(id).get().getIngredients();
    }

    @Override
    public void updateRecipeById(String id, Recipe recipe) {
        Recipe recipeToUpdate = recipeRepository.findById(id).get();
        //print getRecipeIngredients to console
        for(RecipeIngredient recipeIngredient : recipeToUpdate.getRecipeIngredients()) {
            System.out.println(">"+recipeIngredient.getQuantity());
        }
        System.out.println("--------------------");

        if(recipe.getTitle() != null && !recipe.getTitle().equals("")) {
            recipeToUpdate.setTitle(recipe.getTitle());
        }
        if(recipe.getDescription() != null && !recipe.getDescription().equals("")) {
            recipeToUpdate.setDescription(recipe.getDescription());
        }
        if(recipe.getPhoto_url() != null && !recipe.getPhoto_url().equals("")) {
            recipeToUpdate.setPhoto_url(recipe.getPhoto_url());
        }
        if(recipe.getRecipeIngredients() != null && recipe.getRecipeIngredients().size() != 0) {
            //print getRecipeIngredients to console
            for(RecipeIngredient recipeIngredient : recipe.getRecipeIngredients()) {
                System.out.println(">"+recipeIngredient.getQuantity());
            }

            recipeToUpdate.setRecipeIngredients(recipe.getRecipeIngredients());
        }

        recipeRepository.save(recipeToUpdate);
    }

    @Override
    public void deleteRecipeById(String id) {
        Recipe recipe = recipeRepository.findById(id).get();
        System.out.println(recipe);
        recipeRepository.deleteById(id);
    }

    @Override
    public void addIngredientByRecipeId(String id, Ingredient ingredient) {

        System.out.println("Adding ingredient to recipe : "+id+"|"+ingredient.getName());
        Recipe recipeToUpdate = recipeRepository.findById(id).get();

        for (Ingredient ingredientInRecipe : recipeToUpdate.getIngredients()) {
            if (ingredientInRecipe.getId().equals(ingredient.getId())) {
                return;
            }
        }

        recipeToUpdate.getIngredients().add(ingredient);
        recipeRepository.save(recipeToUpdate);
    }

    @Override
    public void deleteIngredientByRecipeId(String id, String ingredientId) {
        Recipe recipeToUpdate = recipeRepository.findById(id).get();
        recipeToUpdate.getIngredients().removeIf(ingredient -> ingredient.getId().equals(ingredientId));
        recipeRepository.save(recipeToUpdate);
    }

    @Override
    public void addIngredientByIngredientId(String id, String ingredientId) {
        Recipe recipeToUpdate = recipeRepository.findById(id).get();
        Ingredient ingredientToUpdate = ingredientService.getIngredientById(ingredientId).get();
        recipeToUpdate.getIngredients().add(ingredientToUpdate);
        recipeRepository.save(recipeToUpdate);
    }


}
