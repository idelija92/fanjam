package com.fanjam.model;

import jakarta.persistence.*;
import java.time.*;

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

    @ManyToOne
    @JoinColumn(name = "band_id")
    private Band band;

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    // Getters
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public LocalDate getDate() {
        return date;
    }

    public LocalTime getTime() {
        return time;
    }

    public String getVenue() {
        return venue;
    }

    public String getDescription() {
        return description;
    }

    public Band getBand() {
        return band;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setBand(Band band) {
        this.band = band;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}