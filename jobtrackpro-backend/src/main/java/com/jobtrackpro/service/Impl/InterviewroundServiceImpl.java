package com.jobtrackpro.service.Impl;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobtrackpro.model.InterviewRound;
import com.jobtrackpro.model.Job;
import com.jobtrackpro.repository.InterviewRoundRepository;
import com.jobtrackpro.repository.JobRepository;
import com.jobtrackpro.service.InterviewRoundService;

@Service
public class InterviewroundServiceImpl implements InterviewRoundService{

     @Autowired
    private InterviewRoundRepository roundRepository;

    @Autowired
    private JobRepository jobRepository;

    public InterviewRound addRound(Long jobId, InterviewRound round) {
        Job job = jobRepository.findById(jobId).orElseThrow(null);
        round.setJob(job);
        return roundRepository.save(round);
    }

    
    public List<InterviewRound> getRoundByJobId(Long jobId) {
        return roundRepository.findByJob_Id(jobId);
        
    }


    public void deleteRound(Long roundId) {

        roundRepository.deleteById(roundId);
        
    }
    
}
