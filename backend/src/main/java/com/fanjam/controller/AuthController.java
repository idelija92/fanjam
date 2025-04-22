package com.fanjam.controller;

import com.fanjam.model.User;
import com.fanjam.model.RegisterRequest;
import com.fanjam.config.JwtUtil;
import com.fanjam.model.LoginRequest;
import com.fanjam.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;


    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Error: Email already exists";
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
        return "User registered successfully";
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            return "Error: Invalid credentials";
        }
    
        User user = userOpt.get();
        System.out.println("Found user: " + user.getEmail());
        System.out.println("Encoded password in DB: " + user.getPassword());
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            System.out.println("Password mismatch");
            return "Error: Invalid credentials";
        }
        System.out.println("Login request: " + request.getEmail() + " / " + request.getPassword());

    
        String token = jwtUtil.generateToken(user.getEmail());
        return token;
    }
    
}
