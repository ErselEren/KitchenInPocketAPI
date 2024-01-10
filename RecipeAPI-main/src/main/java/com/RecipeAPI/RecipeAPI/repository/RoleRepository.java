package com.RecipeAPI.RecipeAPI.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.RecipeAPI.RecipeAPI.entity.ERole;
import com.RecipeAPI.RecipeAPI.entity.Role;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}