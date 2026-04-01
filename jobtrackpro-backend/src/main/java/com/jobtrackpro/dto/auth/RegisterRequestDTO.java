package com.jobtrackpro.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequestDTO {

    @NotBlank(message = "Name can not be empty")
    private String name;

    @Email(message = "Invalid Email")
    @NotBlank(message = "Email can not be empty")
     private String email;

    @Size(min = 6, message = "Minimum 6 characters is required")
    private String password;
}
