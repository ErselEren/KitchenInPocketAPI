package com.RecipeAPI.RecipeAPI.repository;

import com.RecipeAPI.RecipeAPI.entity.Ingredient;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IngredientRepository extends MongoRepository<Ingredient, String> {



}
