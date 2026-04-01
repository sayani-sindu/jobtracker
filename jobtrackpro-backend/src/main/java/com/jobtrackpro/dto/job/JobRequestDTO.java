package com.jobtrackpro.dto.job;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class JobRequestDTO {
    
    @NotBlank(message = "Role can not be empty")
    private String role;
    @NotBlank(message = "Company can not be empty")
    private String company;
    private String location;
    private String status;
    private LocalDate appliedAt;
    private String jdLink;
    private String notes;
    private String resumeVersion;
}
