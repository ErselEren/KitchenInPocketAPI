package com.RecipeAPI.RecipeAPI.controller;


import com.RecipeAPI.RecipeAPI.entity.*;
import com.RecipeAPI.RecipeAPI.repository.IngredientRepository;
import com.RecipeAPI.RecipeAPI.repository.RecipeRepository;
import com.RecipeAPI.RecipeAPI.repository.UserRepository;
import com.RecipeAPI.RecipeAPI.service.IngredientService;
import com.RecipeAPI.RecipeAPI.service.RecipeService;
import com.RecipeAPI.RecipeAPI.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.List;



@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private UserService userService;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private IngredientService ingredientService;

    @GetMapping("/{id}")
    public List<Recipe> getPostById(@PathVariable("id") String id) {
        User user = userService.getUserById(id);
        return user.getRecipes();
    }

    @GetMapping("/{id}/recipe/{recipeId}")
    public Recipe getAllRecipes(@PathVariable("id") String id, @PathVariable("recipeId") String recipeId) {
        //find user with id
        User user = userService.getUserById(id);
        for (Recipe recipe : user.getRecipes()) {
            if (recipe.getId().equals(recipeId)) {
                return recipe;
            }
        }
        return null;
    }

    @GetMapping("/{id}/recipe/{recipeId}/ingredients")
    public List<RecipeIngredient> getIngredientsByRecipeId(@PathVariable("id") String id, @PathVariable("recipeId") String recipeId) {
        //find user with id
        //print id and recipeId
        User user = userService.getUserById(id);
        for (Recipe recipe : user.getRecipes()) {
            if (recipe.getId().equals(recipeId)) {
                //print recipeIngredients
                //System.out.println(recipe.getRecipeIngredients());
                return recipe.getRecipeIngredients();
            }
        }
        return null;
    }

    @PostMapping("/{id}/recipe/{recipeId}/ingredients")
    public void createIngredientByRecipeId(@PathVariable("id") String id, @PathVariable("recipeId") String recipeId, @RequestBody Ingredient ingredient) {
        //find user with id
        User user = userService.getUserById(id);
        ingredientRepository.save(ingredient);
        for (Recipe recipe : user.getRecipes()) {
            if (recipe.getId().equals(recipeId)) {
                recipe.getIngredients().add(ingredient);
                recipeRepository.save(recipe);
                userRepository.save(user);
                return;
            }
        }
    }

    //create a recipe ingredient
    @PostMapping("/{id}/recipe/{recipeId}/recipeIngredients")
    public void createRecipeIngredient(@PathVariable String id,@PathVariable String recipeId, @RequestBody RecipeIngredient recipeIngredient) {
        //print id and recipeId
        User user = userRepository.findById(id).get();
        Recipe recipe;
        for (Recipe recipe1 : user.getRecipes()) {

            if (recipe1.getId().equals(recipeId)) {
                recipe = recipe1;
                recipeIngredient.setId(java.util.UUID.randomUUID().toString());
                recipe.getRecipeIngredients().add(recipeIngredient);
                recipeRepository.save(recipe);
                userRepository.save(user);
            }
        }
    }

    @PutMapping("/{id}/recipe/{recipeId}/ingredient")
    public void addIngredientByIngredientId(@PathVariable("id") String id, @PathVariable("recipeId") String recipeId, @RequestBody Ingredient ingredient) {

        String ingredientId = ingredient.getId();
        User user = userService.getUserById(id);
        for (Recipe recipe : user.getRecipes()) {
            if (recipe.getId().equals(recipeId)) {
                for (Ingredient ingredient1 : user.getIngredients()) {
                    if (ingredient1.getId().equals(ingredientId)) {
                        recipe.getIngredients().add(ingredient1);
                        recipeRepository.save(recipe);
                        userRepository.save(user);
                        return;
                    }
                }
            }
        }
    }


    @PostMapping("/{id}/recipe")
    public Recipe createRecipe(@PathVariable("id") String id, @RequestBody Recipe recipe) {
        //print Recipe

        User user = userRepository.findById(id).get();
        if(user.getRecipes() == null) {
            user.setRecipes(new java.util.ArrayList<Recipe>());
        }

        // Save the recipe, MongoDB will generate an ID for it
        recipeRepository.save(recipe);

        // Add the recipe to the user's list of recipes
        user.getRecipes().add(recipe);
        userRepository.save(user);

        return recipe;
    }

    @DeleteMapping("/{id}/recipe/{recipeId}")
    public ResponseEntity<String> deleteRecipeById(@PathVariable("id") String id, @PathVariable("recipeId") String recipeId) {

        User user = userService.getUserById(id);


        for (Recipe recipe : user.getRecipes()) {
            if (recipe.getId().equals(recipeId)) {
                user.getRecipes().remove(recipe);
                userRepository.save(user);
                recipeRepository.deleteById(recipeId);
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}/recipe/{recipeId}/recipeIngredients")
    public void updateAllRecipeIngredients(@PathVariable String id,@PathVariable String recipeId, @RequestBody List<RecipeIngredient> recipeIngredients) {
        User user = userService.getUserById(id);
        for (Recipe recipe : user.getRecipes()) {
            if (recipe.getId().equals(recipeId)) {
                recipe.setRecipeIngredients(recipeIngredients);
                recipeRepository.save(recipe);
                userRepository.save(user);
                return;
            }
        }
    }

    @PutMapping("/{id}/recipe/{recipeId}")
    public void updateRecipeById(@PathVariable String id,@PathVariable String recipeId, @RequestBody Recipe recipe) {
        User user = userService.getUserById(id);
        for (Recipe recipe1 : user.getRecipes()) {
            if (recipe1.getId().equals(recipeId)) {
                if(recipe.getTitle() == null || recipe.getTitle().equals("")) {

                }
                else {
                    recipe1.setTitle(recipe.getTitle());
                }

                if (recipe.getDescription() == null || recipe.getDescription().equals("")) {

                }
                else {
                    recipe1.setDescription(recipe.getDescription());
                }
                if(recipe.getPhoto_url() == null || recipe.getPhoto_url().equals("")) {

                }
                else {
                    recipe1.setPhoto_url(recipe.getPhoto_url());
                }
                
                recipeRepository.save(recipe1);
                userRepository.save(user);
                return;
            }
        }
    }

    @DeleteMapping("/{id}/recipe/{recipeId}/recipeIngredients/{ingredientId}")
    public void deleteIngredientByRecipeId(@PathVariable String id,@PathVariable String recipeId, @PathVariable String ingredientId) {
        //print id and recipeId
        System.out.println("Deleting ingredient with id: " + ingredientId + " from recipe with id: " + recipeId);


        User user = userService.getUserById(id);
        for (Recipe recipe : user.getRecipes()) {
            if (recipe.getId().equals(recipeId)) {
                for (RecipeIngredient ingredient : recipe.getRecipeIngredients()) {
                    if (ingredient.getIngredientId().equals(ingredientId)) {
                        //print ingredient to console
                        System.out.println("Ingredient: " + ingredient);

                        recipe.getRecipeIngredients().remove(ingredient);
                        //recipeRepository.save(recipe);
                        userRepository.save(user);
                        return;
                    }
                }
            }
        }
    }

    @PutMapping("/{id}/generated")
    public void createGeneratedRecipe(@PathVariable String id, @RequestBody GeneratedRecipe generatedRecipe) {
        //print id
        System.out.println("|id|"+id);
        System.out.println("1--");
        System.out.println(generatedRecipe.getTitle());
        System.out.println(generatedRecipe.getDescription());
        //print ingredients
        for(Ingredient ingredient : generatedRecipe.getIngredients()) {
            System.out.println(ingredient.getName()+ " "+ ingredient.getUnit() + " "+ ingredient.getQuantity());
        }
        System.out.println("2--");

        Recipe recipe = new Recipe();
        recipe.setTitle(generatedRecipe.getTitle());
        recipe.setDescription(generatedRecipe.getDescription());
        recipe.setPhoto_url(generatedRecipe.getPhoto_url());

        User user = userService.getUserById(id);
        for(Ingredient ingredient : generatedRecipe.getIngredients()) {
            //System.out.println("here3");
            boolean found = false;
            for(Ingredient userIngredient : user.getIngredients()) {
                if(ingredient.getName().equalsIgnoreCase(userIngredient.getName())) {
                    RecipeIngredient recipeIngredient = new RecipeIngredient();
                    recipeIngredient.setIngredientId(userIngredient.getId());
                    recipeIngredient.setQuantity(ingredient.getQuantity());
                    recipe.getRecipeIngredients().add(recipeIngredient);
                    found = true;
                    break;
                }
            }
            Ingredient newIngredient = new Ingredient();
            if(!found) {

                //System.out.println("here2");
                if(ingredient.getUnit().equals("su bardağı") || ingredient.getUnit().equals("su bardağı.") || ingredient.getUnit().equals("su b.")){
                    ingredient.setUnit("bardak");
                }
                else if(ingredient.getUnit().equals("çay bardağı") || ingredient.getUnit().equals("çay bardağı.") || ingredient.getUnit().equals("çay b.")){
                    ingredient.setUnit("bardak");
                }
                else if(ingredient.getUnit().equals("gram") || ingredient.getUnit().equals("gr") || ingredient.getUnit().equals("gr.")){
                    ingredient.setUnit("gr");
                }
                else if(ingredient.getUnit().equals("kilogram") || ingredient.getUnit().equals("kg") || ingredient.getUnit().equals("kg.") || ingredient.getUnit().equals("kilo gram") ){
                    ingredient.setUnit("kg");
                }
                else if(ingredient.getUnit().equals("ml") || ingredient.getUnit().equals("mililitre") || ingredient.getUnit().equals("mili litre") ){
                    ingredient.setUnit("ml");
                }
                else if(ingredient.getUnit().equals("litre" ) || ingredient.getUnit().equals("lt") || ingredient.getUnit().equals("lt.") || ingredient.getUnit().equals("l") ){
                    ingredient.setUnit("litre");
                }
                else if(ingredient.getUnit().equals("adet") || ingredient.getUnit().equals("tane.") || ingredient.getUnit().equals("tane") ){
                    ingredient.setUnit("adet");
                }
                else if(ingredient.getUnit().equals("paket") || ingredient.getUnit().equals("paket.")){
                    ingredient.setUnit("paket");
                }
                else if(ingredient.getUnit().equals("çay kaşığı") || ingredient.getUnit().equals("çay kaşığı.") || ingredient.getUnit().equals("çay k.")){
                    ingredient.setUnit("çay k.");
                }
                else if(ingredient.getUnit().equals("tatlı kaşığı") || ingredient.getUnit().equals("tatlı kaşığı.") || ingredient.getUnit().equals("tatlı k.")){
                    ingredient.setUnit("tatlı k.");
                }
                else if(ingredient.getUnit().equals("yemek kaşığı") || ingredient.getUnit().equals("yemek kaşığı.") || ingredient.getUnit().equals("yemek k.")){
                    ingredient.setUnit("yemek k.");
                }
                else if(ingredient.getUnit().equals("bardak") || ingredient.getUnit().equals("bardak.")){
                    ingredient.setUnit("bardak");
                }
                else{
                    ingredient.setUnit("paket");
                }
                newIngredient.setName(ingredient.getName());
                newIngredient.setUnit(ingredient.getUnit());
                newIngredient.setUnitPrice(0);
                newIngredient.setQuantity(ingredient.getQuantity());
                System.out.println("Quantity>>"+ingredient.getQuantity());
                System.out.println("3--");


                if(ingredient.getPhoto_url() == null || ingredient.getPhoto_url().equals("")) {
                    newIngredient.setPhoto_url("https://www.foodbusinessnews.net/ext/resources/TopicLandingPages/Product-Development-Ingredient-Applications.jpg?1519144948");
                }
                else{
                    newIngredient.setPhoto_url(ingredient.getPhoto_url());
                }


                user.getIngredients().add(newIngredient);
                ingredientRepository.save(newIngredient);

                String objectId = newIngredient.getId();

                RecipeIngredient recipeIngredient = new RecipeIngredient();
                recipeIngredient.setIngredientId(objectId);
                recipeIngredient.setQuantity(ingredient.getQuantity());
                recipe.getRecipeIngredients().add(recipeIngredient);
            }


        }

        recipeRepository.save(recipe);
        user.getRecipes().add(recipe);
        userRepository.save(user);
    }


}
