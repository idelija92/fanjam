package com.fanjam.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "bands")
public class Band {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String genre;
    private String description;

    @ManyToMany(mappedBy = "bands", fetch = FetchType.LAZY)
    private Set<Event> events = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "manager_id")
    @JsonIgnoreProperties({ "password", "roles", "rsvpedEvents" })
    private User manager;

    // Getters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getGenre() {
        return genre;
    }

    public String getDescription() {
        return description;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public User getManager() {
        return manager;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }

    public void setManager(User manager) {
        this.manager = manager;
    }
}