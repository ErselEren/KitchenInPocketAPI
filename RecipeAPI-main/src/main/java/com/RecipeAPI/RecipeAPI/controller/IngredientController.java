package com.RecipeAPI.RecipeAPI.controller;


import com.RecipeAPI.RecipeAPI.entity.Ingredient;
import com.RecipeAPI.RecipeAPI.entity.Recipe;
import com.RecipeAPI.RecipeAPI.entity.RecipeIngredient;
import com.RecipeAPI.RecipeAPI.entity.User;
import com.RecipeAPI.RecipeAPI.repository.IngredientRepository;
import com.RecipeAPI.RecipeAPI.repository.UserRepository;
import com.RecipeAPI.RecipeAPI.service.IngredientService;
import com.RecipeAPI.RecipeAPI.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/ingredients")
public class IngredientController {

        @Autowired
        private UserService userService;

        @Autowired
        private IngredientRepository ingredientRepository;

        @Autowired
        private UserRepository userRepository;

//    @Autowired
//    private IngredientService ingredientService;
//
//    //get all ingredients
//    @GetMapping("/ingredients")
//    public List<Ingredient> getAllIngredients() {
//        return ingredientService.getAllIngredients();
//    }
//
//    //get an ingredient by id
//    @GetMapping("/ingredients/{id}")
//    public Ingredient getIngredientById(@PathVariable String id ) {
//        return ingredientService.getIngredientById(id).get();
//    }
//
//    //create an ingredient
//    @PostMapping("/ingredients")
//    public void createIngredient(@RequestBody Ingredient ingredient) {
//        ingredientService.createIngredient(ingredient);
//    }
//
//    //delete an ingredient by id
//    @DeleteMapping("/ingredients/{id}")
//    public void deleteIngredientById(@PathVariable String id) {
//        System.out.println("Deleting ingredient with id: " + id);
//        ingredientService.deleteIngredientById(id);
//    }
//
//    @PutMapping("/ingredients/{id}")
//    public void updateIngredientById(@PathVariable String id, @RequestBody Ingredient ingredient) {
//        ingredientService.updateIngredientById(id, ingredient);
//    }
//
//    @PutMapping("/ingredients")
//    public void updateAllIngredient(@RequestBody List<Ingredient> ingredients) {
//        ingredientService.updateAllIngredient(ingredients);
//    }

    @GetMapping("/{id}/ingredient")
    public List<Ingredient> getAllIngredients(@PathVariable("id") String id) {
        //find user with id
        User user = userService.getUserById(id);
        return user.getIngredients();
    }

    @GetMapping("/{id}/ingredient/{ingredientId}")
    public Ingredient getIngredientById(@PathVariable("id") String id, @PathVariable("ingredientId") String ingredientId) {
        //find user with id
        User user = userService.getUserById(id);
        for (Ingredient ingredient : user.getIngredients()) {
            if (ingredient.getId().equals(ingredientId)) {
                return ingredient;
            }
        }
        return null;
    }

    @PostMapping("/{id}/ingredient")
    public void createIngredient(@PathVariable("id") String id, @RequestBody Ingredient ingredient) {
        //find user with id
        //print user id to console
        System.out.println("User id: " + id);

        User user = userService.getUserById(id);
        ingredientRepository.save(ingredient);
        user.getIngredients().add(ingredient);
        userRepository.save(user);
    }


    @PutMapping("/{id}/ingredient/{ingredientId}")
    public void updateIngredientById(@PathVariable String id,@PathVariable String ingredientId ,@RequestBody Ingredient ingredient) {
        User user = userService.getUserById(id);
        for (Ingredient ingredient1 : user.getIngredients()) {
            if (ingredient1.getId().equals(ingredientId)) {
                ingredient1.setName(ingredient.getName());
                ingredient1.setUnit(ingredient.getUnit());
                ingredient1.setUnitPrice(ingredient.getUnitPrice());
                ingredientRepository.save(ingredient1);
                userRepository.save(user);
                return;
            }
        }
    }

    @PutMapping("/{id}/ingredient")
    public void updateAllIngredient(@PathVariable String id,@RequestBody List<Ingredient> ingredients) {
       User user = userService.getUserById(id);
       user.setIngredients(ingredients);
       userRepository.save(user);
    }

    //delete an ingredient by id
    @DeleteMapping("/{id}/ingredient/{ingredientId}")
    public void deleteIngredientById(@PathVariable String id, @PathVariable String ingredientId) {
        System.out.println("Deleting ingredient with id: " + ingredientId + " from user with id: " + id);
        User user = userService.getUserById(id);
        for (Ingredient ingredient : user.getIngredients()) {
            if (ingredient.getId().equals(ingredientId)) {
                user.getIngredients().remove(ingredient);
                userRepository.save(user);
                break;
            }
        }

        User user1 = userService.getUserById(id);
        //print users to console
        for (Recipe recipe : user1.getRecipes()) {
            System.out.println("Recipe: " + recipe);
            System.out.println("---------------------");

            Iterator<RecipeIngredient> iterator = recipe.getRecipeIngredients().iterator();
            while (iterator.hasNext()) {
                RecipeIngredient recipeIngredient = iterator.next();
                System.out.println("RecipeIngredient: " + recipeIngredient);
                System.out.println("---------------------");

                if (recipeIngredient.getIngredientId().equals(ingredientId)) {
                    iterator.remove();
                    userRepository.save(user1);
                }
            }
        }


    }

}
