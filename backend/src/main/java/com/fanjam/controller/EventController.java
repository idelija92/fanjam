package com.fanjam.controller;

import com.fanjam.config.JwtUtil;
import com.fanjam.model.Band;
import com.fanjam.model.Event;
import com.fanjam.model.User;
import com.fanjam.repository.BandRepository;
import com.fanjam.repository.EventRepository;
import com.fanjam.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BandRepository bandRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @GetMapping("/created")
    public List<Event> getEventsCreatedByUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.extractEmail(token);
        User user = userRepository.findByEmail(email).orElseThrow();
        return eventRepository.findByCreatedBy(user);
    }

    @GetMapping("/{id:[0-9]+}")
    public Event getEventById(@PathVariable Long id) {
        return eventRepository.findById(id).orElseThrow();
    }

    @PostMapping
    public Event createEvent(@RequestBody Event event, @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.extractEmail(token);
        User user = userRepository.findByEmail(email).orElseThrow();
        event.setCreatedBy(user);

        if (event.getBands() != null && !event.getBands().isEmpty()) {
            Set<Long> bandIds = event.getBands().stream().map(b -> b.getId()).collect(Collectors.toSet());
            Set<Band> attachedBands = new HashSet<>(bandRepository.findAllById(bandIds));
            event.setBands(attachedBands);
        }

        return eventRepository.save(event);
    }

    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        updatedEvent.setId(id);
        return eventRepository.save(updatedEvent);
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventRepository.deleteById(id);
    }

    @PutMapping("/{eventId}/rsvp")
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

    @DeleteMapping("/{eventId}/rsvp")
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
