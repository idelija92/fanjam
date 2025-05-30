package com.fanjam.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

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
    @JsonIgnoreProperties({"bands", "bandInfos", "rsvps", "createdBy"})
    private Set<Event> events = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "manager_id")
    @JsonIgnoreProperties({ "password", "roles", "rsvpedEvents" })
    private User manager;

    @OneToMany(mappedBy = "band", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"band", "event"})
    private Set<EventBandInfo> bandInfos = new HashSet<>();

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getGenre() { return genre; }
    public String getDescription() { return description; }
    public Set<Event> getEvents() { return events; }
    public User getManager() { return manager; }
    public Set<EventBandInfo> getBandInfos() { return bandInfos; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setGenre(String genre) { this.genre = genre; }
    public void setDescription(String description) { this.description = description; }
    public void setEvents(Set<Event> events) { this.events = events; }
    public void setManager(User manager) { this.manager = manager; }
    public void setBandInfos(Set<EventBandInfo> bandInfos) { this.bandInfos = bandInfos; }
}