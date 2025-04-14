package com.fanjam.controller;

import com.fanjam.model.Band;
import com.fanjam.repository.BandRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
}