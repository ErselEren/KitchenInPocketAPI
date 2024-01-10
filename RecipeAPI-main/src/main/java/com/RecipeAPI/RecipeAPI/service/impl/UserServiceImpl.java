package com.RecipeAPI.RecipeAPI.service.impl;

import com.RecipeAPI.RecipeAPI.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.RecipeAPI.RecipeAPI.entity.User;
import com.RecipeAPI.RecipeAPI.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserById(String id) {
        return userRepository.findById(id).get();
    }

}
