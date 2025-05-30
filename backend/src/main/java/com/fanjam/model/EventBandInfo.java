package com.fanjam.model;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "event_band_info")
public class EventBandInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id")
    @JsonIgnoreProperties({"bandInfos", "rsvps", "createdBy", "bands"})
    private Event event;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "band_id")
    @JsonIgnoreProperties({"bandInfos", "events", "manager"})
    private Band band;

    @ElementCollection
    private List<String> setlist;

    private int customSongSlots;

    // Getters and Setters
    public Long getId() { return id; }
    public Event getEvent() { return event; }
    public Band getBand() { return band; }
    public List<String> getSetlist() { return setlist; }
    public int getCustomSongSlots() { return customSongSlots; }

    public void setId(Long id) { this.id = id; }
    public void setEvent(Event event) { this.event = event; }
    public void setBand(Band band) { this.band = band; }
    public void setSetlist(List<String> setlist) { this.setlist = setlist; }
    public void setCustomSongSlots(int customSongSlots) { this.customSongSlots = customSongSlots; }
}
