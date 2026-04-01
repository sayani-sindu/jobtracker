package com.jobtrackpro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.jobtrackpro.dto.auth.AuthResponseDTO;
import com.jobtrackpro.model.User;
import com.jobtrackpro.security.JwtUtil;
import com.jobtrackpro.service.UserService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> registerUser(@RequestBody User user) {
    
        userService.registerUser(user);
        String token = jwtUtil.generateToken(user.getEmail());

        AuthResponseDTO response = new AuthResponseDTO();
        response.setToken(token);
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    

   @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody User user) {

        User existingUser = userService.loginUser(user.getEmail(), user.getPassword());

        String token = jwtUtil.generateToken(existingUser.getEmail());

        AuthResponseDTO response = new AuthResponseDTO();
        response.setToken(token);
        response.setName(existingUser.getName());
        response.setEmail(existingUser.getEmail());
        response.setRole(existingUser.getRole());
        response.setId(existingUser.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    
}
