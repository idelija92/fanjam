package com.fanjam.controller;

import com.fanjam.config.JwtUtil;
import com.fanjam.model.Event;
import com.fanjam.model.User;
import com.fanjam.repository.BandRepository;
import com.fanjam.repository.EventBandInfoRepository;
import com.fanjam.repository.EventRepository;
import com.fanjam.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(EventController.class)
class EventControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EventRepository eventRepository;
    @MockBean
    private UserRepository userRepository;
    @MockBean
    private BandRepository bandRepository;
    @MockBean
    private EventBandInfoRepository eventBandInfoRepository;
    @MockBean
    private JwtUtil jwtUtil;

    @Test
    void testGetAllEventsReturnsList() throws Exception {
        Event e1 = new Event();
        e1.setId(1L);
        e1.setTitle("Rock Night");

        Event e2 = new Event();
        e2.setId(2L);
        e2.setTitle("Jazz Evening");

        when(eventRepository.findAll()).thenReturn(List.of(e1, e2));

        mockMvc.perform(get("/api/events"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Rock Night"))
                .andExpect(jsonPath("$[1].title").value("Jazz Evening"));
    }

    @Test
    void testGetEventByIdReturnsSingleEvent() throws Exception {
        Event e1 = new Event();
        e1.setId(1L);
        e1.setTitle("Rock Night");

        when(eventRepository.findById(1L)).thenReturn(Optional.of(e1));

        mockMvc.perform(get("/api/events/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Rock Night"));
    }

    @Test
    void testGetEventsCreatedByUser() throws Exception {
        String fakeToken = "fake.jwt.token";
        String email = "user@fanjam.com";

        User user = new User();
        user.setId(10L);
        user.setEmail(email);

        Event e1 = new Event();
        e1.setId(1L);
        e1.setTitle("My Event");
        e1.setCreatedBy(user);

        when(jwtUtil.extractEmail(fakeToken)).thenReturn(email);
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(eventRepository.findByCreatedBy(user)).thenReturn(List.of(e1));

        mockMvc.perform(get("/api/events/created")
                .header("Authorization", "Bearer " + fakeToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("My Event"));
    }
}
