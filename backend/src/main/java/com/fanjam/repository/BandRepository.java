package com.fanjam.repository;

import com.fanjam.model.Band;
import com.fanjam.model.User;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BandRepository extends JpaRepository<Band, Long> {
    @Query("SELECT b FROM Band b LEFT JOIN FETCH b.events WHERE b.id = :id")
    Optional<Band> findByIdWithEvents(@Param("id") Long id);

    Optional<Band> findByManager(User manager);

}