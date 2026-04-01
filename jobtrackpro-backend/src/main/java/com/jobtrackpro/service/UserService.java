package com.jobtrackpro.service;

import java.util.Optional;

import com.jobtrackpro.model.User;

public interface UserService {
    
    User registerUser(User user);

    User loginUser(String email, String password);
    
    Optional<User> findByEMail(String email);
}
