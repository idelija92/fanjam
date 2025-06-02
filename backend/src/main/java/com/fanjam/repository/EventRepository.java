package com.fanjam.repository;

import com.fanjam.model.Event;
import com.fanjam.model.User;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByCreatedBy(User user);
}
