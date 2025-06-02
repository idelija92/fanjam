package com.fanjam.model;

import jakarta.persistence.*;
import java.time.*;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private LocalDate date;
    private LocalTime time;
    private String venue;
    private String description;
    private String location;

    @JsonIgnoreProperties({ "events", "bandInfos", "manager" })
    @ManyToMany
    @JoinTable(name = "event_band", joinColumns = @JoinColumn(name = "event_id"), inverseJoinColumns = @JoinColumn(name = "band_id"))
    private Set<Band> bands = new HashSet<>();

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"event", "band"})
    private Set<EventBandInfo> bandInfos = new HashSet<>();

    @JsonIgnoreProperties({ "password", "rsvpedEvents", "roles" })
    @ManyToMany(mappedBy = "rsvpedEvents")
    private Set<User> rsvps = new HashSet<>();

    @JsonIgnoreProperties({ "password", "rsvpedEvents", "roles" })
    @ManyToOne
    @JoinColumn(name = "created_by_id")
    private User createdBy;

    @Enumerated(EnumType.STRING)
    private EventType type;

    @ElementCollection
    private List<String> setlist;

    // Getters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public LocalDate getDate() { return date; }
    public LocalTime getTime() { return time; }
    public String getVenue() { return venue; }
    public String getDescription() { return description; }
    public Set<Band> getBands() { return bands; }
    public String getLocation() { return location; }
    public EventType getType() { return type; }
    public List<String> getSetlist() { return setlist; }
    public Set<User> getRsvps() { return rsvps; }
    public User getCreatedBy() { return createdBy; }
    public Set<EventBandInfo> getBandInfos() { return bandInfos; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setDate(LocalDate date) { this.date = date; }
    public void setTime(LocalTime time) { this.time = time; }
    public void setVenue(String venue) { this.venue = venue; }
    public void setDescription(String description) { this.description = description; }
    public void setBands(Set<Band> bands) { this.bands = bands; }
    public void setLocation(String location) { this.location = location; }
    public void setType(EventType type) { this.type = type; }
    public void setSetlist(List<String> setlist) { this.setlist = setlist; }
    public void setRsvps(Set<User> rsvps) { this.rsvps = rsvps; }
    public void setCreatedBy(User createdBy) { this.createdBy = createdBy; }
    public void setBandInfos(Set<EventBandInfo> bandInfos) { this.bandInfos = bandInfos; }
}