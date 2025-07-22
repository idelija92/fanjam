package com.fanjam.controller;

import com.fanjam.config.JwtUtil;
import com.fanjam.model.Band;
import com.fanjam.model.User;
import com.fanjam.repository.BandRepository;
import com.fanjam.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bands")
//@CrossOrigin(origins = "http://localhost:3000")
public class BandController {

    @Autowired
    private BandRepository bandRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public List<Band> getAllBands() {
        return bandRepository.findAll();
    }

    @GetMapping("/{id}")
    public Band getBandById(@PathVariable Long id) {
        return bandRepository.findById(id).orElseThrow();
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('BAND')")
    public ResponseEntity<?> getMyBand(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtUtil.extractEmail(token);
        User manager = userRepository.findByEmail(email).orElseThrow();

        return bandRepository.findByManager(manager)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No band assigned to this user"));
    }

    @PostMapping
    public ResponseEntity<?> createBand(@RequestBody Band band) {
        if (band.getManager() != null && band.getManager().getId() != null) {
            User manager = userRepository.findById(band.getManager().getId())
                    .orElseThrow(() -> new RuntimeException("Manager not found"));
            band.setManager(manager);
        } else {
            return ResponseEntity.badRequest().body("Manager ID is required");
        }

        Band saved = bandRepository.save(band);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public Band updateBand(@PathVariable Long id, @RequestBody Band updatedBand) {
        updatedBand.setId(id);
        return bandRepository.save(updatedBand);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBand(@PathVariable Long id) {
        Band band = bandRepository.findByIdWithEvents(id).orElseThrow();

        if (band.getEvents() != null && !band.getEvents().isEmpty()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Cannot delete band: it is assigned to one or more events.");
        }

        bandRepository.delete(band);
        return ResponseEntity.ok("Band deleted successfully");
    }
}
