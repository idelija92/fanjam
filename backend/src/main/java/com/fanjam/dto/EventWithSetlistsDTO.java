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
    public List<BandWithSetlistDTO> bands;
}