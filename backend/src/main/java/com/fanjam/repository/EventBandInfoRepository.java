package com.fanjam.repository;

import com.fanjam.model.Band;
import com.fanjam.model.Event;
import com.fanjam.model.EventBandInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface EventBandInfoRepository extends JpaRepository<EventBandInfo, Long> {
    Optional<EventBandInfo> findByEventAndBand(Event event, Band band);
    Set<EventBandInfo> findByEvent(Event event);
}