package com.RecipeAPI.RecipeAPI.repository;

import com.RecipeAPI.RecipeAPI.entity.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RecipeRepository extends MongoRepository<Recipe, String> {

    Recipe findByTitle(String title);
}
