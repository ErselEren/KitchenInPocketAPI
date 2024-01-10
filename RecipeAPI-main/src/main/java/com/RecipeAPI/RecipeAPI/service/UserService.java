package com.RecipeAPI.RecipeAPI.service;

import com.RecipeAPI.RecipeAPI.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface UserService {
    User getUserById(String id);
}
