package com.jobtrackpro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobtrackpro.model.InterviewRound;
import com.jobtrackpro.service.InterviewRoundService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping(path = "/interviews")
public class InterviewRoundController {
    @Autowired
    private InterviewRoundService interviewService;

    @PostMapping()
    public InterviewRound addRound(@RequestBody InterviewRound round, @RequestParam Long jobId) {
        return interviewService.addRound(jobId, round);
    }

    @GetMapping()
    public List<InterviewRound> getRounds(@RequestParam Long jobId) {
        return interviewService.getRoundByJobId(jobId);
    }
    

    @DeleteMapping("/{roundId}")
    public void deleteRound(@PathVariable Long roundId){
        interviewService.deleteRound(roundId);
    }
    

}
