package com.fanjam.dto;

import com.fanjam.model.User;

public class UserDTO {
    public Long id;
    public String email;

    public UserDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
    }
}