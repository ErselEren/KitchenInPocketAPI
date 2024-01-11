package com.RecipeAPI.RecipeAPI.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.RecipeAPI.RecipeAPI.entity.AuthResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.RecipeAPI.RecipeAPI.entity.User;
import com.RecipeAPI.RecipeAPI.payload.request.LoginRequest;
import com.RecipeAPI.RecipeAPI.payload.request.SignupRequest;
import com.RecipeAPI.RecipeAPI.payload.response.JwtResponse;
import com.RecipeAPI.RecipeAPI.payload.response.MessageResponse;
import com.RecipeAPI.RecipeAPI.repository.RoleRepository;
import com.RecipeAPI.RecipeAPI.repository.UserRepository;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    UserRepository userRepository;

    @PostMapping("/signin")
    public AuthResponse authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        // Find user by username
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("Error: User not found."));

        // If user is not found, return 404 Not Found
        if (user == null) {
            return new AuthResponse(null, "401");
        }

        // If user is found, check password
        if (user.getPassword().equals(loginRequest.getPassword())) {
            // If password is correct, return user ID as JSON
            return new AuthResponse(user.getId(), "200");
            //return new ResponseEntity<>("{\"userId\": \"" + user.getId() + "\"}", HttpStatus.OK);
        } else {
            // If password is incorrect, return 401 Unauthorized
            return new AuthResponse(null, "401");
            //return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                signUpRequest.getPassword(),signUpRequest.getFirstName(),signUpRequest.getLastName());


        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

}
