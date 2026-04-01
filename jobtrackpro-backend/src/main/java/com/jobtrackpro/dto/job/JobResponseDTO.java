package com.jobtrackpro.dto.job;

import java.time.LocalDate;

import lombok.Data;

@Data
public class JobResponseDTO {
     private Long id;
    private String role;
    private String company;
    private String location;
    private String status;
    private LocalDate appliedAt;
}
