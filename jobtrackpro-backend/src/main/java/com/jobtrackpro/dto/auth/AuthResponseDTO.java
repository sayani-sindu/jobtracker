package com.jobtrackpro.dto.auth;

import lombok.Data;

@Data
public class AuthResponseDTO {

    private String token;

    private String name;

    private String email;

    private String role;
    
    private Long id;

}