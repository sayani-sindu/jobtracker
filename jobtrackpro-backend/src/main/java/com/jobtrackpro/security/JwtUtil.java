package com.jobtrackpro.security;

import java.util.Date;



import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import io.jsonwebtoken.security.Keys;
import java.security.Key;

@Component
public class JwtUtil {
    private String secret_key = "jobtrackpro-super-secure-secret-key-2026";
    private long expiration = 1000 * 60 * 60 * 24;
    private Key key = Keys.hmacShaKeyFor(secret_key.getBytes());

    //Generate Token
    public String generateToken(String username){

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key)
                .compact();

    }

    public String extractUsername(String token){
        return extractClaims(token).getSubject();
    }


    public boolean validateToken(String token, String username){
        String extractedUsername = extractUsername(token);

        return extractedUsername.equals(username) && !isTokenExpired(token);

    }

    private boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    private Claims extractClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    
}
