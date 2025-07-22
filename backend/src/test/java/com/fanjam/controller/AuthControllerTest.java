package com.fanjam.controller;

import com.fanjam.config.JwtUtil;
import com.fanjam.model.Role;
import com.fanjam.model.User;
import com.fanjam.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;
import java.util.Set;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private JwtUtil jwtUtil;

    @MockBean
    private BCryptPasswordEncoder passwordEncoder;

    @Test
    void getCurrentUser_returnsUser() throws Exception {
        User user = new User();
        user.setEmail("test@example.com");
        when(jwtUtil.extractEmail("validToken")).thenReturn("test@example.com");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        mockMvc.perform(get("/api/auth/me")
                .header("Authorization", "Bearer validToken"))
                .andExpect(status().isOk());
    }

    @Test
    void register_successful() throws Exception {
        when(userRepository.findByEmail("new@example.com")).thenReturn(Optional.empty());

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                          "username": "newuser",
                          "email": "new@example.com",
                          "password": "password"
                        }
                        """))
                .andExpect(status().isOk());
    }

    @Test
    void register_emailAlreadyExists() throws Exception {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(new User()));

        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                          "username": "dupuser",
                          "email": "test@example.com",
                          "password": "password"
                        }
                        """))
                .andExpect(status().isBadRequest());
    }

    @Test
    void login_successful() throws Exception {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("hashed");
        when(userRepository.findByEmailWithRoles("test@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password", "hashed")).thenReturn(true);
        when(jwtUtil.generateToken(user)).thenReturn("jwtToken");

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                          "email": "test@example.com",
                          "password": "password"
                        }
                        """))
                .andExpect(status().isOk());
    }

    @Test
    void login_invalidCredentials() throws Exception {
        when(userRepository.findByEmailWithRoles("test@example.com")).thenReturn(Optional.empty());

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                          "email": "test@example.com",
                          "password": "wrong"
                        }
                        """))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void changePassword_successful() throws Exception {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("oldHashed");
        when(jwtUtil.extractEmail("validToken")).thenReturn("test@example.com");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("oldPass", "oldHashed")).thenReturn(true);

        mockMvc.perform(put("/api/auth/change-password")
                .header("Authorization", "Bearer validToken")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                          "currentPassword": "oldPass",
                          "newPassword": "newPass"
                        }
                        """))
                .andExpect(status().isOk());
    }

    @Test
    void changePassword_wrongCurrentPassword() throws Exception {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("oldHashed");
        when(jwtUtil.extractEmail("validToken")).thenReturn("test@example.com");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrong", "oldHashed")).thenReturn(false);

        mockMvc.perform(put("/api/auth/change-password")
                .header("Authorization", "Bearer validToken")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {
                          "currentPassword": "wrong",
                          "newPassword": "newPass"
                        }
                        """))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void deleteAccount_successful() throws Exception {
        User user = new User();
        user.setEmail("test@example.com");
        user.setRoles(Set.of(Role.USER));
        when(jwtUtil.extractEmail("validToken")).thenReturn("test@example.com");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        mockMvc.perform(delete("/api/auth/delete")
                .header("Authorization", "Bearer validToken"))
                .andExpect(status().isOk());
    }

    @Test
    void deleteAccount_lastAdminForbidden() throws Exception {
        User adminUser = new User();
        adminUser.setEmail("admin@example.com");
        adminUser.setRoles(Set.of(Role.ADMIN));
        when(jwtUtil.extractEmail("validToken")).thenReturn("admin@example.com");
        when(userRepository.findByEmail("admin@example.com")).thenReturn(Optional.of(adminUser));
        when(userRepository.countByRole(Role.ADMIN)).thenReturn(1L);

        mockMvc.perform(delete("/api/auth/delete")
                .header("Authorization", "Bearer validToken"))
                .andExpect(status().isForbidden())
                .andExpect(content().string("Cannot delete the last remaining admin."));
    }
}
