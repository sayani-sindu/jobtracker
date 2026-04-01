package com.jobtrackpro.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    JwtUtil jwtUtil;

    @Override
protected void doFilterInternal(HttpServletRequest request,
                                HttpServletResponse response,
                                FilterChain filterChain)
                                throws ServletException, IOException {

    String path = request.getServletPath();
    System.out.println(">>> PATH: " + path);  // ✅ add this

    if (path.startsWith("/auth")) {
        filterChain.doFilter(request, response);
        return;
    }

    String header = request.getHeader("Authorization");
    System.out.println(">>> AUTH HEADER: " + header);  // ✅ add this

    if (header != null && header.startsWith("Bearer ")) {
        String token = header.substring(7);
        try {
            String username = jwtUtil.extractUsername(token);
            System.out.println(">>> USERNAME: " + username);  // ✅ add this

            if (username != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {
                UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(username, null, null);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                System.out.println(">>> AUTH SET for: " + username);  // ✅ add this
            }
        } catch (Exception e) {
            System.out.println(">>> JWT ERROR: " + e.getMessage());  // ✅ add this
        }
    }

    filterChain.doFilter(request, response);
}
}