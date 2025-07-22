package com.fanjam.controller;

import com.fanjam.config.JwtUtil;
import com.fanjam.dto.BandWithSetlistDTO;
import com.fanjam.dto.EventWithSetlistsDTO;
import com.fanjam.dto.SetlistUpdateRequest;
import com.fanjam.dto.UserDTO;
import com.fanjam.model.Band;
import com.fanjam.model.Event;
import com.fanjam.model.EventBandInfo;
import com.fanjam.model.User;
import com.fanjam.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
// @CrossOrigin(origins = "http://localhost:3000")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BandRepository bandRepository;

    @Autowired
    private EventBandInfoRepository eventBandInfoRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public List<EventWithSetlistsDTO> getAllEvents() {
        List<Event> events = eventRepository.findAll();

        return events.stream().map(event -> {
            EventWithSetlistsDTO dto = new EventWithSetlistsDTO();
            dto.setId(event.getId());
            dto.setTitle(event.getTitle());
            dto.setDate(event.getDate());
            dto.setTime(event.getTime());
            dto.setVenue(event.getVenue());
            dto.setLocation(event.getLocation());
            dto.setDescription(event.getDescription());
            dto.setType(event.getType().name());
            dto.setRsvpCount(event.getRsvps().size());
            dto.setRsvps(event.getRsvps().stream().map(UserDTO::new).collect(Collectors.toList()));
            dto.setCreatedByEmail(event.getCreatedBy() != null ? event.getCreatedBy().getEmail() : null);

            dto.setBands(event.getBands().stream().map(band -> {
                BandWithSetlistDTO bandDto = new BandWithSetlistDTO();
                bandDto.id = band.getId();
                bandDto.name = band.getName();

                event.getBandInfos().stream()
                        .filter(info -> info.getBand().getId().equals(band.getId()))
                        .findFirst()
                        .ifPresent(info -> {
                            bandDto.setlist = info.getSetlist();
                            bandDto.customSongSlots = info.getCustomSongSlots();
                        });

                return bandDto;
            }).toList());

            return dto;
        }).toList();
    }

    @GetMapping("/created")
    public List<Event> getEventsCreatedByUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.extractEmail(token);
        User user = userRepository.findByEmail(email).orElseThrow();
        return eventRepository.findByCreatedBy(user);
    }

    @GetMapping("/{id:[0-9]+}")
    public EventWithSetlistsDTO getEventById(@PathVariable Long id) {
        Event event = eventRepository.findById(id).orElseThrow();

        EventWithSetlistsDTO dto = new EventWithSetlistsDTO();
        dto.setId(event.getId());
        dto.setTitle(event.getTitle());
        dto.setDate(event.getDate());
        dto.setTime(event.getTime());
        dto.setVenue(event.getVenue());
        dto.setLocation(event.getLocation());
        dto.setDescription(event.getDescription());
        dto.setType(event.getType().name());
        dto.setRsvpCount(event.getRsvps().size());
        dto.setRsvps(event.getRsvps().stream().map(UserDTO::new).collect(Collectors.toList()));
        dto.setCreatedByEmail(event.getCreatedBy() != null ? event.getCreatedBy().getEmail() : null);

        dto.setBands(event.getBands().stream().map(band -> {
            BandWithSetlistDTO bandDto = new BandWithSetlistDTO();
            bandDto.id = band.getId();
            bandDto.name = band.getName();

            event.getBandInfos().stream()
                    .filter(info -> info.getBand().getId().equals(band.getId()))
                    .findFirst()
                    .ifPresent(info -> {
                        bandDto.setlist = info.getSetlist();
                        bandDto.customSongSlots = info.getCustomSongSlots();
                    });

            return bandDto;
        }).toList());

        return dto;
    }

    @GetMapping("/{id}/bandinfo")
    @PreAuthorize("hasRole('BAND')")
    public ResponseEntity<?> getMyBandInfo(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.extractEmail(token);
        User user = userRepository.findByEmail(email).orElseThrow();
        Band band = bandRepository.findByManager(user).orElseThrow();
        Event event = eventRepository.findById(id).orElseThrow();

        Optional<EventBandInfo> info = eventBandInfoRepository.findByEventAndBand(event, band);
        return info.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.FORBIDDEN).body("No access"));
    }

    @GetMapping("/{id}/my-setlist")
    @PreAuthorize("hasRole('BAND')")
    public ResponseEntity<?> getMySetlist(@PathVariable Long id, @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.extractEmail(token);
        User user = userRepository.findByEmail(email).orElseThrow();

        Optional<Band> optionalBand = bandRepository.findByManager(user);
        if (optionalBand.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not managing any band.");
        }

        Band band = optionalBand.get();
        Optional<Event> optionalEvent = eventRepository.findById(id);
        if (optionalEvent.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found.");
        }

        Event event = optionalEvent.get();
        Optional<EventBandInfo> info = eventBandInfoRepository.findByEventAndBand(event, band);

        if (info.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("This band is not assigned to this event.");
        }

        return ResponseEntity.ok(
                Map.of(
                        "setlist", info.get().getSetlist(),
                        "customSongSlots", info.get().getCustomSongSlots()));
    }

    @PostMapping
    public Event createEvent(@RequestBody Event event, @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.extractEmail(token);
        User user = userRepository.findByEmail(email).orElseThrow();
        event.setCreatedBy(user);

        Set<Band> attachedBands = new HashSet<>();
        if (event.getBands() != null && !event.getBands().isEmpty()) {
            Set<Long> bandIds = event.getBands().stream().map(Band::getId).collect(Collectors.toSet());
            attachedBands.addAll(bandRepository.findAllById(bandIds));
            event.setBands(attachedBands);
        }

        Event savedEvent = eventRepository.save(event);

        for (Band band : attachedBands) {
            EventBandInfo info = new EventBandInfo();
            info.setEvent(savedEvent);
            info.setBand(band);
            info.setSetlist(List.of());
            info.setCustomSongSlots(0);
            eventBandInfoRepository.save(info);
        }

        return savedEvent;
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'VENUE')")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        Event existingEvent = eventRepository.findById(id).orElseThrow();

        existingEvent.setTitle(updatedEvent.getTitle());
        existingEvent.setDate(updatedEvent.getDate());
        existingEvent.setTime(updatedEvent.getTime());
        existingEvent.setVenue(updatedEvent.getVenue());
        existingEvent.setLocation(updatedEvent.getLocation());
        existingEvent.setDescription(updatedEvent.getDescription());
        existingEvent.setType(updatedEvent.getType());

        Set<Long> newBandIds = updatedEvent.getBands() != null
                ? updatedEvent.getBands().stream().map(Band::getId).collect(Collectors.toSet())
                : Set.of();

        Set<Band> attachedBands = new HashSet<>(bandRepository.findAllById(newBandIds));
        existingEvent.setBands(attachedBands);

        Event savedEvent = eventRepository.save(existingEvent);

        for (Band band : attachedBands) {
            Optional<EventBandInfo> existingInfo = eventBandInfoRepository.findByEventAndBand(savedEvent, band);
            if (existingInfo.isEmpty()) {
                EventBandInfo info = new EventBandInfo();
                info.setEvent(savedEvent);
                info.setBand(band);
                info.setSetlist(List.of());
                info.setCustomSongSlots(0);
                eventBandInfoRepository.save(info);
            }
        }

        return savedEvent;
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'VENUE')")
    public void deleteEvent(@PathVariable Long id) {
        eventRepository.deleteById(id);
    }

    @PutMapping("/{eventId}/rsvp")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> rsvpToEvent(@PathVariable Long eventId,
            @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.extractEmail(token);
        User user = userRepository.findByEmail(email).orElseThrow();
        Event event = eventRepository.findById(eventId).orElseThrow();

        user.getRsvpedEvents().add(event);
        userRepository.save(user);

        return ResponseEntity.ok("RSVP added");
    }

    @PutMapping("/{id}/setlist")
    @PreAuthorize("hasRole('BAND')")
    public ResponseEntity<?> updateBandSetlist(
            @PathVariable Long id,
            @RequestBody SetlistUpdateRequest req,
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.extractEmail(token);
        User user = userRepository.findByEmail(email).orElseThrow();
        Band band = bandRepository.findByManager(user).orElseThrow();
        Event event = eventRepository.findById(id).orElseThrow();

        Optional<EventBandInfo> opt = eventBandInfoRepository.findByEventAndBand(event, band);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Not authorized for this event");
        }

        EventBandInfo info = opt.get();
        info.setSetlist(req.getSetlist());
        info.setCustomSongSlots(req.getCustomSongSlots());
        eventBandInfoRepository.save(info);

        return ResponseEntity.ok("Setlist updated");
    }

    @DeleteMapping("/{eventId}/rsvp")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> cancelRsvp(@PathVariable Long eventId,
            @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.extractEmail(token);
        User user = userRepository.findByEmail(email).orElseThrow();
        Event event = eventRepository.findById(eventId).orElseThrow();

        user.getRsvpedEvents().remove(event);
        userRepository.save(user);

        return ResponseEntity.ok("RSVP removed");
        
    }
}
