package com.jobtrackpro.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobtrackpro.model.InterviewRound;

public interface InterviewRoundRepository extends JpaRepository<InterviewRound, Long>{
    List<InterviewRound> findByJob_Id(Long jobId); 
    
}
