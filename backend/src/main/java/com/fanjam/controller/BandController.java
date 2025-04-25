package com.fanjam.controller;

import com.fanjam.model.Band;
import com.fanjam.repository.BandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bands")
@CrossOrigin(origins = "http://localhost:3000")
public class BandController {

    @Autowired
    private BandRepository bandRepository;

    @GetMapping
    public List<Band> getAllBands() {
        return bandRepository.findAll();
    }

    @GetMapping("/{id}")
    public Band getBandById(@PathVariable Long id) {
        return bandRepository.findById(id).orElseThrow();
    }

    @PostMapping
    public Band createBand(@RequestBody Band band) {
        return bandRepository.save(band);
    }

    @PutMapping("/{id}")
    public Band updateBand(@PathVariable Long id, @RequestBody Band updatedBand) {
        updatedBand.setId(id);
        return bandRepository.save(updatedBand);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBand(@PathVariable Long id) {
        try {
            bandRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Band is linked to one or more events.");
        }
    }

}