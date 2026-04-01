package com.jobtrackpro.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobtrackpro.repository.JobRepository;
import com.jobtrackpro.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService{

    @Autowired
    private JobRepository jobRepository;

    @Override
    public long getTotalApplications(long userId) {
        return jobRepository.countByUserId(userId);
    }

    @Override
    public long getInterviewCount(long userId) {
        return jobRepository.countByUserIdAndStatus(userId, "INTERVIEW");
    }

    @Override
    public long getOfferCount(long userId) {
       return jobRepository.countByUserIdAndStatus(userId, "OFFER");
    }

    @Override
    public double getSuccessRate(long userId) {

        int total = jobRepository.countByUserId(userId);

        int offers = jobRepository.countByUserIdAndStatus(userId, "OFFER");

        if(total == 0) return 0;

        return (double) offers / total * 100;
    }
    
}
