package com.fanjam.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class EventWithSetlistsDTO {
    public Long id;
    public String title;
    public LocalDate date;
    public LocalTime time;
    public String venue;
    public String location;
    public String description;
    public String type;
    public int rsvpCount;
    public List<UserDTO> rsvps;
    public List<BandWithSetlistDTO> bands;
    public String createdByEmail;

    // Getters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public LocalDate getDate() { return date; }
    public LocalTime getTime() { return time; }
    public String getVenue() { return venue; }
    public String getLocation() { return location; }
    public String getDescription() { return description; }
    public String getType() { return type; }
    public int getRsvpCount() { return rsvpCount; }
    public List<UserDTO> getRsvps() { return rsvps; }
    public List<BandWithSetlistDTO> getBands() { return bands; }
    public String getCreatedByEmail() { return createdByEmail; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setDate(LocalDate date) { this.date = date; }
    public void setTime(LocalTime time) { this.time = time; }
    public void setVenue(String venue) { this.venue = venue; }
    public void setLocation(String location) { this.location = location; }
    public void setDescription(String description) { this.description = description; }
    public void setType(String type) { this.type = type; }
    public void setRsvpCount(int rsvpCount) { this.rsvpCount = rsvpCount; }
    public void setRsvps(List<UserDTO> rsvps) { this.rsvps = rsvps; }
    public void setBands(List<BandWithSetlistDTO> bands) { this.bands = bands; }
    public void setCreatedByEmail(String createdByEmail) { this.createdByEmail = createdByEmail; }
}