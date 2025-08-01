package com.fanjam.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthFilter jwtAuthFilter) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/health").permitAll()
                        .requestMatchers("/actuator/health").permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/auth/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/song-votes/event/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/bands/my")).hasAnyRole("BAND", "ADMIN")
                        .requestMatchers(new AntPathRequestMatcher("/api/bands/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/events/*/setlist")).hasRole("BAND")
                        .requestMatchers(new AntPathRequestMatcher("/api/events/**")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/venue/**")).hasAnyRole("VENUE", "ADMIN")
                        .requestMatchers(new AntPathRequestMatcher("/api/band/**")).hasAnyRole("BAND", "ADMIN")
                        .requestMatchers(new AntPathRequestMatcher("/api/admin/**")).hasRole("ADMIN")

                        .anyRequest().authenticated())
                .addFilterBefore(jwtAuthFilter,
                        org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/health", "/actuator/health");
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
