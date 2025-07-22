package com.fanjam.controller;

import com.fanjam.model.Role;
import com.fanjam.model.User;
import com.fanjam.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserRepository userRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    private Authentication mockAuth(String email, boolean admin) {
        return new Authentication() {
            @Override public String getName() { return email; }
            @Override public Object getCredentials() { return null; }
            @Override public Object getDetails() { return null; }
            @Override public Object getPrincipal() { return email; }
            @Override public boolean isAuthenticated() { return true; }
            @Override public void setAuthenticated(boolean b) {}
            @Override public java.util.Collection<org.springframework.security.core.GrantedAuthority> getAuthorities() {
                if (admin) {
                    return java.util.List.of(() -> "ROLE_ADMIN");
                } else {
                    return java.util.List.of(() -> "ROLE_USER");
                }
            }
        };
    }

    private User user;

    @BeforeEach
    void setup() {
        user = new User();
        user.setId(1L);
        user.setEmail("user@example.com");
        user.setUsername("testuser");
        user.setPassword("pass");
        user.setRoles(Set.of(Role.USER));
    }

    @Test
    void getAllUsers_adminAllowed() {
        when(userRepository.findAll()).thenReturn(java.util.List.of(user));
        Authentication auth = mockAuth("admin@example.com", true);

        ResponseEntity<?> response = userController.getAllUsers(auth);

        assertThat(response.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    void getAllUsers_nonAdminForbidden() {
        Authentication auth = mockAuth("user@example.com", false);

        ResponseEntity<?> response = userController.getAllUsers(auth);

        assertThat(response.getStatusCodeValue()).isEqualTo(403);
    }

    @Test
    void getUserById_selfAllowed() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));
        Authentication auth = mockAuth("user@example.com", false);

        ResponseEntity<?> response = userController.getUserById(1L, auth);

        assertThat(response.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    void getUserById_otherUserForbidden() {
        User other = new User(); other.setId(2L); other.setEmail("other@example.com");
        when(userRepository.findById(2L)).thenReturn(Optional.of(other));
        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));
        Authentication auth = mockAuth("user@example.com", false);

        ResponseEntity<?> response = userController.getUserById(2L, auth);

        assertThat(response.getStatusCodeValue()).isEqualTo(403);
    }

    @Test
    void createUser_adminAllowed() {
        Authentication auth = mockAuth("admin@example.com", true);
        when(passwordEncoder.encode("password")).thenReturn("hashed");
        when(userRepository.save(any(User.class))).thenReturn(user);

        User newUser = new User();
        newUser.setEmail("new@example.com");
        newUser.setPassword("password");

        ResponseEntity<?> response = userController.createUser(newUser, auth);

        assertThat(response.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    void createUser_nonAdminForbidden() {
        Authentication auth = mockAuth("user@example.com", false);

        ResponseEntity<?> response = userController.createUser(user, auth);

        assertThat(response.getStatusCodeValue()).isEqualTo(403);
    }

    @Test
    void updateUser_selfAllowed() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(passwordEncoder.encode("newpass")).thenReturn("hashed");
        Authentication auth = mockAuth("user@example.com", false);

        User updated = new User();
        updated.setUsername("updated");
        updated.setEmail("user@example.com");
        updated.setPassword("newpass");

        ResponseEntity<?> response = userController.updateUser(1L, updated, auth);

        assertThat(response.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    void deleteUser_selfAllowed() {
        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        Authentication auth = mockAuth("user@example.com", false);

        ResponseEntity<?> response = userController.deleteUser(1L, auth);

        assertThat(response.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    void deleteUser_mainAdminForbidden() {
        User admin = new User();
        admin.setId(1L);
        admin.setEmail("admin@fanjam.com");

        when(userRepository.findByEmail("admin@fanjam.com")).thenReturn(Optional.of(admin));
        when(userRepository.findById(1L)).thenReturn(Optional.of(admin));

        Authentication auth = mockAuth("admin@fanjam.com", true);

        ResponseEntity<?> response = userController.deleteUser(1L, auth);

        assertThat(response.getStatusCodeValue()).isEqualTo(400);
        assertThat(response.getBody()).isEqualTo("Cannot delete the main admin account!");
    }
}
