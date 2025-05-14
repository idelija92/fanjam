package com.fanjam.controller;

import com.fanjam.model.Event;
import com.fanjam.model.SongVote;
import com.fanjam.model.User;
import com.fanjam.repository.EventRepository;
import com.fanjam.repository.SongVoteRepository;
import com.fanjam.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/song-votes")
public class SongVoteController {

    @Autowired
    private SongVoteRepository songVoteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @PostMapping
    public ResponseEntity<?> voteForSong(
            @RequestParam Long eventId,
            @RequestParam String songTitle,
            @RequestParam(required = false) String customMessage,
            Principal principal) {

        String email = principal.getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        Event event = eventRepository.findById(eventId).orElseThrow();

        if (songVoteRepository.findByUserIdAndEventIdAndSongTitle(user.getId(), eventId, songTitle).isPresent()) {
            return ResponseEntity.badRequest().body("Already voted for this song");
        }

        SongVote vote = new SongVote();
        vote.setUser(user);
        vote.setEvent(event);
        vote.setSongTitle(songTitle);
        vote.setCustomMessage(customMessage);

        songVoteRepository.save(vote);
        return ResponseEntity.ok("Vote recorded");
    }

    @DeleteMapping
    public ResponseEntity<?> unvoteForSong(
            @RequestParam Long eventId,
            @RequestParam String songTitle,
            Principal principal) {
        String email = principal.getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        Optional<SongVote> voteOpt = songVoteRepository.findByUserIdAndEventIdAndSongTitle(user.getId(), eventId,
                songTitle);

        if (voteOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No vote found to delete");
        }

        songVoteRepository.delete(voteOpt.get());

        return ResponseEntity.ok("Vote removed");
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<?> getVotesForEvent(@PathVariable Long eventId) {
        List<SongVote> votes = songVoteRepository.findByEventId(eventId);
        return ResponseEntity.ok(votes);
    }
}
