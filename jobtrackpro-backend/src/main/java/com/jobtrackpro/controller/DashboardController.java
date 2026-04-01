package com.jobtrackpro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobtrackpro.service.DashboardService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/total")
    public long totalApplications(@RequestParam long userId) {
        return dashboardService.getTotalApplications(userId);
    }

    @GetMapping("/interviews")
    public long totalInterviewCount(@RequestParam long userId) {
        return dashboardService.getInterviewCount(userId);
    }

    @GetMapping("/offers")
    public long totalOfferCount(@RequestParam long userId) {
        return dashboardService.getOfferCount(userId);
    }
    
    @GetMapping("/success-rate")
    public double getSuccessRate(@RequestParam long userId) {
        return dashboardService.getSuccessRate(userId);
    }
    
}
