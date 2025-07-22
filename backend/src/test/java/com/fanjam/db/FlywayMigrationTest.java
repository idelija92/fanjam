package com.fanjam.db;

import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

class FlywayMigrationTest {

    @Test
    void validateFlywayMigrations() {
        Flyway flyway = Flyway.configure()
                .dataSource("jdbc:h2:mem:testdb;MODE=PostgreSQL", "sa", "")
                .locations("classpath:db/migration")
                .load();

        assertDoesNotThrow(flyway::migrate);
    }
}
