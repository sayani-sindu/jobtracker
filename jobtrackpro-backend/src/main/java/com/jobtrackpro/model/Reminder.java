package com.jobtrackpro.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data //Getters and Setters
@NoArgsConstructor //default
@AllArgsConstructor
public class Reminder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reminderId;

    private String message;

    private LocalDate dueDate;

    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id") //foreign key
    private User user;
}

// one tomone one to many many to one many to many