package com.jobtrackpro.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InterviewRound {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roundId;

    private String title;

    private LocalDate date;

    private String outcome;

    private LocalDate followUpDate;

    @ManyToOne
    @JoinColumn(name = "job_id")
    @JsonIgnoreProperties("interviewRounds") 
    private Job job;
}