package com.jobtrackpro.service;

import java.util.List;

import com.jobtrackpro.model.InterviewRound;


public interface InterviewRoundService {

    public InterviewRound addRound(Long jobId, InterviewRound round);

    public List<InterviewRound> getRoundByJobId(Long jobId);

    public void deleteRound(Long roundId);
}
