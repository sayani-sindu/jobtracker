package com.jobtrackpro.service;

public interface DashboardService {

    long getTotalApplications(long userId);

    long getInterviewCount(long userId);

    long getOfferCount(long userId);

    double getSuccessRate(long userId);

    
}
