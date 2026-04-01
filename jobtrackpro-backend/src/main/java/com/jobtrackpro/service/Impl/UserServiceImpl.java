package com.jobtrackpro.service.Impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import com.jobtrackpro.model.User;
import com.jobtrackpro.repository.UserRepository;
import com.jobtrackpro.service.UserService;

@Service
public class UserServiceImpl implements UserService{
    
    private final BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private  UserRepository userRepository;

    UserServiceImpl(BCryptPasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User registerUser(User user) {
        Optional<User> existingUser = findByEMail(user.getEmail());

        if(existingUser.isPresent()){
            throw new RuntimeException("User already exists!!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
        
    }

    @Override
    public User loginUser(String email, String password) {

        User user = findByEMail(email).orElseThrow(() -> new RuntimeException("User not found!!"));

        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new RuntimeException("Incorrect Password");
        }

        return user;
        
        
    }

    @Override
    public Optional<User> findByEMail(String email) {
       return userRepository.findByEmail(email);
    }
}
