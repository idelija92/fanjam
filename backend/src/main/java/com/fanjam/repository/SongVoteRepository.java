package com.fanjam.repository;

import com.fanjam.model.SongVote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SongVoteRepository extends JpaRepository<SongVote, Long> {
    List<SongVote> findByEventId(Long eventId);
    Optional<SongVote> findByUserIdAndEventIdAndSongTitle(Long userId, Long eventId, String songTitle);
    long countByEventIdAndSongTitle(Long eventId, String songTitle);
}
